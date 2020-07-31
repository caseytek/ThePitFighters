let playerOneFighters = [];
let playerTwoFighters = [];
let fighterNumber = 0;
const finalNumberOfFighters = 6;
let playerNumber = 1;
let playerOneFighter;
let playerTwoFighter;
let playerTwoWeapon;
let playerOneWeapon;

let playAgainMenu = document.getElementById("play-again-menu");
let fighterElement = document.getElementById('fighter-name');
let fighterForm_p = document.querySelector("#fighter-form>p");
let fighterForm = document.getElementById("fighter-form");
let playGame_p = document.querySelector("#play-game>p");


wireUpButtons();

function wireUpButtons(){
    let addFighterButton = document.getElementById("fighter-name");
    
    addFighterButton.addEventListener("keyup", function(event) {
        if (event.keyCode === 13) {
            document.getElementById("add-fighter-btn").click();
        }
    });

}

function addFighter()
{
    if(playerNumber === 1){
        assignFighter(playerOneFighters);
    } else {
        assignFighter(playerTwoFighters);
    }
 }

 function assignFighter(fighters){
    let fighter = fighterElement.value;
    if(validateFighter(fighter, fighters)){
        fighters.push(fighter.toUpperCase().trim());
        fighterElement.value = "";
        fighterNumber++;
        let listItem = document.createElement("li");
        listItem.textContent = fighters[fighterNumber -1];
        listItem.setAttribute('id', fighter);    
        document.querySelector("#player-" + playerNumber + "-fighters").appendChild(listItem);
    } else {
        alert('Invalid fighter name!');  
    }
    if(fighterNumber === finalNumberOfFighters && playerNumber === 2){
        fighterForm.style.display = 'none';
        addPlayButton();    
    } else if(fighterNumber === finalNumberOfFighters && playerNumber === 1){
        fighterForm_p.innerHTML = 'Player 2, Please enter six fighters'
        fighterNumber = 0;
        playerNumber = 2;
    }
 }

 function addPlayButton(){
    let button = document.createElement("button");
    button.setAttribute("id", "play-game-btn");
    button.textContent = 'Begin the battle';
    button.addEventListener("click", function(){
        getFighters()
     });
    document.getElementById("play-game").appendChild(button);
 }

 function getFighters(){
    let elementExists = document.getElementById("play-game-btn");
    if(elementExists){
    removeButton("play-game-btn");
    }
    playerOneFighter = getRandomPlayer(playerOneFighters);
    playerTwoFighter = getRandomPlayer(playerTwoFighters);
    playGame_p.innerHTML = playerOneFighter + ' VS ' + playerTwoFighter;
    showWeaponMenu();
}

let weaponMenu_p = document.querySelector("#select-weapon>p");
let weaponMenu = document.querySelector("#select-weapon");
 function showWeaponMenu(){
    playerNumber = 1;
     weaponMenu_p.innerHTML ="Player #"
      + playerNumber + " , Please select  " + playerOneFighter + "'s weapon.";
    weaponMenu.style.display = 'block';  
 }

 function assignFighterWeapon(){
     try {
        let weapon = document.querySelector('input[name="weapon"]:checked').value;
        if(playerNumber == 1){
            playerOneWeapon = weapon;
            playerNumber = 2;
            document.querySelector("#select-weapon>p").innerHTML ="Player #"
          + playerNumber + " , Please select  " + playerTwoFighter + "'s weapon.";
          resetRadioButtons();
        } else {
            playerTwoWeapon = weapon;
            document.getElementById("select-weapon").style.display = 'none'; 
            resetRadioButtons();
            determineRoundOutcome();
        }
    } catch (error) {
        alert('Please select a weapon.');
     }
 }

 function resetRadioButtons(){
    let radioList = document.getElementsByName('weapon');
    radioList.forEach(element => {
        element.checked = false;
    });
 }

 function determineRoundOutcome(){

    let winner;

    if(playerOneWeapon === playerTwoWeapon)
    {
        winner = 0;
    } else 
    {
    switch (playerOneWeapon)
        {
        case "Crossbow":
            winner = (playerTwoWeapon === "Dagger" || playerTwoWeapon === "Warhammer") ? 1 : 2;
            break;
        case "Spear":
            winner = (playerTwoWeapon === "Crossbow" || playerTwoWeapon === "Warhammer") ? 1 : 2;
            break
        case "Sword and shield":
            winner = (playerTwoWeapon === "Crossbow" || playerTwoWeapon) === "Spear" ?  1 : 2;
            break;
        case "Warhammer":
            winner = (playerTwoWeapon === "Dagger" || playerTwoWeapon) === "Sword and shield" ?  1 : 2;
            break;
        default:
            winner = (playerTwoWeapon === "Spear" || playerTwoWeapon) === "Sword and shield" ?  1 : 2; 
        }
    }

    let result = removeLosers(winner);
    playGame_p.innerHTML = result;
    document.getElementById("continue").style.display = "inline";
    }

