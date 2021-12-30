//SPDX-License-Identifier: UNLICENCED
pragma solidity ^0.8.11 ;


contract QuestFactory {
    address superAdmin;
    mapping(address => bool) public admins;

    address[] public deployedQuestsOfficial;
    address[] public deployedQuestsCommunity;

   modifier onlySuperAdmin() {
        require(msg.sender == superAdmin);
        _;
    }

    modifier onlyAdmins() {
        require(admins[msg.sender] == true);
        _;
    }

    constructor () {
        superAdmin = msg.sender;
        admins[msg.sender] = true;
    }

    function addAdmin(address newAdmin) public onlySuperAdmin() {
        admins[newAdmin] = true;
    }

    function deleteAdmin(address oldAdmin) public onlyAdmins() {
        admins[oldAdmin] = false;
    }

    function createQuestOfficial(string memory nameQuest, uint minimum, string memory desciptionQuest, string memory pictureQuest) public onlyAdmins{
        address newQuest = address(new Quest(nameQuest, minimum, msg.sender , desciptionQuest, pictureQuest));
        deployedQuestsOfficial.push(newQuest);
    }

    function createQuestCommunity(string memory nameQuest, uint minimum, string memory desciptionQuest, string memory pictureQuest) public {
        address newQuest = address(new Quest(nameQuest, minimum, msg.sender, desciptionQuest, pictureQuest));
        deployedQuestsCommunity.push(newQuest);
    }

    function getDeployedQuestsOfficial() public view returns (address[] memory) {
        return deployedQuestsOfficial;
    }
    function getDeployedQuestsCommunity() public view returns (address[] memory) {
        return deployedQuestsCommunity;
    }
}

///////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////

