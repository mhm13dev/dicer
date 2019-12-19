var totalScore,
  currentScore,
  currentActive,
  btnRoll,
  btnHold,
  btnNewGame,
  winningScore,
  playerInfo_0,
  playerInfo_1;

document.querySelector(".welcome").classList.add("show-welcome");
document.querySelector(".welcome__btn-start-game").onclick = function() {
  document.querySelector(".welcome").classList.remove("show-welcome");
};
playerInfo_0 = document.querySelector(".js-player__info-0").innerHTML;
playerInfo_1 = document.querySelector(".js-player__info-1").innerHTML;

startGame();
// Events Functions
function rollEvent() {
  // Roll The Dice
  var diceRoll = Math.floor(Math.random() * 6 + 1);
  document.querySelector(".roll-img").src = "./img/dice-" + diceRoll + ".png";

  if (diceRoll !== 1) {
    // If Roll is other than 1, then update current score
    currentScore += diceRoll;
    document.querySelector(
      ".js-current-score-" + currentActive
    ).textContent = currentScore;
  } else {
    // If Roll is 1, then set current score = 0,
    // take his turn and give it to the other player
    changePlayer();
  }
}

function holdEvent() {
  // Update Total Score of Player
  if (currentScore !== 0) {
    totalScore[currentActive] += currentScore;
    document.querySelector(".js-total-score-" + currentActive).textContent =
      totalScore[currentActive];

    // check if winner
    if (totalScore[currentActive] >= winningScore) {
      document.querySelector(".js-winner-" + currentActive).style.display =
        "block";
      document.querySelector(
        ".js-player__name-" + currentActive
      ).style.display = "none";
      document.querySelector(
        ".js-player__turn-" + currentActive
      ).style.display = "none";

      currentScore = 0;
      document.querySelector(
        ".js-current-score-" + currentActive
      ).textContent = 0;

      btnRoll.removeEventListener("click", rollEvent);
    } else {
      document.querySelector(".roll-img").src = "./img/dice-1.png";

      changePlayer();
    }
  }
}

function newGameEvent() {
  document
    .querySelector(".js-player-" + currentActive)
    .classList.remove("active");

  document.querySelector(".js-player__info-0").innerHTML = playerInfo_0;
  document.querySelector(".js-player__info-1").innerHTML = playerInfo_1;
  startGame();
  document.querySelector(".welcome").classList.add("show-welcome");
}

function changePlayer() {
  currentScore = 0;
  document.querySelector(".js-current-score-" + currentActive).textContent = 0;
  document
    .querySelector(".js-player-" + currentActive)
    .classList.remove("active");
  currentActive === 0 ? (currentActive = 1) : (currentActive = 0);
  document.querySelector(".js-player-" + currentActive).classList.add("active");
}

function startGame() {
  totalScore = [0, 0];
  currentScore = 0;
  currentActive = 0;
  winningScore = 20;

  document.querySelector(".js-total-score-0").textContent = 0;
  document.querySelector(".js-total-score-1").textContent = 0;
  document.querySelector(".js-current-score-0").textContent = 0;
  document.querySelector(".js-current-score-1").textContent = 0;
  document.querySelector(".js-player-" + currentActive).classList.add("active");
  document.querySelector(".js-winner-0").style.display = "none";
  document.querySelector(".js-winner-1").style.display = "none";

  // Add Events
  btnRoll = document.querySelector(".js-btn-roll");
  btnRoll.addEventListener("click", rollEvent);

  btnHold = document.querySelector(".js-btn-hold");
  btnHold.addEventListener("click", holdEvent);

  btnNewGame = document.querySelector(".js-btn-new-game");
  btnNewGame.addEventListener("click", newGameEvent);
}
