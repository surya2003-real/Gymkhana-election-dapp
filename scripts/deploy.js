// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");

async function main() {
  let candidates=[["Dhwanit", "Aarush", "bob", "charlie"], ["Arnav", "Naman", "alice", "delta"], ["Avi", "Devansh", "Sheeshram", "gamma"], ["Nishika", "omega", "zeta", "eta"], ["alpha", "beta", "theta", "iota"]];
  
  const Election = await hre.ethers.getContractFactory("Election");
  const election = await Election.deploy(candidates);
  await election.deployed();

  console.log(
    `Election deployed to ${election.address}`
  );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
