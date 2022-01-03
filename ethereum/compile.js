const path = require("path");
const solc = require("solc");
const fs = require("fs-extra");

const buildPath = path.resolve(__dirname, "build");
fs.removeSync(buildPath);

const campaignPath = path.resolve(__dirname, "contracts", "QuestEnigme.sol");
const source = fs.readFileSync(campaignPath, "utf8");

const input = {
  language: "Solidity",
  sources: {
    "QuestEnigme.sol": { content: source },
  },
  settings: {
    outputSelection: {
      "*": {
        "*": ["*"],
      },
    },
  },
};

const output = JSON.parse(solc.compile(JSON.stringify(input)));

fs.ensureDirSync(buildPath);

for (var contractName in output.contracts["QuestEnigme.sol"]) {
  fs.writeFileSync(
    path.resolve(buildPath, `${contractName}.json`),
    JSON.stringify(output.contracts["QuestEnigme.sol"][contractName], null, 2),
    "utf8"
  );
}
