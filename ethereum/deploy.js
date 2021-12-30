const HDWalletProvider = require('@truffle/hdwallet-provider');
const path = require("path");
const fs = require("fs-extra");
const Web3 = require('web3');
const compiledQuestFactory = require('./build/QuestFactory.json');


const buildPath = path.resolve(__dirname, "address");
fs.removeSync(buildPath);


const provider = new HDWalletProvider(
  'change this to your own phrase!',
  // change this to your own phrase!
  'change this to your own endpoint'
  // change this to your own endpoint!
);

const web3 = new Web3(provider);

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();
  balance = await web3.eth.getBalance(accounts[0]);
  console.log("Balance : ", balance);
  let result;
  console.log('Attempting to deploy from account', accounts[0]);

  try {
    result = await new web3.eth.Contract(compiledQuestFactory.abi)
    .deploy({ data: compiledQuestFactory.evm.bytecode.object })
    .send({ gas: '8000000', from: accounts[0] });

    console.log('Contract deployed to', result.options.address);

  } catch (err) {
    console.log(err);
  }


  

  provider.engine.stop();

  fs.ensureDirSync(buildPath);
  fs.writeFile(path.resolve(buildPath, "QuestFactoryAddress.txt"),result.options.address);
  fs.writeFile(path.resolve(buildPath, "ManagerAddress.txt"), accounts[0]);

};


deploy();