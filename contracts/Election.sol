// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

contract Election{
	bool public ended = false;
	uint8[3] val = [5, 3, 1];

	struct Voter {
		bool registered;
		bool[3][5] voted; // voter[N][0], voter[N][1], voter[N][2] // voter has voted in preference for that position
		uint8[3][5] vote; // vote[N][0], vote[N][1], vote[N][2]  // index of the candidates voted for
	}

	struct Candidate {
		string name;
		uint16 votes; // number of votes the candidate has received
	}

	address public leader;

	mapping(address => Voter) public voters;

	// mapping(uint8 => Candidate[]) public candidates; // index specifies the position the candidates are contesting for
	Candidate[][5] public candidates; // index specifies the position the candidates are contesting for
	// PSG, 4 gen secs - 5 positions total
	// candidates[0] => all candidates contesting for president

	constructor(string[][5] memory _candidateNames){
		leader = msg.sender;
		voters[leader].registered = true;

		for(uint8 i = 0; i < 5; i++){
			for(uint8 j = 0; j < _candidateNames[i].length; j++){
				candidates[i].push(Candidate({name: _candidateNames[i][j], votes: 0}));
			}
		}
	}

	function registerVoter(address voter) external {
		require(!ended, "Election has ended.");
		require(
			msg.sender == leader,
			"Only the election leader can grant voting rights."
		);
		require(!voters[voter].registered, "Voter is already registered.");

		voters[voter].registered = true;
	}

	function castVote(uint8 position, uint8 preference, uint8 candidate) external {
		require(!ended, "Election has ended.");
		require(
			voters[msg.sender].registered,
			"Only registered voters can vote."
		);
		require(
			!voters[msg.sender].voted[position][preference],
			"You have already voted for this position and preference."
		);
		require(
			candidate < candidates[position].length,
			"Candidate does not exist."
		);
		
		bool valid = true;

		for(uint8 i = 0; i < preference; i++){
			if(voters[msg.sender].voted[position][i] == false){
				valid = false;
				break;
			}
		}

		require(
			valid,
			"You have not voted for the previous preference(s)."
		);

		voters[msg.sender].voted[position][preference] = true;
		voters[msg.sender].vote[position][preference] = candidate;
		candidates[position][candidate].votes += val[preference];
	}

	function winningCandidate() public view returns (uint8[5] memory winningCandidates_){
		uint8[5] memory winners;
		for(uint8 position = 0; position < 5; position++){
			uint16 max = 0;
			for(uint8 i = 0; i < candidates[position].length; i++){
				if(candidates[position][i].votes > max){
					max = candidates[position][i].votes;
					winners[position] = i;
				}
			}
		}
		return winners;
	}

	function winningCandidatesName() external view returns(string[5] memory winnersName_){
		uint8[5] memory winners = winningCandidate();
		for(uint8 position = 0; position < 5; position++){
			winnersName_[position] = candidates[position][winners[position]].name;
		}

		return winnersName_;
	}

	function endElection() external {
		require(
			msg.sender == leader,
			"Only the election leader can end the election."
		);

		ended = true;
	}
}

/*

1. allow only owner to register candidates
2. one candidate can be registered once only for entire elections
3. allow only owner to register voters
4. allow voter to vote only if registered
5. allow voter to vote only once 
6. do not allow voter to vote if any of the fields is empty
7. do not allow anyone to end the elections
8. allow everybody to view the results
9. can call 5/3/1 in that order
10. call each only once

*/

/*
TODO: 
1. Add support for voting for NOTA
2. Add support login for voters
3. Add support for ending election automatically
*/