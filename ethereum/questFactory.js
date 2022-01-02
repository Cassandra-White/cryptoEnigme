import web3 from './web3';
import QuestFactory from './build/QuestFactory.json';
import getConfig from 'next/config';

const contractAddress = process.env.CONTRACT_ADDRESS;
const { publicRuntimeConfig } = getConfig()


const instance = new web3.eth.Contract(
  QuestFactory.abi,
  publicRuntimeConfig.CONTRACT_ADDRESS //Address -> ./address/QuestFactory.txt
);

export default instance;
