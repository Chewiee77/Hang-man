import words from "/svenska-ord.json" assert { type: "json" };

// Variabels from DOM element 
const scoreBoardBtn = document.querySelector(".scoreboard");
const pvpBtn = document.querySelector(".pvp");
const hangManPic = document.querySelector("#hang_man_pic");
const letterButtons = document.querySelector("#letterButtons");
let letterBoxes;
let startGameBtn;
let selectedWord;

// Sorterar bor ord som innehåller mellanslag och - 
// Varför är inte detta en funktion?
const improvedWordList = words.filter((word) => !word.includes(" "));
console.log(improvedWordList);
const finalWordList = improvedWordList.filter((word) => !word.includes("-"));

// let selectedWord = finalWordList[Math.floor(Math.random() * words.length)];

console.log(finalWordList);
console.log(words);
console.log(words.length);
console.log(selectedWord);
// console.log(selectedWord.includes("-")); 

function startGame() {
      pickAWord();
      showEmptyLetterBoxes();
      // changeButtonActivation(false);
}
startGameBtn = document.querySelector("#startGameBtn");
document.querySelector("#startGameBtn").addEventListener("click", startGame);


// Genererar ett random ord i listan
function pickAWord() {
  selectedWord = 
    finalWordList[Math.floor(Math.random() * finalWordList.length)];

  console.log(selectedWord);
  // alert(selectedWord)
}
pickAWord();


function showEmptyLetterBoxes() {
  let letterBox = " "; 
  console.log(selectedWord);
  for (let i = 0; i < selectedWord.length; i ++) {
    console.log(selectedWord);
    console.log(selectedWord.length);
    letterBox += '<span class="box">&nbsp;</span>';
    console.log(i);
    console.log(pickAWord)
  }

  document.querySelector(".gamespace").innerHTML = letterBox;

  letterBoxes = document.querySelector(".gamespace").querySelector(".box");
}
// -------------------------------------------------------------------------------------------------------------------------------------------------------------------- 




// Nytt från malin --------------------------------------

// - jag vill ta emot ett namn
// - sätta namnet i h1 taggen
// - spara namnet i local storage 

//  H1 och input
const remember = {
  heading: document.querySelector('#remember > h1'), 
  input: document.querySelector('#remember > input')
}
// Key för Localstorage
const LS_KEY = 'hangman_Key_toLocalStorage'
// prata med gruppen om att byta namn på localStoragekey? 

// För att lägga namnet ifrån input och i H1 meningen
remember.input.addEventListener('input', event => {
  const value = event.target.value
  localStorage.setItem('LS_KEY', value)

  renderRememnerHeading(value)
});
function renderRememnerHeading(value){
  remember.heading.innerText = `Välkommen ${value}!`
}

// När webbsidan laddas hämtas det sparade namnent ifrån den lokala databasen
const savedName = localStorage.getItem(LS_KEY)
if(savedName !== '' && savedName !== null ){
  renderRememnerHeading(savedName)
  remember.input.value = savedName
}
// ---------------------------------------------------------------
// Till måndag: Vill att det händer något med input fältet efter man skrivit sitt namn (typ att den försvinner eller något)- fråga gruppen på skolan 





















