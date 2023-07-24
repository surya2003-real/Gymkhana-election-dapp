require("@nomicfoundation/hardhat-toolbox");
// get INFURA_API_KEY and SEPOLIA_PRIVATE_KEY from .env file
require("dotenv").config();
const { INFURA_API_KEY, SEPOLIA_PRIVATE_KEY } = process.env;
/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  networks: {
    sepolia: {
      url: `https://sepolia.infura.io/v3/${INFURA_API_KEY}`,
      accounts: [`0x${SEPOLIA_PRIVATE_KEY}`],
    }
  },
  solidity: "0.8.4",
};