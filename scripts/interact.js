const { vars } = require("hardhat/config");

const API_KEY_ETHERSCAN = vars.get("API_KEY_ETHERSCAN");
const PRIVATE_KEY = vars.get("PRIVATE_KEY");
const CONTRACT_ADDRESS_HELLO_WORLD = vars.get("CONTRACT_ADDRESS_HELLO_WORLD");

const contract = require("../artifacts/contracts/FirstContract.sol/HelloWorld.json")
//console.log(JSON.stringify(contract.abi))

/*const contractABI = [
  {
  "inputs": [{"internalType":"string","name":"initMessage","type":"string"}],
  "stateMutability":"nonpayable",
  "type":"constructor"
  },
  {
  "anonymous":false,
  "inputs":[{"indexed":false,
  "internalType":"string",
  "name":"oldStr",
  "type":"string"
  },
  {
  "indexed":false,
  "internalType":"string",
  "name":"newStr",
  "type":"string"
  }],
  "name":"UpdatedMessages",
  "type":"event"
  },
  {
  "inputs":[],
  "name":"message",
  "outputs":[{"internalType":"string",
  "name":"",
  "type":"string"}],
  "stateMutability":"view",
  "type":"function"
  },
  {
  "inputs":[{"internalType":"string",
  "name":"newMessage",
  "type":"string"}],
  "name":"update",
  "outputs":[],
  "stateMutability":"nonpayable",
  "type":"function"
}
]*/

const { ethers } = require("hardhat");
const { cons } = require("fp-ts/lib/NonEmptyArray2v");

//new ethers.providers.EtherscanProvider( [ network = "homestead" , [ apiKey ] ] )
const etherscanProvider = new ethers.EtherscanProvider
(
 'sepolia',
  API_KEY_ETHERSCAN
);

  //new ethers.Wallet( privateKey [ , provider ] )
  // Signer
  const signer = new ethers.Wallet(PRIVATE_KEY, etherscanProvider)

  // new ethers.Contract( address , abi , signerOrProvider )
  // Contract
  const helloWorldContract = new ethers.Contract(
    CONTRACT_ADDRESS_HELLO_WORLD,
    contract.abi,
    signer //signer
  );

// Test
(async () => {
    const blockNumber = await etherscanProvider.getBlockNumber();
    console.log("Latest block number:", blockNumber);
  })();

  async function main() {
    //fetching the current message from the contract
    console.log("came in!");
    const message = await helloWorldContract.message();
    console.log("The message is: " + message);

    //updating the message by calling the contracts '.update' function
    console.log('Updating the message...')
    const tx = await helloWorldContract.update('Saying hello to the world succeeded!');
    
    //wait() ensures that the script waits for the transaction to get mined on the blockchain before exiting the function.
    //If the .wait() call isn't included, the script may not see the updated message value in the contract.
    await tx.wait();

    //reading the updated message directly after it was mined with the transaction
    const newMessage = await helloWorldContract.message();
    console.log("The new message is: " + newMessage);
  }

  main();
  









/*const network = ethers.provider.getNetwork('sepolia');

console.log(network);*/

//const { AlchemyProvider } = require('@ethersproject/providers');

// Provider
/*const alchemyProvider = new ethers.providers.AlchemyProvider(
    (network = "goerli"),
    API_KEY
  )*/