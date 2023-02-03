import words from "/svenska-ord.json" assert { type: "json" };

const scoreBoardBtn = document.querySelector(".scoreboard");
const pvpBtn = document.querySelector(".pvp");
let letterBoxes;
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


//Här börjar kod för att få knapparna at fungera.

function guessLetter() {
    this.disabled = true;

    let letter;
    let letterFound;
    let correctLettersCount;

    letter = this.value;

    letterFound = false;

    correctLettersCount = 0;

    for (let i = 0; i < pickAWord.length; i++) {

        if (letter == pickAWord.charAt(i)) {
            letterFound = true;

            letterBoxes[i].innerHTML = letter;
        }

        if (letterBoxes[i].innerHTML = "&nbsp;") {
            correctLettersCount++;
        }
    }

    if (letterFound = false) {
        hangmanImgNr++;

        if (hangmanImgNr == 6)
    }

}
