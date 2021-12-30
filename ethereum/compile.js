const path = require("path");
const solc = require("solc");
const fs = require("fs-extra");

const buildPath = path.resolve(__dirname, "build");
fs.removeSync(buildPath);

const campaignPath = path.resolve(__dirname, "contracts", "QuestEnigme.sol");
const source = fs.readFileSync(campaignPath, "utf8");

const input = {
    language: 'Solidity',
    sources: {
        'QuestEnigme.sol' :{ content : source},
    },
    settings: {
        outputSelection: {
            '*': {
                '*': [ '*' ]
            }
        }
    }
}; 


// const output = solc.compile(source, 1).contracts;
 const output = JSON.parse(solc.compile(JSON.stringify(input)));

 fs.ensureDirSync(buildPath);

 for (var contractName in output.contracts['QuestEnigme.sol']) {
    fs.writeFileSync(
     path.resolve(buildPath, `${contractName}.json`) ,
     JSON.stringify(output.contracts['QuestEnigme.sol'][contractName], null, 2), 'utf8'
    );
    }

// for (let contract in output) {
//   fs.outputJsonSync(
//     path.resolve(buildPath, contract.replace(":", "") + ".json"),
//     output[contract]
//   );
// }

// if(output.errors) {
//     output.errors.forEach(err => {
//         console.log(err.formattedMessage);
//     });
// } else {
     //const contracts = output.contracts["QuestEnigme.sol"];
//     for (let contractName in contracts) {
//         const contract = contracts[contractName];
//         fs.writeFileSync(path.resolve(buildPath, `${contractName}.json`), JSON.stringify(contract.abi, null, 2), 'utf8');
//     }
// }

// for (let contract in contracts) {

//     fs.outputJsonSync(
//         path.resolve(buildPath, contract.replace(":", "") + ".json"),
//         contracts[contract]
//     );
//  console.log(contracts[contract]);
//  console.log("\n\n\n");
//  console.log(contract);
//  console.log("\n\n\n");

// }
// module.exports = JSON.parse(solc.compile(JSON.stringify(input))).contracts[
//     'QuestEnigme.sol'
// ].QuestFactory;
    