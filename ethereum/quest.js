import web3 from "./web3";
import Quest from "./build/Quest.json";

const quest = (address) => {
  return new web3.eth.Contract(Quest.abi, address);
};
export default quest;
