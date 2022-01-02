# cryptoEnigme
Dapps qui permet de créer , partager et jouer à des énigmes


## Dependencies
    - Node : v16.10.0
    - NPM : 8.3.0
    

    1. @truffle/hdwallet-provider: ^2.0.0
    2. fs-extra: ^10.0.0
    3. ganache-cli: ^6.12.2
    4. mocha: ^9.1.3
    5. next: ^12.0.7
    6. react: ^17.0.2
    7. react-dom: ^17.0.2
    8. semantic-ui-css: ^2.4.1
    9. semantic-ui-react: ^2.0.4
    10. solc: ^0.8.11
    11. web3: ^1.6.1

## Clone

```
git clone git@github.com:Cassandra-White/cryptoEnigme.git
```

## Install

```
cd cryptoEnigme
npm install
```

## Deploy
### 1 - Ajouter Portefeuille et point d'entrée

 - Dans le fichier ethereum/deploy.js :

    Ligne 12 : 
          - Ajouter en premier argument votre phrase mnemonic de protefeuille.
          - Ajouter en second argument votre point d'entre vers le reseau de test votre choix (Ethereum)

```
          exemple : 
          
          const provider = new HDWalletProvider(
                  'momo nulo truc frote splash bouch stack vroum squid boom star wok',
                  'https://ropsten.infura.io/v3/ac98jjhvjyvyv987987BJY986987jvjhv'
                );
```

### 2 - Ajouter point d'entrée web3

 - Dans le fichier ethereum/web3.js :

    Ligne 12 : 
          - Ajouter votre point d'entre vers le reseau de test votre choix (Ethereum)

```
          exemple : 
          
          const provider = new HDWalletProvider(
                  'https://ropsten.infura.io/v3/ac98jjhvjyvyv987987BJY986987jvjhv'
                );
```

### 3 - Deployer le contrat et modifier l'address du contrat dans questFactory.js

 -  Depuis la racine de votre repo utilisez la commande : 
  
```  
node ethereum/deploy.js
```

 - Un dossier ethereum/address/ à été créé contenant l'address du nouveau contrat dépoyé.
  
```
cat ethereum/address/
```

 - Ouvrir ethereum/questFactory.js/ 

    Ligne 6 :
          - Collez l'adresses " cat ethereum/address/"
          
```
    exemple : 
         
          const instance = new web3.eth.Contract(
                  QuestFactory.abi,
                  '0xFaC9608652109d148e7A24f195da8cF8a2A13A7B' //Address -> ./address/QuestFactory.txt
                );
```

### 4 - Server next

  Depuis la racine :
  `npm run dev`

