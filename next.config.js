require("dotenv").config({ path: require("find-config")(".env") });

module.exports = {
  publicRuntimeConfig: {
    ENDPONT_INFURA: process.env.ENDPONT_INFURA,
    MNEMONIC_METAMASK: process.env.MNEMONIC_METAMASK,
    CONTRACT_ADDRESS: process.env.CONTRACT_ADDRESS,
  },
};
