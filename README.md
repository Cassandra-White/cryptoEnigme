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

Démo: [Link](https://crypto-enigme.vercel.app//)

Screen :
| ![Home](https://github.com/Cassandra-White/cryptoEnigme/blob/main/images/Capture%20d%E2%80%99e%CC%81cran%202022-01-02%20a%CC%80%2009.58.40.png) | ![Community_quest](https://github.com/Cassandra-White/cryptoEnigme/blob/main/images/Capture%20d%E2%80%99e%CC%81cran%202022-01-02%20a%CC%80%2010.01.12.png) |
| ------------ | ------------- |
| ![Enigmes](https://github.com/Cassandra-White/cryptoEnigme/blob/main/images/Capture%20d%E2%80%99e%CC%81cran%202022-01-02%20a%CC%80%2010.01.56.png?raw=true) | ![Home](https://github.com/Cassandra-White/cryptoEnigme/blob/main/images/Capture%20d%E2%80%99e%CC%81cran%202022-01-02%20a%CC%80%2010.02.35.png?raw=true) |

 

 



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

### 0 - variable d'environnement
   - Créez un fichier `.env.local` à la racine du repo.
   - Ajoutez 3 lignes :
   ```
ENDPONT_INFURA="lien vers votre point d'entré depuis Infura ou un autre service"
MNEMONIC_METAMASK="votre phrase mnémonique MetaMask"
CONTRACT_ADDRESS="l'address du smart-contrat qui se trouve/trouvera dans le fichier '/etheruem/address/questFactory.js' "
   ```
   
  exemple : `cat env.localExemple` 
  
### 1 - Deployer le smart-contract

 - Depuis la racine du repo :
 

```
 node ethereum/deploy.js
```


### 2 - Vérifier variable d'environnement

 - Depuis la racine du repo :
```
 cat ethereum/address/QuestFactoryAddress.txt
```

 . Copiez l'adresse.

```
vi .env.local
```

 - Collez l'address dans `CONTRACT_ADDRESS`

  
### 3 - Server next

  Depuis la racine :
  ```
  npm run dev
  ```

