const assert = require("assert");
const ganache = require("ganache-cli");
const Web3 = require("web3");
const web3 = new Web3(ganache.provider());
const compiledQuestFactory = require("../ethereum/build/QuestFactory.json");
const compiledQuest = require("../ethereum/build/Quest.json");

let accounts;
let questFactory;
let questAddress;
let quest;

beforeEach(async () => {
  accounts = await web3.eth.getAccounts();
  balance = web3.eth.getBalance(accounts[0]);
  questFactory = await new web3.eth.Contract(compiledQuestFactory.abi)
    .deploy({ data: compiledQuestFactory.evm.bytecode.object })
    .send({ from: accounts[0], gas: "3000000" });

  await questFactory.methods.createQuest("Quest 1", 100).send({
    from: accounts[0],
    gas: "3000000",
  });

  [questAddress] = await questFactory.methods.getDeployedQuests().call();
  quest = await new web3.eth.Contract(compiledQuest.abi, questAddress);
});

describe("Jeu d'Enigme -> Quest -", () => {
  it("Test 1 - Vérification de la création des contrats QuestFactory et Quest -", () => {
    assert.ok(questFactory.options.address);
    assert.ok(quest.options.address);
  });

  it("Test 2 - Vérification des données créés : QuestFactory // Quest -", async () => {
    //Data questFactory :
    const getDeployedQuestsLength = await questFactory.methods
      .getDeployedQuests()
      .call({ from: accounts[0] });

    //console.log(getDeployedQuestsLength.length);
    assert.strictEqual(getDeployedQuestsLength.length, 1);

    //Data Quest :
    const questTitle = await quest.methods
      .questTitle()
      .call({ from: accounts[0] });
    const questPrice = await quest.methods
      .questPrice()
      .call({ from: accounts[0] });
    const questCompleted = await quest.methods
      .questCompleted()
      .call({ from: accounts[0] });
    const playersCount = await quest.methods
      .playersCount()
      .call({ from: accounts[0] });
    const manager = await quest.methods.manager().call({ from: accounts[0] });
    const questBalance = await quest.methods
      .getQuestBalance()
      .call({ from: accounts[0] });

    assert.strictEqual(questTitle, "Quest 1");
    assert.strictEqual(questPrice, "100");
    assert.strictEqual(questCompleted, false);
    assert.strictEqual(playersCount, "0");
    assert.strictEqual(manager, accounts[0]);
    assert.strictEqual(questBalance, "0");
  });

  it("Test 3 - Creation Enigme Manager -", async () => {
    await quest.methods
      .createEnigme("Enigme 0", "1+1 = ?", "2", "", "", "")
      .send({ from: accounts[0], gas: "3000000" });
    const enigme1 = await quest.methods.enigmes(0).call({ from: accounts[0] });
    const enigmeCount = await quest.methods
      .getEnigmeCount()
      .call({ from: accounts[0] });
    //console.log("ENIGME 1 = ", await quest.methods.enigmes(0).call({from : accounts[0]}));
    assert.strictEqual(enigmeCount, "1");
    assert.strictEqual(enigme1.enigmeTitle, "Enigme 0");
  });

  it("Test 4 - Creation Enigme NON-Manager -", async () => {
    try {
      await quest.methods
        .createEnigme("Enigme 0", "1+1 = ?", "2", "", "", "")
        .send({ from: accounts[1], gas: "3000000" });
      assert(false);
    } catch (err) {
      assert(err);
    }
    const enigmeCount = await quest.methods
      .getEnigmeCount()
      .call({ from: accounts[0] });
    //    console.log("ENIGME 1 = ", enigmeCount);
    assert.strictEqual(enigmeCount, "0");
  });

  it("Test 5 - Joueur s inscrit avec le montant exact -", async () => {
    await quest.methods
      .createEnigme("Enigme 0", "1+1 = ?", "2", "", "", "")
      .send({ from: accounts[0], gas: "3000000" });

    await quest.methods
      .getInQuest()
      .send({ from: accounts[1], value: "100", gas: "3000000" });
    //console.log(await quest.methods.players(accounts[1]).call({from : accounts[0]}));
    assert.ok(
      await quest.methods.players(accounts[1]).call({ from: accounts[0] })
    );
    const playersCount = await quest.methods
      .playersCount()
      .call({ from: accounts[0] });
    assert.strictEqual(playersCount, "1");
  });

  it("Test 6 - Joueur s inscrit avec le mauvais montant -", async () => {
    await quest.methods
      .createEnigme("Enigme 0", "1+1 = ?", "2", "", "", "")
      .send({ from: accounts[0], gas: "3000000" });

    try {
      await quest.methods
        .getInQuest()
        .send({ from: accounts[1], value: "101", gas: "3000000" });
      assert(false);
    } catch (err) {
      assert(err);
    }
    //console.log(!await quest.methods.players(accounts[1]).call({from : accounts[0]}));
    assert(
      !(await quest.methods.players(accounts[1]).call({ from: accounts[0] }))
    ); // '!' negation = false -> true
    const playersCount = await quest.methods
      .playersCount()
      .call({ from: accounts[0] });
    assert.strictEqual(playersCount, "0");
  });

  it("Test 7 - Joueur s inscrit avec le mauvais montant et avec le montant exact -", async () => {
    await quest.methods
      .createEnigme("Enigme 0", "1+1 = ?", "2", "", "", "")
      .send({ from: accounts[0], gas: "3000000" });
    await quest.methods
      .getInQuest()
      .send({ from: accounts[1], value: "100", gas: "3000000" });
    try {
      await quest.methods
        .getInQuest()
        .send({ from: accounts[2], value: "101", gas: "3000000" });
      assert(false);
    } catch (err) {
      assert(err);
    }
    // console.log(await quest.methods.players(accounts[1]).call({from : accounts[0]}));
    // console.log(await quest.methods.players(accounts[2]).call({from : accounts[0]}));
    assert(
      await quest.methods.players(accounts[1]).call({ from: accounts[0] })
    );
    assert(
      !(await quest.methods.players(accounts[2]).call({ from: accounts[0] }))
    ); // '!' negation = false -> true
    const playersCount = await quest.methods
      .playersCount()
      .call({ from: accounts[0] });
    assert.strictEqual(playersCount, "1");
  });

  it("Test 8 - Joueur inscrit repond à une enigme fausse  -", async () => {
    await quest.methods
      .createEnigme("Enigme 0", "1+1 = ?", "2", "", "", "")
      .send({ from: accounts[0], gas: "3000000" });
    await quest.methods
      .getInQuest()
      .send({ from: accounts[1], value: "100", gas: "3000000" });
    await quest.methods
      .tryEnigmePlayerReponse(0, "11")
      .send({ from: accounts[1], gas: "3000000" });
    const enigme1 = await quest.methods.enigmes(0).call({ from: accounts[0] });
    const getEnigmePlayersResponses = await quest.methods
      .getEnigmePlayersResponses(0)
      .call({ from: accounts[0] });
    // console.log(getEnigmePlayersResponses);
    assert.strictEqual(enigme1.enigmeResponseCount, "1");
    assert.strictEqual(getEnigmePlayersResponses[0], "11");
  });

  it("Test 9 - Joueur NON-inscrit repond à une enigme fausse  -", async () => {
    await quest.methods
      .createEnigme("Enigme 0", "1+1 = ?", "2", "", "", "")
      .send({ from: accounts[0], gas: "3000000" });

    try {
      await quest.methods
        .tryEnigmePlayerReponse(0, "11")
        .send({ from: accounts[1], gas: "3000000" });
      assert(false);
    } catch (error) {}
    const enigme1 = await quest.methods.enigmes(0).call({ from: accounts[0] });
    const getEnigmePlayersResponses = await quest.methods
      .getEnigmePlayersResponses(0)
      .call({ from: accounts[0] });
    assert.strictEqual(enigme1.enigmeResponseCount, "0");
    assert.strictEqual(getEnigmePlayersResponses.length, 0);
  });

  it("Test 10 - Joueur inscrit repond à une enigme vrai  -", async () => {
    await quest.methods
      .createEnigme("Enigme 0", "1+1 = ?", "2", "", "", "")
      .send({ from: accounts[0], gas: "3000000" });
    await quest.methods
      .getInQuest()
      .send({ from: accounts[1], value: "100", gas: "3000000" });
    await quest.methods
      .tryEnigmePlayerReponse(0, "2")
      .send({ from: accounts[1], gas: "3000000" });

    const enigme1 = await quest.methods.enigmes(0).call({ from: accounts[0] });
    // console.log(enigme1);
    const getEnigmePlayersResponses = await quest.methods
      .getEnigmePlayersResponses(0)
      .call({ from: accounts[0] });
    assert.strictEqual(enigme1.enigmeResponseCount, "0");
    assert.strictEqual(getEnigmePlayersResponses.length, 0);
    assert.strictEqual(enigme1.enigmeFinishByCount, "1");
  });
});
