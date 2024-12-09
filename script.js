'use strict';

// Selecting Elements
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.querySelector('#score--0');
const score1El = document.querySelector('#score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
let dice = 0;
let currentPlayer = 0;

// Starting conditions
let currentScore = 0;
let scores = [0, 0];
let playing = true;

const init = function () {
  currentScore = 0;
  scores = [0, 0];
  playing = true;
  diceEl.classList.add('hidden');
  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
};

init();
console.log('Starting with the player: ', currentPlayer + 1);

const switchPlayer = () => {
  currentScore = 0;
  if (currentPlayer === 0) {
    player0El.classList.remove('player--active');
    player1El.classList.add('player--active');
    currentPlayer = 1;
  } else {
    player1El.classList.remove('player--active');
    player0El.classList.add('player--active');
    currentPlayer = 0;
  }
  document.getElementById(`current--${currentPlayer}`).textContent = 0;
  document.querySelector(`.player--${currentPlayer}`).add = '.player--active';
  console.log('Current Score Reset it');
  console.log('Now the player is ', currentPlayer + 1);
};

//Rolling dice functionality
btnRoll.addEventListener('click', function () {
  if (playing) {
    // 1. Generating a random dice roll
    dice = Math.trunc(Math.random() * 6) + 1; // Generate a random number between 1 and 6
    console.log('Dice number: ', dice);
    // 2. Display dice
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;
    // 3. Check for rolled 1: if true, switch to next player
    if (dice !== 1) {
      // Add dice to current score
      currentScore += dice;
      document.getElementById(`current--${currentPlayer}`).textContent =
        currentScore;
    } else {
      // Switch to next player
      switchPlayer();
    }
  }
});

btnHold.addEventListener('click', function () {
  if (playing) {
    // 1. Add current score to active player's score
    document.getElementById(`current--${currentPlayer}`).textContent = 0;
    scores[currentPlayer] += currentScore;
    document.getElementById(`score--${currentPlayer}`).textContent =
      scores[currentPlayer];
    // 2. Check if player's score is >= 100
    if (scores[currentPlayer] >= 10) {
      // Finish the game
      playing = false;
      diceEl.classList.remove('hidden');
      document
        .querySelector(`.player--${currentPlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${currentPlayer}`)
        .classList.remove('player--active');
    }
    // Switch to the next player
    switchPlayer();
  }
});

btnNew.addEventListener('click', init);
