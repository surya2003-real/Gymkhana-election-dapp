/*
1. sets leader to the address that creates the contract
2. allow only owner to register voters
3. allow voter to vote only if registered
4. allow voter to vote only once for a position and preference
5. does not allow voter to vote if any of the previous preferences are not filled
6. allow only owner to call the endElection function
7. does not allow registration of voters after end of election
8. does not allow votes to be casted after end of election
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

	it("allows owner to register voters", async function() {
		const [owner, addr1] = await ethers.getSigners();
		const election = await newElection();

		const registerVoter = await election.registerVoter(addr1.address);
		await registerVoter.wait();

		expect((await election.voters(addr1.address)).registered).to.equal(true);
	});

	it("does not allow non-owner to register voters", async function() {
		const [owner, addr1, addr2] = await ethers.getSigners();
		const election = await newElection();

		await expect(election.connect(addr1).registerVoter(addr2.address)).to.be.revertedWith("Only the election leader can grant voting rights.");
	});

	it("allows voter to vote only if registered", async function() {
		const [owner, addr1] = await ethers.getSigners();
		const election = await newElection();

		await expect(election.connect(addr1).castVote(0, 0, 1)).to.be.revertedWith('Only registered voters can vote.');
	});

	it("allows voter to vote for a position and preference only once", async function() {
		const [owner, addr1] = await ethers.getSigners();
		const election = await newElection();

		await election.registerVoter(addr1.address);
		await election.castVote(0, 0, 1);

		await expect(election.castVote(0, 0, 1)).to.be.revertedWith("You have already voted for this position and preference.");
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

		await expect(election.connect(addr1).endElection()).to.be.revertedWith('Only the election leader can end the election.');
	});

	it("does not allow registration of voters after end of election", async function() {
		const [owner, addr1] = await ethers.getSigners();
		const election = await newElection();

		await election.endElection();
		await expect(election.registerVoter(addr1.address)).to.be.revertedWith('Election has ended.');
	});

	it("does not allow votes to be casted after end of election", async function() {
		const [owner, addr1] = await ethers.getSigners();
		const election = await newElection();

		election.registerVoter(addr1.address);
		election.endElection();
		await expect(election.castVote(0, 0, 1)).to.be.revertedWith('Election has ended.');
	});
});