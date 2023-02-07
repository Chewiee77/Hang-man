import words from "/svenska-ord.json" assert { type: "json" };

// Variabels from DOM element
const scoreBoardBtn = document.querySelector(".scoreboard");
const pvpBtn = document.querySelector(".pvp");
const hangManPic = document.querySelector("#hang_man_pic");
const letterButtons = document.querySelector(".letterButton");
const popup = document.querySelector(".popup-container");
const endMessage = document.querySelector(".end-message");
const playAgainButton = document.querySelector(".play-again-btn");
const wrongLettersEl = document.querySelector(".wrong-letter");
const wrongGuessesEl = document.querySelector(".wrong-guesses");
const hangmanParts = document.querySelectorAll(".hangman-part");
let letterBoxes = document.querySelector(".gamespace");
let hardGameBtn = document.querySelector("#hardGameBtn");
let mediumGameBtn = document.querySelector("#mediumGameBtn");
let easyGameBtn = document.querySelector("#easyGameBtn");
let randomWord;
let selectedWord;

let wrongLetter = [];
let correctLetter = [];
let guesses = 0;
const maxGuesses = hangmanParts.length;

// Sorterar bort ord som innehåller mellanslag och -
// Varför är inte detta en funktion?
const improvedWordList = words.filter((word) => !word.includes(" "));
// console.log(improvedWordList);
const finalWordList = improvedWordList.filter((word) => !word.includes("-"));
// let selectedWord = finalWordList[Math.floor(Math.random() * words.length)];
const easyList = finalWordList.filter((word) => {
  return word.length >= 10;
});
console.log(easyList);
const mediumList = finalWordList.filter((word) => {
  return word.length > 5 && word.length < 10;
});
console.log(mediumList);
const hardList = finalWordList.filter((word) => {
  return word.length <= 5;
});
console.log(hardList);
// console.log(finalWordList);
// console.log(words);
// console.log(words.length);
// console.log(selectedWord);
// console.log(selectedWord.includes("-"));

// --------------------- FUNKTIONER ----------------------------------

function hardGame() {
  pickAWord(hardList);
  displayHangman();
  showEmptyLetterBoxes();
}
function mediumGame() {
  pickAWord(mediumList);
  displayHangman();
  showEmptyLetterBoxes();
}
function easyGame() {
  pickAWord(easyList);
  displayHangman();
  showEmptyLetterBoxes();
}

function startGame() {
  clear();
  // pickAWord(hardList);
  // displayHangman();
  // showEmptyLetterBoxes();
  console.log("TRYCKT IGEN PÅ STARTA SPEL");
  console.log(correctLetter);
  console.log(wrongLetter);

  // changeButtonActivation(false);
  // Lägg till rensa gissningar och fel bokstäver
}

hardGameBtn.addEventListener("click", hardGame);
mediumGameBtn.addEventListener("click", mediumGame);
easyGameBtn.addEventListener("click", easyGame);

playAgainButton.addEventListener("click", startGame);

// Genererar ett random ord i listan
function pickAWord(list) {
  randomWord = list[Math.floor(Math.random() * list.length)];

  selectedWord = randomWord.toUpperCase();

  console.log(selectedWord);

  // alert(selectedWord)
}

// Rensa gissningar och fel ord
function clear() {
  popup.style.display = "none";
  correctLetter = [];
  wrongLetter = [];
  letterBoxes.innerHTML = "";
  wrongLettersEl.innerHTML = "";
  wrongGuessesEl.innerHTML = "";
  resetButtons();
  showHangman();
  // displayHangman();
}

function resetButtons() {
  document.querySelectorAll("#keyBoard > button").forEach((btn) => {
    btn.classList.remove("block");
  });
}

// Visa ordet och kolla om det är rätt......
function showEmptyLetterBoxes() {
  letterBoxes.innerHTML = `
    ${selectedWord
      .split("")
      .map(
        (letter) => `
          <span class="box">
            ${correctLetter.includes(letter) ? letter : "&nbsp"}
          </span>
        `
      )
      .join("")}
  `;

  const wordInLetterBoxes = letterBoxes.innerText.replace(/\s/g, "");

  console.log(letterBoxes.innerText, wordInLetterBoxes);
  // Om vinst anropa vinstfunktionen

  if (selectedWord === wordInLetterBoxes) {
    console.log("DU VANN!!! 😀🏆😀");
    endMessage.innerText = "DU VANN!!! 😀🏆😀";
    popup.style.display = "flex";
  }
}

// --------------------------------------------------------------------------------------------------------------------------------------------------------------------

// Nytt från malin --------------------------------------

// - jag vill ta emot ett namn
// - sätta namnet i h1 taggen
// - spara namnet i local storage

