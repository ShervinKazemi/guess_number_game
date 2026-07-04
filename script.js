"use strict";

// Variable
const player0El = document.querySelector(".player--0");
const player1El = document.querySelector(".player--1");

const secretNumber = document.querySelector(".number");

const currentScore0El = document.querySelector(".player__score--0");
const currentScore1El = document.querySelector(".player__score--1");

const totalScore0El = document.querySelector(".total-score--0");
const totalScore1El = document.querySelector(".total-score--1");

const btnChecks = document.querySelectorAll(".check");
const btnReset = document.querySelector(".reset");

let scores, currentScores, activePlayer, randomNumber;

function init() {
  scores = [0, 0];
  currentScores = [20, 20];
  activePlayer = 0;
  randomNumber = Math.trunc(Math.random() * 20) + 1;
  updateUi();
  player1El.classList.remove("player--active");
  player0El.classList.add("player--active");
  document.querySelector(".input--0").value = "";
  document.querySelector(".input--1").value = "";
  document.querySelector(".player__state--0").textContent = "Start Guessing...";
  document.querySelector(".player__state--1").textContent = "Start Guessing...";
}

init();

function getInputValue() {
  return Number(document.querySelector(`.input--${activePlayer}`).value);
}

function displayMessage(message) {
  document.querySelector(`.player__state--${activePlayer}`).textContent =
    message;
}

function updateUi() {
  currentScore0El.textContent = currentScores[0];
  currentScore1El.textContent = currentScores[1];

  totalScore0El.textContent = scores[0];
  totalScore1El.textContent = scores[1];
}

function switchPlayer() {
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.remove("player--active");

  document.querySelector(`.input--${activePlayer}`).value = "";
  activePlayer = activePlayer === 0 ? 1 : 0;

  document
    .querySelector(`.player--${activePlayer}`)
    .classList.add("player--active");

  displayMessage("Start Guessing...");
}

function checkGuess() {
  const guessNumber = getInputValue();

  if (currentScores[activePlayer] === 0) {
    displayMessage("Loser");
    return;
  }

  if (!guessNumber) {
    displayMessage("No number!");
    return;
  }

  if (guessNumber === randomNumber) {
    scores[activePlayer] += currentScores[activePlayer];
    currentScores[activePlayer] = 20;
    secretNumber.textContent = randomNumber;

    updateUi();

    if (scores[activePlayer] >= 100) {
      displayMessage("Victory 🎉");
      return;
    }

    displayMessage("Perfect!");

    randomNumber = Math.trunc(Math.random() * 20) + 1;

    setTimeout(() => {
      secretNumber.textContent = "?";
      switchPlayer();
    }, 1000);

    return;
  } else if (guessNumber > 20) {
    displayMessage("1 between 20");
    return;
  } else if (guessNumber > randomNumber) {
    displayMessage("To high");
    currentScores[activePlayer]--;
    updateUi();
    setTimeout(() => {
      switchPlayer();
    }, 1000);
    return;
  } else if (guessNumber < randomNumber) {
    displayMessage("To low");
    currentScores[activePlayer]--;
    updateUi();
    setTimeout(() => {
      switchPlayer();
    }, 1000);
    return;
  }
}

btnChecks.forEach((btn) =>
  btn.addEventListener("click", function (e) {
    e.preventDefault();
    checkGuess();
  }),
);

btnReset.addEventListener("click", init);
