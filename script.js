import words from "/svenska-ord.json" assert { type: "json" };

const scoreBoardBtn = document.querySelector(".scoreboard");
const pvpBtn = document.querySelector(".pvp");
let letterBoxes;
let startGameBtn;
let selectedWord;

<<<<<<< HEAD
const GROUND = document.querySelector("#ground")
const SCAFFOLD = document.querySelector("#scaffold")
const HEAD = document.querySelector("#head")
const BODY = document.querySelector("#body")
const ARMS = document.querySelector("#arms")
const LEGS = document.querySelector("#legs")


let selectedWord = words[Math.floor(Math.random()* words.length)];

=======
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
}
startGameBtn = document.querySelector("#startGameBtn");
document.querySelector("#startGameBtn").addEventListener("click", startGame);

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
>>>>>>> dev
