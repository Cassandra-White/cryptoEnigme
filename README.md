# cryptoEnigme

cryptoEnigme est une Dapps qui permet de créer, partager et jouer à des énigmes.

##  Lien Rapide

[Démo](#démo)

[Dépendences](#dépendences)

[Clone](#clone)

[Installer](#installer)

[Déployer](#déployer)


## Démo

### Live Site Démo

Démo: [Link]()

Screen :

![Home](https://github.com/Cassandra-White/cryptoEnigme/blob/main/images/Capture%20d%E2%80%99e%CC%81cran%202022-01-02%20a%CC%80%2009.52.42.png?raw=true)


## Dépendences

    
| Tools                      | Versions |
| -------------------------  | -------- |
| npm                        | 8.3.0    |
| nodejs                     | 16.10.0  |
| @truffle/hdwallet-provider | 2.0.0    |
| fs-extra                   | 10.0.0   |
| ganache-cli                | 6.12.2   |
| mocha                      | 9.1.3    |
| next                       | 12.0.7   |
| react                      | 17.0.2   |
| react-dom                  | 17.0.2   |
| semantic-ui-css            | 2.4.1    |
| semantic-ui-react          | 2.0.4    |
| solc                       |0.8.11    |
| web3                       | 1.6.1    |

## Clone

```
git clone git@github.com:Cassandra-White/cryptoEnigme.git
```

## Installer

```
cd cryptoEnigme
npm install
```

## Déployer
### 1 - Ajouter un portefeuille et point d'entrée

 - Dans le fichier ethereum/deploy.js :

    Ligne 12 : 
         ``` - Ajouter en premier argument votre phrase mnémonique de protefeuille Metamask.```
          ```- Ajouter en second argument votre point d'entrée vers le reseau de test votre choix (Ethereum - infurna)```

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
          ```- Ajouter votre point d'entrée vers le reseau de test votre choix (Ethereum)```

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
cat ethereum/address/QuestFactoryAddress.txt
```

 - Ouvrir ethereum/questFactory.js/ 

    Ligne 6 :
          ```- Collez l'adresses "QuestFactoryAddress.txt"```
          
```
    exemple : 
         
          const instance = new web3.eth.Contract(
                  QuestFactory.abi,
                  '0xFaC9608652109d148e7A24f195da8cF8a2A13A7B' //Address -> ./address/QuestFactory.txt
                );
```

### 4 - Server next

  Depuis la racine :
  ```
  npm run dev
  ```