function determineIfGameContinues(){
    document.getElementById("continue").style.display = "none";
    playGame_p.innerHTML = '';

    if(playerTwoFighters.length === 0 && playerTwoFighters.length === 0){
        playGame_p.innerHTML = 'You both have no remaining players. No one wins!';
        displayReplayOptions();
    }
    else if(playerOneFighters.length === 0){
        playGame_p.innerHTML = 'Player 1 has ran out of fighers. Player 2 wins!';
        displayReplayOptions();
    } else if (playerTwoFighters.length === 0){
        playGame_p.innerHTML = 'Player 2 has ran out of fighers. Player 1 wins!';
        displayReplayOptions();
    } else {
        getFighters();
    }
}

function displayReplayOptions(){
    playAgainMenu.style.display = 'block';  
}

function continueOrNot(){
    let choice = document.querySelector('input[name="continue"]:checked').value;
    playAgainMenu.style.display = 'none';
    playGame_p.innerHTML = '';

    if(choice === 'yes'){
        resetGame();
    } else {
        playGame_p.innerHTML = 'Goodbye!';
    }
}

function resetGame(){
    let playerOneList = document.getElementById('player-1-fighters');
    playerOneList.innerHTML = '';
    let playerTwoList = document.getElementById('player-2-fighters');
    playerTwoList.innerHTML = '';
    playerOneFighters = [];
    playerTwoFighters = [];
    fighterForm_p.innerHTML = 'Player 1, Please enter six fighters'
    fighterNumber = 0;
    playerNumber = 1;
    document.getElementById("fighter-form").style.display = 'block';
}

function removeLosers(winner){

    let playerOneListItem = document.getElementById(playerOneFighter);
    let playerTwoListItem = document.getElementById(playerTwoFighter);
    let result;

    if(winner === 0){
        result = 'Both fighters yielded a ' + playerTwoWeapon + ' and died!';
        playerOneFighters.splice(playerOneFighters.indexOf(playerOneFighter), 1);
        playerTwoFighters.splice(playerTwoFighters.indexOf(playerTwoFighter), 1);
        playerOneListItem.parentNode.removeChild(playerOneListItem);
        playerTwoListItem.parentNode.removeChild(playerTwoListItem);
    } else if (winner === 1){
        result = playerOneFighter + ' defeats  ' + playerTwoFighter + 's ' + 
        playerTwoWeapon + ' with a ' + playerOneWeapon + '!';
        playerTwoFighters.splice(playerTwoFighters.indexOf(playerTwoFighter), 1);
        playerTwoListItem.parentNode.removeChild(playerTwoListItem);
    } else {
        result = playerTwoFighter + ' defeats  ' + playerOneFighter + 's ' + 
        playerOneWeapon + ' with a ' + playerTwoWeapon + '!';
        playerOneFighters.splice(playerOneFighters.indexOf(playerOneFighter), 1);
        playerOneListItem.parentNode.removeChild(playerOneListItem);
    }

    return result;
}

 function getRandomPlayer(fighters){
    let num = Math.floor(Math.random() * fighters.length);
    return fighters[num];
 }

 function removeButton(id){
    let button = document.getElementById(id);
    button.parentNode.removeChild(button);
 }

 function validateFighter(fighter, fighters){

    fighter = fighter.replace(/^\s+/, '').replace(/\s+$/, '');
    let foundFighter = false;
     fighters.forEach(element => {
         if(fighter.toUpperCase() === element){
             foundFighter = true;
         };
     });

     if(fighter && !foundFighter){
         return true;
     } else {
         return false;
     }
 }