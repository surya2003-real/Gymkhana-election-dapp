/*
Sets leader to the address that creates the contract
1. allow only owner to register voters
2. allow voter to vote only if registered
3. allow voter to vote only once 
4. do not allow voter to vote if any of the previous preferences are not filled
5. do not allow anyone to end the elections
6. allow everybody to view the results
*/
const { expect } = require("chai");
const { ethers } = require("hardhat");

async function newElection() {
	const Election = await ethers.getContractFactory("Election");
	const election = await Election.deploy([["Dhwanit", "Aarush", "bob", "charlie"], ["Arnav", "Naman", "alice", "delta"], ["Avi", "Devansh", "Sheeshram", "gamma"], ["Nishika", "omega", "zeta", "eta"], ["alpha", "beta", "theta", "iota"]]);
	
	await election.deployed();
	return election;
}

describe("Elections", function() {
	it("sets the leader to the address that created the contract", async function() {
		const [owner] = await ethers.getSigners();
		const election = await newElection();

		expect(await election.leader()).to.equal(owner.address);
	});

	it("allows only owner to register candidates", async function() {
		const [owner, addr1, addr2, addr3] = await ethers.getSigners();
		const election = await newElection();

		const registerVoter = await election.registerVoter(addr1.address);
		await registerVoter.wait();

		expect((await election.voters(addr1.address)).registered).to.equal(true);
		
		await expect(election.connect(addr2).registerVoter(addr3.address)).to.be.revertedWith("Only the election leader can grant voting rights.");
	});

	it("allows voter to vote only if registered", async function() {
		const [owner, addr1] = await ethers.getSigners();
		const election = await newElection();

		await expect(election.connect(address1).castVote(0, 0, 1)).to.be.revertedWith('Only registered voters can vote.');
	});

	it("allows voter to vote for a position and preference only once", async function() {
		const [owner, addr1] = await ethers.getSigners();
		const election = await newElection();

		await election.registerVoter(addr1.address);
		await election.castVote(0, 0, 1);

		await expect(election.castVote(0, 0, 1)).to.be.revertedWith('You have already voted for this position and preference.');
	});

	it("allows voter to vote for a preference only if all previous preferences are filled", async function() {
		const [owner, addr1] = await ethers.getSigners();
		const election = await newElection();

		await election.registerVoter(addr1.address);
		await election.castVote(0, 0, 1);

		await expect(election.castVote(0, 2, 1)).to.be.revertedWith('You have not voted for the previous preference(s).');
	});

	it("allows only owner to call the endElection function", async function() {
		const [owner, addr1] = await ethers.getSigners();
		const election = await newElection();

		await expect(election.connect(addr1).endElection()).to.be.revertedWith('Only the election leader can end the elections.');
	});
});