//  H1 och input
const remember = {
  heading: document.querySelector("#remember > h1"),
  input: document.querySelector("#remember > input"),
};
// Key för Localstorage
const LS_KEY = "hangman_Key_toLocalStorage";
// prata med gruppen om att byta namn på localStoragekey?

// För att lägga namnet ifrån input och i H1 meningen
remember.input.addEventListener("input", (event) => {
  const value = event.target.value;
  localStorage.setItem(LS_KEY, value);

  renderRememnerHeading(value);
});
function renderRememnerHeading(value) {
  remember.heading.innerText = `Välkommen ${value}!`;
}

// När webbsidan laddas hämtas det sparade namnent ifrån den lokala databasen
let savedName = localStorage.getItem(LS_KEY);
if (savedName !== "" && savedName !== null) {
  // remember.input.value = savedName;  // TODO Ska namnet stå kvar i inputfältet? Eller ska input vara borta då?
  savedName = savedName[0].toUpperCase() + savedName.slice(1).toLowerCase(); // Gör första bokstaven stor i namnet
  renderRememnerHeading(savedName);
}
// ---------------------------------------------------------------
// Till måndag: Vill att det händer något med input fältet efter man skrivit sitt namn (typ att den försvinner eller något)- fråga gruppen på skolan

// Bokstäver

// letters är en lista med DOM = element av typen <button>
const letterButton = "abcdefghijklmnopqrstuvwxyzåäö"
  .toUpperCase() // Så det blir stor bokstav
  .split("")
  .map((letter) => {
    const button = document.createElement("button");
    button.classList.add("letterButton");

    // classList.add/remove/toggle
    button.addEventListener("click", () => {
      // använd loop-variabeln letter
      guessLetter(letter);
      //Blockera knappen från att användas igen
      if (correctLetter.includes(letter) || wrongLetter.includes(letter)) {
        button.classList.add("block");
      }
    });
    button.innerText = letter;
    return button;
  });

const keyboard = document.querySelector("#keyBoard");
for (let i = 0; i < letterButton.length; i++) {
  const button = letterButton[i];
  keyboard.append(button);
}

// Funktion för att dölja och rita upp gubben
function displayHangman() {
  hangmanParts.forEach((part, index) => {
    const errors = wrongLetter.length;

    if (index < errors) {
      part.style.display = "block";
    } else {
      part.style.display = "none";
    }
    // console.log("index: " + index);
    // console.log("errors: " + errors);
  });
}
function showHangman() {
  hangmanParts.forEach((part, index) => {
    part.style.display = "block";

    // console.log("index: " + index);
    // console.log("errors: " + errors);
  });
}

function guessLetter(letter) {
  // finns letter i selectedword?

  //"abc".search;
  let matchIndex = selectedWord.search(letter);
  console.log(matchIndex);

  if (matchIndex === -1) {
    // visar upp vilken bokstav du valt,
    if (!wrongLetter.includes(letter)) {
      // FÖRHINDRAR ARR ARRAY FYLLS PÅ MED SAMMA
      wrongLetter.push(letter);
      wrongLettersEl.innerHTML = ` ${
        wrongLetter.length > 0 ? "<p>Wrong</p>" : " "
      }
    ${wrongLetter.map((letter) => `<span>${letter}</span>`)}`;
      console.log(wrongLetter);
    }

    // sätt ut svg bild,  -- DOM  display:none

    displayHangman();
    // och uppdatera antal gissningar.
    guesses++;
    wrongGuessesEl.innerHTML = `Wrong guesses ${guesses} of ${maxGuesses} possible`;
    //om Förlust anropa förlustfunktionen.
    if (wrongLetter.length === hangmanParts.length) {
      // Här kollar vi om vi torskar!!!
      console.log(wrongLetter.length);
      console.log("DU FÖRLORADE!!! 💩💩💩💩");
      endMessage.innerText = "DU FÖRLORADE!!! 💩💩💩💩";
      popup.style.display = "flex";
    }

    // Lite olika loggar bara.............
    // console.log(guesses);
    // console.log("Ingen träff");
    // console.log("FEL" + " " + wrongLetter);
    // console.log("Längden på Array wrongLetter: " + wrongLetter.length);
    // console.log("Längden på hangmanParts: " + hangmanParts.length);
  } else {
    // Om ja, sluta leta i listan och skriva ut bokstaven i rutan
    if (selectedWord.includes(letter)) {
      if (!correctLetter.includes(letter)) {
        // FÖRHINDRAR ARR ARRAY FYLLS PÅ MED SAMMA
        console.log("RÄTT" + " " + correctLetter);
        correctLetter.push(letter);
        console.log(correctLetter);
        showEmptyLetterBoxes();
      }
    }
  }
}

// TODO Poängsystem?
// Gissa rätt ger X poäng
// Varje felgissning drar av Y poäng
// Svårighetsgrad ger multiplier x1 x2 x3

// Spara antal drag
// Spara poäng
// Sortera resultat
