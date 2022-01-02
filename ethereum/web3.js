import Web3 from "web3";
import getConfig from 'next/config'

let web3;
const endPointInfura = process.env.ENDPONT_INFURA;
console.log(endPointInfura);
const { publicRuntimeConfig } = getConfig()

if (typeof window !== "undefined" && typeof window.ethereum !== "undefined") {
  // We are in the browser and metamask is running.
  window.ethereum.request({ method: "eth_requestAccounts" });
  web3 = new Web3(window.ethereum);
} else {
  // We are on the server *OR* the user is not running metamask
  const provider = new Web3.providers.HttpProvider(
    publicRuntimeConfig.ENDPONT_INFURA
    //change this to your own endpoint
  );
  web3 = new Web3(provider);
}

export default web3;