import web3 from './web3';
import QuestFactory from './build/QuestFactory.json';

const instance = new web3.eth.Contract(
  QuestFactory.abi,
  '0xFaC9608652109d148e7A24f195da8cF8a2A13A7B' //Address -> ./address/QuestFactory.txt
);

export default instance;
