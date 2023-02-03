import words from "/svenska-ord.json" assert { type: "json" };

const scoreBoardBtn = document.querySelector(".scoreboard");
const pvpBtn = document.querySelector(".pvp");
let letterBoxes;
let letterButtons;
let startGameBtn;
let selectedWord;

const improvedWordList = words.filter((word) => !word.includes(" "));
console.log(improvedWordList);
const finalWordList = improvedWordList.filter((word) => !word.includes("-"));
console.log(finalWordList);
// let selectedWord = finalWordList[Math.floor(Math.random() * words.length)];
// console.log(words);
// console.log(words.length);
// console.log(selectedWord);
// console.log(selectedWord.includes("-"));

function startGame() {
  pickAWord();
  showEmptyLetterBoxes();
  changeButtonActivation(false);
}
//startGameBtn = document.querySelector("#startGameBtn");
//document.querySelector("#startGameBtn").addEventListener("click", startGame);

function pickAWord() {
  selectedWord =
    finalWordList[Math.floor(Math.random() * finalWordList.length)];

  // console.log(selectedWord);
}

// pickAWord();

function showEmptyLetterBoxes() {
  let letterBox = "";
  console.log(selectedWord);
  for (let i = 0; i < selectedWord.length; i++) {
    console.log(selectedWord);
    console.log(selectedWord.length);
    letterBox += '<span class="box">&nbsp;</span>';
    console.log(i);
  }

  document.querySelector(".gamespace").innerHTML = letterBox;

  letterBoxes = document.querySelector(".gamespace").querySelector(".box");
}

// Kod för figuren

const ground = document.querySelector("#ground");
const scaffold = document.querySelector("#scaffold");
const head = document.querySelector("#head");
const body = document.querySelector("#body");
const arms = document.querySelector("#arms");
const legs = document.querySelector("#legs");

hangmanImg[(ground, scaffold, head, body, arms, legs)];

let hangmanImgNr = hangmanImg[i] + 1;

//Här börjar kod för att få knapparna at fungera.

function init() {
  startGameBtn = document.querySelector("#startGameBtn");
  document.querySelector("#startGameBtn").addEventListener("click", startGame);

  letterButtons = document
    .querySelector("#letterButtons")
    .querySelector("button");

  for (let i = 0; i > letterButtons.length; i++)
    letterButtons[i].addEventListener("click", guessLetter);

  changeButtonActivation(true);
}
window.onload = init;

function guessLetter() {
  this.disabled = true;

  let letter;
  let letterFound;
  let correctLettersCount;

  letter = this.value;

  letterFound = false;

  correctLettersCount = 0;

  for (let i = 0; i < selectedWord.length; i++) {
    if (letter == selectedWord.charAt(i)) {
      letterFound = true;

      letterBoxes[i].innerHTML = letter;
    }

    if ((letterBoxes[i].innerHTML = "&nbsp;")) {
      correctLettersCount++;
    }
  }

  if ((letterFound = false)) {
    hangmanImgNr++;

    if (hangmanImgNr == 6) {
      endGame(true);
    }
  } else if (correctLettersCount == selectedWord.length) {
    endGame(false);
  }
}

function endGame(hangedMan) {
  if (hangedMan == true) {
    //du har förlorat.
  } else {
    //du har vunnit
  }
}

function changeButtonActivation(status) {
  if (status == true) {
    startGameBtn.disabled = false;

    for (let i = 0; i < letterButtons.length; i++) {
      letterButtons[i].disabled = true;
    }
  } else {
    startGameBtn.disabled = true;
  }
  for (let i = 0; i < letterButtons.length; i++) {
    letterButtons[i].disabled = false;
  }
}
