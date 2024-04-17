require("@nomicfoundation/hardhat-toolbox");

require("@nomiclabs/hardhat-etherscan")

//require("@nomiclabs/hardhat-ethers");
//require('dotenv').config();
//const { API_URL, PRIVATE_KEY } = process.env;
//const API_URL = process.env.API_URL
//const PRIVATE_KEY = process.env.PRIVATE_KEY


const { vars } = require("hardhat/config");

const API_URL_ALCHEMY = vars.get("API_URL_ALCHEMY");
const PRIVATE_KEY = vars.get("PRIVATE_KEY");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.24",
  defaultNetwork: "sepolia",
  networks: {
    hardhat: {},
    sepolia: {
      url: API_URL_ALCHEMY,
      accounts: [`0x${PRIVATE_KEY}`]
    },
  },
  etherscan: {
    // Your API key for Etherscan
    // Obtain one at https://etherscan.io/
    apiKey: ETHERSCAN_API_KEY,
  }
};