contract Quest {

////////////////////////////////////////
// Donnée de base Enigme
////////////////////////////////////////

    // struct EnigmePlayerResponse{
    //     uint enigmeIndex;
    //     address playerAddress;
    //     string playerResponse;
    // }


    struct Enigme {
        string enigmeTitle;
        string enigmeContent;
        string enigmeClue1;
        uint enigmeClue1Unlock;
        string enigmeClue2;
        uint enigmeClue2Unlock;
        string enigmeClue3;
        uint enigmeClue3Unlock;
        //string enigmeResponse;
        uint enigmeResponseCount;
        bool enigmeComplete;
        mapping(address => bool) enigmeFinishBy;
        mapping(string => bool) tryResponse;
        string[] enigmePlayersResponses;
        uint enigmeFinishByCount;
    }

////////////////////////////////////////
// Donnée de base Quest
////////////////////////////////////////

    Enigme[] public enigmes;
    // EnigmePlayerResponse[] public enigmePlayersResponses;
    address public manager;
    string public questTitle;
    uint public questPrice;
    string public questDescription;
    string public questPicture;
    mapping(address => bool) public players;
    uint public playersCount;
    uint public questResponseCount;
    bool public questCompleted;


    modifier restricted() {
        require(msg.sender == manager);
        _;
    }

    modifier onlyPlayer() {
        require(players[msg.sender] == true);
        _;
    }

   // constructor  (string memory nameQuest, uint  priceQuest) {
    constructor (string memory nameQuest, uint priceQuest, address creator, string memory desciptionQuest, string memory pictureQuest) {
        manager = creator;
        questTitle = nameQuest;
        questPrice = priceQuest;
        questDescription = desciptionQuest;
        questPicture = pictureQuest;
    }



////////////////////////////////////////
// Gestion Quest 
////////////////////////////////////////

    // Payement et Entré dans la partie 
    function getInQuest () public payable {
            require(msg.value == questPrice);
            require(players[msg.sender] == false, "Vous avez deja paye pour cette Quete");
            players[msg.sender] = true;
            playersCount++;
    }

    // Modification Quest
    function questTitleChange(string memory newNameQuest) public restricted returns( string memory ){
            questTitle = newNameQuest;
            return (questTitle);
    }


    // Get Section Quest  - envois des données View 

    function getQuestTitle() public view returns ( string memory  ){
        return questTitle;
    }

    function getQuestPrice() public view returns (uint){
        return (questPrice);
    }

    function getQuestBalance() public view returns (uint){
        return address(this).balance;
    }

        function getQuestSummary() public view returns(address, string memory, string memory, string memory, uint, uint, uint, bool) {
        return(
            manager,
            questTitle,
            questDescription,
            questPicture,
            questPrice,
            playersCount,
            questResponseCount,
            questCompleted
        );
    }


    // function getAllPlayersResponseCount() public view returns(uint) {
    //     return (enigmePlayersResponses.length);
    // }


    // Withdraw Balence When a player have finish All
    function withdrawBalanceQuest(address recipient) public payable onlyPlayer {

        uint i = 0;
        require(enigmes.length > 0);
        while(i < enigmes.length){
            require(enigmes[i].enigmeFinishBy[msg.sender]);
            i++;
        }
        payable(recipient).transfer(address(this).balance);
        questCompleted = true;
        questPrice = 0;
    }

////////////////////////////////////////
// Gestion Enigme
////////////////////////////////////////

    // Create Enigme
    function createEnigme(string memory titleEnigme, string memory contentEnigme, string memory reponseEnigme, string memory clueEnigme1, string memory clueEnigme2, string memory clueEnigme3) public restricted {
      Enigme storage newEnigme = enigmes.push();
            newEnigme.enigmeTitle = titleEnigme;  
            newEnigme.enigmeContent = contentEnigme;
            newEnigme.enigmeClue1 = clueEnigme1;
            newEnigme.enigmeClue1Unlock = 100;
            newEnigme.enigmeClue2 = clueEnigme2;
            newEnigme.enigmeClue2Unlock = 200;
            newEnigme.enigmeClue3 = clueEnigme3;
            newEnigme.enigmeClue3Unlock = 300;
           // enigmeResponse= reponseEnigme;
            newEnigme.enigmeResponseCount = 0;
            newEnigme.enigmeComplete = false;
            newEnigme.enigmeFinishByCount = 0;
            newEnigme.tryResponse[reponseEnigme] = true;
        
        
    }


    // Try a Reponse to an Enigme

    function tryEnigmePlayerReponse(uint indexEnigme, string memory reponsePlayer) public onlyPlayer returns(bool) {
        Enigme storage enigme = enigmes[indexEnigme];


        if(enigme.tryResponse[reponsePlayer]){

            require(enigme.enigmeFinishBy[msg.sender] == false, "Vous avez deja fini cette Enigme.");
            enigme.enigmeFinishBy[msg.sender] = true;
            enigme.enigmeFinishByCount++;
            
        }
        else {
            enigme.enigmePlayersResponses.push(reponsePlayer);
            enigme.enigmeResponseCount++;
            questResponseCount++;
           // createEnigmePlayerResponse(indexEnigme, reponsePlayer);
            
        }

    }

    // Create a Response
    // function createEnigmePlayerResponse(uint indexEnigme, string memory reponsePlayer) private onlyPlayer {
        
    //     EnigmePlayerResponse memory newEnigmePlayerResponse = EnigmePlayerResponse({
    //         enigmeIndex: indexEnigme,
    //         playerAddress: msg.sender,
    //         playerResponse: reponsePlayer
    //     });
    //     enigmePlayersResponses.push(newEnigmePlayerResponse);
    //     enigmes[indexEnigme].enigmeResponseCount++;
    // }



    

    // Modification Enigme
    function enigmeTitleChange(uint indexEnigme, string memory newNameEnigme) public restricted{
            enigmes[indexEnigme].enigmeTitle = newNameEnigme;
    }

    function enigmeClueChange(uint indexEnigme, uint indexEnigmeClue, string memory newEnigmeClue) public restricted{
            Enigme storage enigme = enigmes[indexEnigme];

            require(indexEnigmeClue >= 1 && indexEnigmeClue <= 3);
            if(indexEnigmeClue == 1){
                enigme.enigmeClue1 = newEnigmeClue;
            }
            else if (indexEnigmeClue == 2){
                enigme.enigmeClue2 = newEnigmeClue;
            }
            else
                enigme.enigmeClue3 = newEnigmeClue;
    }

    function enigmeClueUnlockChange(uint indexEnigme, uint indexEnigmeClue, uint newEnigmeClueUnlock) public restricted{
            Enigme storage enigme = enigmes[indexEnigme];

            require(indexEnigmeClue >= 1 && indexEnigmeClue <= 3);
            if(indexEnigmeClue == 1){
                enigme.enigmeClue1Unlock = newEnigmeClueUnlock;
            }
            else if (indexEnigmeClue == 2){
                enigme.enigmeClue2Unlock = newEnigmeClueUnlock;
            }
            else
                enigme.enigmeClue3Unlock = newEnigmeClueUnlock;
    }

    // Get Section Enigme - envois des données View 

    function getEnigmeCount() public view returns(uint) {
        return enigmes.length;
    }

    function getEnigmeSummary(uint index) public view returns(string memory, string memory, uint, bool) {
        return(
            enigmes[index].enigmeTitle,
            enigmes[index].enigmeContent,
            //enigmes[index].enigmeResponse,
            enigmes[index].enigmeResponseCount,
            enigmes[index].enigmeComplete
        );
    }

    function getEnigmePlayersResponses(uint enigmeIndex) public view returns(string[] memory){
        
        return(enigmes[enigmeIndex].enigmePlayersResponses);
    }

    

}