let playerOneFighters = [];
let playerTwoFighters = [];
let fighters = [];
let fighterNumber = 0;
const finalNumberOfFighters = 6;
let playerNumber = 1;
let playerOneFighter;
let playerTwoFIghter;
let playerTwoWeapon;
let playerOneWeapon;

let input = document.getElementById("fighter-name");

input.addEventListener("keyup", function(event) {
    // Number 13 is the "Enter" key on the keyboard
    if (event.keyCode === 13) {
      // Trigger the button element with a click
      document.getElementById("add-fighter-btn").click();
    }
  });

function addFighter()
{
    let fighter = document.getElementById('fighter-name').value;
    if(validateFighter(fighter)){
        fighters.push(fighter.toUpperCase().trim());
        document.getElementById('fighter-name').value = "";
        fighterNumber++;
        let listItem = document.createElement("li");
        listItem.textContent = '#' + fighterNumber + ': ' +  fighters[fighterNumber -1];
        listItem.setAttribute('id', fighter);    
        document.querySelector("#player-" + playerNumber + "-fighters").appendChild(listItem);
    } else {
        alert('Invalid fighter name!');  
    }
   
    if(fighterNumber === finalNumberOfFighters && playerNumber === 2){
        playerTwoFighters = fighters;
        fighters = [];
        document.getElementById("fighter-form").style.display = 'none';
        document.querySelector("#fighter-form>p").innerHTML = 'Player 1, Please enter six fighters'
        addPlayButton();    
    } else if(fighterNumber === finalNumberOfFighters && playerNumber === 1){
        document.querySelector("#fighter-form>p").innerHTML = 'Player 2, Please enter six fighters'
        playerOneFighters = fighters;
        fighters = [];
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
    document.querySelector("#play-game>p").innerHTML = playerOneFighter + ' VS ' + playerTwoFighter;
    showWeaponMenu();
}


 function showWeaponMenu(){
    playerNumber = 1;
     document.querySelector("#select-weapon>p").innerHTML ="Player #"
      + playerNumber + " , Please select  " + playerOneFighter + "'s weapon.";
    document.getElementById("select-weapon").style.display = 'block';  
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

    let result;
    if(winner === 0){
        result = 'Both fighters yielded a ' + playerTwoWeapon + ' and died!';
        
        playerOneFighters.splice(playerOneFighters.indexOf(playerOneFighter), 1);
        playerTwoFighters.splice(playerTwoFighters.indexOf(playerTwoFighter), 1);
    } else if (winner === 1){
        result = playerOneFighter + ' defeats  ' + playerTwoFighter + 's ' + 
        playerTwoWeapon + ' with a ' + playerOneWeapon + '!';
        playerTwoFighters.splice(playerTwoFighters.indexOf(playerTwoFighter), 1);
    } else {
        result = playerTwoFighter + ' defeats  ' + playerOneFighter + 's ' + 
        playerOneWeapon + ' with a ' + playerTwoWeapon + '!';
        playerOneFighters.splice(playerOneFighters.indexOf(playerOneFighter), 1);
    }

    resetFighterDisplay();
    document.querySelector("#play-game>p").innerHTML = result;
    setTimeout(() => {document.querySelector("#play-game>p").innerHTML = ''; determineIfGameContinues();}, 3000);
    }

function determineIfGameContinues(){
    if(playerTwoFighters.length === 0 && playerTwoFighters.length === 0){
        document.querySelector("#play-game>p").innerHTML = 'You both have no remaining players. No one wins!';
        displayReplayOptions();
    }
    else if(playerOneFighters.length === 0){
        document.querySelector("#play-game>p").innerHTML = 'Player 1 has ran out of fighers. Player 2 wins!';
        displayReplayOptions();
    } else if (playerTwoFighters.length === 0){
        document.querySelector("#play-game>p").innerHTML = 'Player 2 has ran out of fighers. Player 1 wins!';
        displayReplayOptions();
    } else {
        getFighters();
    }
}

function displayReplayOptions(){
    document.getElementById("play-again-menu").style.display = 'block';  
}

function continueOrNot(){
    let choice = document.querySelector('input[name="continue"]:checked').value;
    document.getElementById("play-again-menu").style.display = 'none';
    document.querySelector("#play-game>p").innerHTML = '';

    if(choice === 'yes'){
        resetGame();
    } else {
        document.querySelector("#play-game>p").innerHTML = 'Goodbye!';
    }
}

function resetGame(){
    let playerOneList = document.getElementById('player-1-fighters');
    playerOneList.innerHTML = '';
    let playerTwoList = document.getElementById('player-2-fighters');
    playerTwoList.innerHTML = '';
    playerOneFighters = [];
    playerTwoFighters = [];
    fighters = [];
    fighterNumber = 0;
    playerNumber = 1;
    document.getElementById("fighter-form").style.display = 'block';

}

function resetFighterDisplay(){

    let playerOneList = document.getElementById('player-1-fighters');
    playerOneList.innerHTML = '';
    let playerTwoList = document.getElementById('player-2-fighters');
    playerTwoList.innerHTML = '';
    let num = 1;
    playerOneFighters.forEach(element => {
        let listItem = document.createElement("li");
        listItem.textContent = '#' + num + ': ' +  element;
        document.querySelector("#player-1-fighters").appendChild(listItem); 
        num++;
    });
    num = 1;
    playerTwoFighters.forEach(element => {
         let listItem = document.createElement("li");
         listItem.textContent = '#' + num + ': ' +  element;
         document.querySelector("#player-2-fighters").appendChild(listItem); 
         num++;
     });
}

 function getRandomPlayer(fighters){
    let num = Math.floor(Math.random() * fighters.length);
    return fighters[num];
 }

 function removeButton(id){
    let button = document.getElementById(id);
    button.parentNode.removeChild(button);
 }

 function validateFighter(fighter){

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