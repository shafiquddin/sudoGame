'use strict';

const player1 = document.querySelector(`.player--0`);
const player2 = document.querySelector(`.player--1`);
const score1EL = document.querySelector('#score--0');
const score2EL = document.getElementById('score--1');
const current1 = document.getElementById('current--0');
const current2 = document.getElementById('current--1');
const dice = document.querySelector('.dice');
const rollDiceBtn = document.querySelector('.btn--roll');
const holdBtn = document.querySelector('.btn--hold');
const newGame = document.querySelector('.btn--new');

score1EL.textContent = 0;
score2EL.textContent = 0;
let score = [0, 0];
let currentScore = 0;
dice.classList.add('hidden');
let activePlayer = 0;
let playing = true;

newGame.addEventListener('click', () => {
  score1EL.textContent = 0;
  score2EL.textContent = 0;
  currentScore = 0;
  current1.textContent = 0;
  current2.textContent = 0;
  score = [0, 0];
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.remove('player--winner');
  activePlayer = 0;
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.add('player--active');
  playing = true;
});

const winner = function () {
  if (score[activePlayer] >= 100) {
    playing = false;
    dice.classList.add('hidden');
    document
      .querySelector(`.player--${activePlayer}`)
      .classList.add('player--winner');
    document
      .querySelector(`.player--${activePlayer}`)
      .classList.remove('player--active');
  }
};

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  activePlayer = activePlayer === 1 ? 0 : 1;
  player1.classList.toggle('player--active');
  player2.classList.toggle('player--active');
  currentScore = 0;
};

rollDiceBtn.addEventListener('click', () => {
  if (playing) {
    dice.classList.remove('hidden');
    const randomDice = Math.trunc(Math.random() * 6) + 1;
    dice.src = `img/dice-${randomDice}.png`;
    if (randomDice !== 1) {
      currentScore = currentScore + randomDice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      score[activePlayer] += currentScore;
      document.getElementById(`score--${activePlayer}`).textContent =
        score[activePlayer];
      winner();
      if (playing) switchPlayer();
    }
  }
});

holdBtn.addEventListener('click', () => {
  if (playing) {
    score[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      score[activePlayer];
    winner();
  } else {
    switchPlayer();
  }
});
