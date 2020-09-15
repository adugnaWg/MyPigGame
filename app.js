/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var scores, roundScor, activePlayer, gamePlaying, previousDice, winningScore;

init();

document.querySelector(".btn-roll").addEventListener("click", function () {
  if (gamePlaying) {
    if (winningScore === 0) {
      window.alert("please set the winning score value!");
    } else {
      //1. random number
      var dice = Math.floor(Math.random() * 6) + 1;
      var dice1 = Math.floor(Math.random() * 6) + 1;
      //compare current and previous dice
      if (dice === 6 && previousDice === 6) {
        //loss entire score
        lossEntire();
      } else {
        //2. display the number
        var diceDom = document.querySelector(".dice");
        var diceDom1 = document.querySelector(".dice1");
        diceDom.style.display = "block";
        diceDom1.style.display = "block";
        diceDom.src = "dice-" + dice + ".png";
        diceDom1.src = "dice-" + dice1 + ".png";
        //3. update the round score if the rolled number was not 1
        if ((dice !== 1) && (dice1 !== 1)) {
          //add score
          roundScor += dice;
          document.querySelector("#current-" + activePlayer).textContent = roundScor;
          previousDice = dice;
        } else {
          //next player
          nextPlayer();
        }
      }
    }
  }else{
    window.alert('game ended please start new game!');
  }
});

document.querySelector(".btn-hold").addEventListener("click", function () {
  if (gamePlaying) {
    if (winningScore === 0) {
      window.alert("please set the winning score value!");
    } else {
      //add current score to global score
      scores[activePlayer] += roundScor;
      //update the UI
      document.querySelector("#score-" + activePlayer).textContent =
        scores[activePlayer];

      //check if the player won the game

      if (scores[activePlayer] >= winningScore) {
        document.querySelector("#name-" + activePlayer).textContent = "WINNER!";
        document.querySelector(".dice").style.display = "none";
        document.querySelector(".dice1").style.display = "none";
        document.querySelector(".player-" + activePlayer + "-panel").classList.add("winner");
        document.querySelector(".player-" + activePlayer + "-panel").classList.remove("active");
        gamePlaying = false;
      } else {
        //next player
        nextPlayer();
      }
    }
  } else {
    window.alert("game ended please start new game!");
  }
});
document.querySelector(".btn-new").addEventListener("click", init);
function lossEntire() {
  previousDice = 0;
  scores[activePlayer] = 0;
  document.getElementById("score-" + activePlayer).textContent = "0";
  nextPlayer();
}
document.querySelector(".btn-win-score").addEventListener("click", function () {
  if (gamePlaying) {
    if (isNaN(document.getElementById("winscore").value)) {
      window.alert("please enter number value");
    } else if (document.getElementById("winscore").value === "") {
      window.alert("empty value not allowed");
    } else {
      winningScore = document.getElementById("winscore").value;
      window.alert("winning Score value setted! please play the game");
    }
  } else{
    window.alert('game ended please start new game!');
  }
});
function nextPlayer() {
  activePlayer === 0 ? (activePlayer = 1) : (activePlayer = 0);
  roundScor = 0;
  previousDice = 0;
  document.getElementById("current-0").textContent = "0";
  document.getElementById("current-1").textContent = "0";
  document.querySelector(".player-0-panel").classList.toggle("active");
  document.querySelector(".player-1-panel").classList.toggle("active");
  //document.querySelector('.player-0-panel').classList.remove('active');
  //document.querySelector('.player-1-panel').classList.add('active');
  document.querySelector(".dice").style.display = "none";
  document.querySelector(".dice1").style.display = "none";
}
function init() {
  scores = [0, 0];
  roundScor = 0;
  activePlayer = 0;
  previousDice = 0;
  winningScore = 0;
  gamePlaying = true;
  //document.querySelector('#current-'+ activePlayer).textContent = dice;
  //document.querySelector('#current-' + activePlayer).innerHTML = '<em>' + dice + '<em>';
  document.querySelector(".dice").style.display = "none";
  document.querySelector(".dice1").style.display = "none";
  document.getElementById("score-0").textContent = "0";
  document.getElementById("winscore").value = "";
  document.getElementById("score-1").textContent = "0";
  document.getElementById("current-0").textContent = "0";
  document.getElementById("current-1").textContent = "0";
  document.getElementById("name-0").textContent = "Player 1";
  document.getElementById("name-1").textContent = "Player 2";
  document.querySelector(".player-0-panel").classList.remove("winner");
  document.querySelector(".player-1-panel").classList.remove("winner");
  document.querySelector(".player-0-panel").classList.remove("active");
  document.querySelector(".player-1-panel").classList.remove("active");
  document.querySelector(".player-0-panel").classList.add("active");
}
