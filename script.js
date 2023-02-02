import words from "/svenska-ord.json" assert { type: "json" };

const scoreBoardBtn = document.querySelector(".scoreboard");
const pvpBtn = document.querySelector(".pvp");
const playBtn = document.querySelector("#startGameBtn");

let letterBoxes;
let startGameBtn = document.querySelector("#startGameBtn");

const improvedWordList = words.filter((word) => !word.includes(" "));
console.log(improvedWordList);
const finalWordList = improvedWordList.filter((word) => !word.includes("-"));
console.log(finalWordList);
let selectedWord = words[Math.floor(Math.random() * words.length)];
// console.log(words);
// console.log(words.length);
// console.log(selectedWord);
// console.log(selectedWord.includes("-"));

document.querySelector("#startGameBtn").addEventListener("click", startGame);

function pickAWord() {
  let selectedWord = finalWordList[Math.floor(Math.random() * words.length)];

  // console.log(selectedWord);
}

// pickAWord();

function showEmptyLetterBoxes() {
  let letterBox = "";

  for (let i = 0; i < selectedWord.length; i++) {
    console.log(selectedWord);
    console.log(selectedWord.length);
    letterBox += '<span class="box">&nbsp;</span>';
    console.log(i);
  }

  document.querySelector(".gamespace").innerHTML = letterBox;

  letterBoxes = document.querySelector(".gamespace").querySelector(".box");
}

function startGame() {
  pickAWord();
  showEmptyLetterBoxes();
}
