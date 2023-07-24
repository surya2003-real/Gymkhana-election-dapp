# assignment4web3

## Instructions for deploying the contract on Sepolia Network
- Create an account on Infura and create a new project.
- Get the API key
- Get your Sepolia Account's private key from Metamask
- Copy the `.env.template` file to `.env` and fill in the `INFURA_API_KEY` and `SEPOLIA_PRIVATE_KEY` variables.
- Install dependencies with `npm install`
- Deploy the contract with `npx hardhat run scripts/deploy.js --network sepolia`. You will get the address of the deployed contract in the console.
- You can view that the contract is actually deployed on Sepolia Network by going to https://explorer.sepolia.net/ and searching for the contract address.