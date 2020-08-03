let playerOneFighters = [];
let playerTwoFighters = [];
let playerNumber = 1;
let fighterNumber = 0;
const finalNumberOfFighters = 2;
let playerOneFighter;
let playerTwoFighter;
let playerTwoWeapon;
let playerOneWeapon;

$("#fighter-name").keypress(function(event) { 
    if (event.keyCode === 13) { 
        $("#add-fighter-btn").click(); 
    } 
});

function addFighter()
{
    if(playerNumber === 1){
        assignFighter(playerOneFighters);
    } else {
        assignFighter(playerTwoFighters);
    }
 }

 function assignFighter(fighters){
    let fighter = $('#fighter-name').val();
    if(validateFighter(fighter, fighters)){
        fighters.push(fighter.toUpperCase().trim());
        $('#fighter-name').val('');
        fighterNumber++;
        $("#player-" + playerNumber + "-fighters").append("<li id=" + fighter + ">" + fighters[fighterNumber -1] + "</li>");
    } else {
        alert('Invalid fighter name!');  
    }
    if(fighterNumber === finalNumberOfFighters && playerNumber === 2){
        $("#fighter-form").hide();
        $("#play-game-btn").show();
    } else if(fighterNumber === finalNumberOfFighters && playerNumber === 1){
        $("#fighter-form>p").html('Player 2, Please enter six fighters');
        fighterNumber = 0;
        playerNumber = 2;
    }
 }

 function getFighters(){
    $("#play-game-btn").hide();
    playerOneFighter = getRandomPlayer(playerOneFighters);
    playerTwoFighter = getRandomPlayer(playerTwoFighters);
    $('#play-game>p').html(playerOneFighter + ' VS ' + playerTwoFighter);
    showWeaponMenu();
}

function showWeaponMenu(){
    playerNumber = 1;
     $('#select-weapon>p').html("Player #"
      + playerNumber + " , Please select  " + playerOneFighter + "'s weapon.");
    $('#select-weapon').show();  
 }

 function assignFighterWeapon(){
    let weapon = $('input[name="weapon"]:checked');
    if(weapon.val()) {
        if(playerNumber == 1){
            playerOneWeapon = weapon.val();
            playerNumber = 2;
            $("#select-weapon>p").html("Player #"
            + playerNumber + " , Please select  " + playerTwoFighter + "'s weapon.");
            $(weapon).prop('checked', false);
        } else {
            playerTwoWeapon = weapon.val();
            $("#select-weapon").hide(); 
            $(weapon).prop('checked', false);
            determineRoundOutcome();
        }
    } else {
        alert('Please select a weapon.');
        }
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
    $('#play-game>p').html(result);
    $("#continue").show();
}

function determineIfGameContinues(){
    $("#continue").hide();
    $('#play-game>p').html('');

    if(playerTwoFighters.length === 0 && playerTwoFighters.length === 0){
        $('#play-game>p').html('You both have no remaining players. No one wins!');
        $('#play-again-menu').show();
    }
    else if(playerOneFighters.length === 0){
        $('#play-game>p').html('Player 1 has ran out of fighers. Player 2 wins!');
        $('#play-again-menu').show();
    } else if (playerTwoFighters.length === 0){
        $('#play-game>p').html('Player 2 has ran out of fighers. Player 1 wins!');
        $('#play-again-menu').show();
    } else {
        getFighters();
    }
}

function continueOrNot(){
    let choice = document.querySelector('input[name="continue"]:checked').value;
    $('#play-again-menu').hide();
    $('#play-game>p').html('');

    if(choice === 'yes'){
        resetGame();
    } else {
        $('#play-game>p').html('Goodbye!');
    }
}

function resetGame(){
    $('#player-1-fighters').empty();
    $('#player-2-fighters').empty();
    playerOneFighters = [];
    playerTwoFighters = [];
    $("#fighter-form>p").html('Player 1, Please enter six fighters');
    fighterNumber = 0;
    playerNumber = 1;
    $("#fighter-form").show();
}

function removeLosers(winner){

    let result;

    if(winner === 0){
        result = 'Both fighters yielded a ' + playerTwoWeapon + ' and died!';
        playerOneFighters.splice(playerOneFighters.indexOf(playerOneFighter), 1);
        playerTwoFighters.splice(playerTwoFighters.indexOf(playerTwoFighter), 1);
        $('#'+ playerOneFighter).remove();
        $('#'+ playerTwoFighter).remove();
    } else if (winner === 1){
        result = playerOneFighter + ' defeats  ' + playerTwoFighter + 's ' + 
        playerTwoWeapon + ' with a ' + playerOneWeapon + '!';
        playerTwoFighters.splice(playerTwoFighters.indexOf(playerTwoFighter), 1);
        $('#'+ playerTwoFighter).remove();
    } else {
        result = playerTwoFighter + ' defeats  ' + playerOneFighter + 's ' + 
        playerOneWeapon + ' with a ' + playerTwoWeapon + '!';
        playerOneFighters.splice(playerOneFighters.indexOf(playerOneFighter), 1);
        $('#'+ playerOneFighter).remove();
    }
    return result;
}

 function getRandomPlayer(fighters){
    let num = Math.floor(Math.random() * fighters.length);
    return fighters[num];
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