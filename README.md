# Gymkhana Election DApp
The DApp is a secure and transparent way to conduct elections for the positions in the Students' Gymkhana. It leverages the security and transparency offered by a smart contract based on a blockchain to facilitate the conduction of elections.

## Instructions for deploying the contract on Sepolia Network
- Create an account on Infura and create a new project.
- Get the API key
- Get your Sepolia Account's private key from Metamask
- Copy the `.env.template` file to `.env` and fill in the `INFURA_API_KEY` and `SEPOLIA_PRIVATE_KEY` variables.
- Install dependencies with `npm install`
- Deploy the contract with `npx hardhat run scripts/deploy.js --network sepolia`. You will get the address of the deployed contract in the console.
- You can view that the contract is actually deployed on Sepolia Network by going to https://explorer.sepolia.net/ and searching for the contract address.

## Deployment details
Smart Contract - 0xc136fdB82520909D1cCfac902b7845F40768e4b8 on Sepolia Test Network
Frontend - https://surya2003-real.github.io/assignment4web3/

## User Manual
1. Go to [Register](https://surya2003-real.github.io/Gymkhana-election-dapp/Register) and add your metamask wallet address to it.
2. Go to [Home](https://surya2003-real.github.io/Gymkhana-election-dapp) and fill in your preferences to vote.

You can only vote once for each position, so choose your candidates carefully.

## Implementation Details
The smart contract allows the users and the organizing body to accomplish the following tasks - 
1. No candidate can be registered or de-registered once the contract has been deployed on the blockchain.
2. No voter can vote more than once. 
3. No voter can vote for the same candidate at multiple preference positions
4. Every voter must be registered by the owner of the contract
5. Everyone can view the results of the elections once they have ended.
5. No one can arbitrarily end the elections once it has been deployed on the blockchain. It will only automatically end once the timer set by the owner at the time of deployment runs out.

The frontend has the following features -

## Contributors
Divyansh Garg - Smart Contract and Hardhat testing codes
Suryansh Goel - Front end application