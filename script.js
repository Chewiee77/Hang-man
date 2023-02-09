import words from "/svenska-ord.json" assert { type: "json" };

// Variabels from DOM element
const body = document.querySelector("body")
const scoreBoardBtn = document.querySelector(".scoreboard");
const pvpBtn = document.querySelector(".pvp");
// const hangManPic = document.querySelector("#hang_man_pic"); -----VAD GÖR DENNA, SPARA TILLS VIDARE
// const letterButtons = document.querySelector(".letterButton"); -----VAD GÖR DENNA, SPARA TILLS VIDARE
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
let gameButtons = document.querySelector(".game-buttons");
let addNameBtn = document.querySelector('#add-name-btn');
let randomWord;
let selectedWord;

let wrongLetter = [];
let correctLetter = [];
let guesses = 0;
let wins = 0;
let losses = 0;
let name = '';
//  Heading och input(namn), score (antal-gissningar), Vinst(win/lose) 
// Objekt med string resultat i
const remember = {
  name: '',
  wins: wins,
  losses: losses,
  guesses: 0
};
const maxGuesses = hangmanParts.length;
const keyboardLetters = [
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "N",
  "O",
  "P",
  "Q",
  "R",
  "S",
  "T",
  "U",
  "V",
  "W",
  "X",
  "Y",
  "Z",
  "Å",
  "Ä",
  "Ö",
];

// Sorterar bort ord som innehåller mellanslag och - och 3 som skapar beroende på ordlängd

const improvedWordList = words.filter((word) => !word.includes(" "));

const finalWordList = improvedWordList.filter((word) => !word.includes("-"));

const easyList = finalWordList.filter((word) => {
  return word.length >= 10;
});
// console.log(easyList);
const mediumList = finalWordList.filter((word) => {
  return word.length > 5 && word.length < 10;
});
// console.log(mediumList);
const hardList = finalWordList.filter((word) => {
  return word.length <= 5;
});
// console.log(hardList);

// Skapa tangentbord med eventlyssnare
const letterButton = "abcdefghijklmnopqrstuvwxyzåäö"
  .toUpperCase() // Så det blir stor bokstav
  .split("")
  .map((letter) => {
    const button = document.createElement("button");
    button.classList.add("letterButton");
    button.classList.add("block");
    // lockButtons();

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

// ---------------------------- EVENT -----------------------------
hardGameBtn.addEventListener("click", hardGame);
mediumGameBtn.addEventListener("click", mediumGame);
easyGameBtn.addEventListener("click", easyGame);

playAgainButton.addEventListener("click", startGame);

// --------------------- FUNKTIONER ----------------------------------

// -------- Användande av tangentbord ------------------------------
function listenForKeys() {
  window.addEventListener("keypress", (e) => {
    let name = e.key.toUpperCase();
    console.log(name);
    //Blockera knappen från att användas igen // TODO
    lockButtonsUsingKeyboard(name);

    if (keyboardLetters.includes(name)) {
      guessLetter(name);
    }
  });
}

// function stopKey() { // TODO Varför tar ej denna bort...
//   window.removeEventListener("keypress", listenForKeys);
// }

function hardGame() {
  pickAWord(hardList);
  displayHangman();
  showWordOrBoxes();
  resetButtons();
  listenForKeys();
}
function mediumGame() {
  pickAWord(mediumList);
  displayHangman();
  showWordOrBoxes();
  resetButtons();
  listenForKeys();
}
function easyGame() {
  pickAWord(easyList);
  displayHangman();
  showWordOrBoxes();
  resetButtons();
  listenForKeys();
}

function startGame() {
  clear();
  lockButtons();
  // stopKey();
}

// Rensa gissningar och fel ord
function clear() {
  popup.style.display = "none";
  letterBoxes.innerHTML = "";
  selectedWord = "";
  guesses = 0;
  gameButtons.style.display = "flex";
  letterBoxes.style.display = "none";
  correctLetter = [];
  wrongLetter = [];
  wrongLettersEl.innerHTML = "";
  wrongGuessesEl.innerHTML = "";

  showHangman();
  // displayHangman();
}

// Genererar ett random ord i listan
function pickAWord(list) {
  randomWord = list[Math.floor(Math.random() * list.length)];

  selectedWord = randomWord.toUpperCase();

  console.log(selectedWord);

  // alert(selectedWord)
}

function resetButtons() {
  document.querySelectorAll("#keyBoard > button").forEach((btn) => {
    btn.classList.remove("block");
  });
}

function lockButtons() {
  document.querySelectorAll("#keyBoard > button").forEach((btn) => {
    btn.classList.add("block");
  });
}
function lockButtonsUsingKeyboard(letter) {
  document.querySelectorAll("#keyBoard > button").forEach((key) => {
    if (letter === key.innerHTML) {
      console.log(key);
      console.log(letter);
      key.classList.add("block");
    }
  });
}

// Visa ordet och kolla om det är rätt......
function showWordOrBoxes() {
  gameButtons.style.display = "none";
  letterBoxes.style.display = "block";
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

  // console.log(letterBoxes.innerText, wordInLetterBoxes); // Log för att förstå sambandet
  // Om vinst anropa vinstfunktionen

  if (selectedWord === wordInLetterBoxes) {
    // console.log("DU VANN!!! 😀🏆😀");
    endMessage.innerText = `DU VANN!!! 😀🏆😀 \n Du gissade bara fel ${guesses} gånger`;
    popup.style.display = "flex";
    wins++;
    updateUserStat(name, 1, 0, guesses);
    // stopKey();
  }
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
// Function för att visa gubben igen när man väljer spela igen i popup
function showHangman() {
  hangmanParts.forEach((part) => {
    part.style.display = "block";

    // console.log("index: " + index);
    // console.log("errors: " + errors);
  });
}

function guessLetter(letter) {
  // finns letter i selectedword?

  // "abc".search;
  let matchIndex = selectedWord.search(letter);
  // console.log(matchIndex);

  if (matchIndex === -1) {
    // visar upp vilken bokstav du valt,
    if (!wrongLetter.includes(letter)) {
      // FÖRHINDRAR ARR ARRAY FYLLS PÅ MED SAMMA
      wrongLetter.push(letter);
      wrongLettersEl.innerHTML = ` ${
        wrongLetter.length > 0 ? "<p>Wrong Letters:</p>" : " "
      }
    ${wrongLetter.map((letter) => `<span>${letter}</span>`)}`;
      console.log(wrongLetter);
      // och uppdatera antal gissningar.
      guesses++;
      wrongGuessesEl.innerHTML = `Wrong guesses: <br/> ${guesses} of ${maxGuesses} possible`;
    }

    // sätt ut svg bild,  -- DOM  display:none

    displayHangman();

    if (wrongLetter.length === hangmanParts.length) {
      // Här kollar vi om vi torskar!!!
      console.log(wrongLetter.length);
      console.log("DU FÖRLORADE!!! 💩💩💩💩");
      endMessage.innerText = `DU FÖRLORADE!!! \n 💩💩💩💩 \n Ordet var ${selectedWord}`;
      popup.style.display = "flex";
      losses++;
      updateUserStat(name, 0, 1, guesses);
      // stopKey();
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
        correctLetter.push(letter);
        // console.log("RÄTT" + " " + correctLetter);
        // console.log(correctLetter);
        showWordOrBoxes();
      }
    }
  }
}

// -------------------------------scoreboard

// när man trycker på scoreboard-knappen ska det komma upp en popup overlay.
// i popupen ska det finna 3 rubriker: namn, antal fel gissningar och om man har vunnit eller förlorar.
// i under rubrikerna ska det sparade datan visas.
// en filtrerings knapp ska finnas där man kan filterera mellan kronologisk ordning (namn i alfabetiskordning) / bäst resultat
// knapp [stäng]


scoreBoardBtn.addEventListener("click", () => {
  let scoreOverlay = document.createElement("div")
  scoreOverlay.classList.add("scoreoverlay")
  scoreOverlay.addEventListener("click", () => {
    scoreOverlay.remove()
  })

  let scorePopUp = document.createElement("div")
  scorePopUp.classList.add("scorepopup")
  scorePopUp.addEventListener("click", event => {
    event.stopPropagation()
  })

  let scoreNameContainer = document.createElement("div");
  scoreNameContainer.classList.add('scoreboard-name');

  let scoreWrongGuessesContainer = document.createElement("div")
  scoreWrongGuessesContainer.classList.add('scoreboard-guesses');

  let scoreWinLoseContainer = document.createElement("div")
  scoreWinLoseContainer.classList.add('scoreboard-wins');

  // ta in befintlig data
  let data = checkLocalStorage();
  console.log(data);

  let scoreHeadingName = document.createElement("h2")
  scoreHeadingName.innerText = "Namn"

  let scoreHeadingWrongGuesses = document.createElement("h2")
  scoreHeadingWrongGuesses.innerText = "Felgissningar"
  let scoreHeadingWinLose = document.createElement("h2")
  scoreHeadingWinLose.innerText = "Vinst"

  body.append(scoreOverlay)
  scoreOverlay.append(scorePopUp)
  scoreNameContainer.append(scoreHeadingName);
  scorePopUp.append(scoreNameContainer)
  scorePopUp.append(scoreWrongGuessesContainer)
  scorePopUp.append(scoreWinLoseContainer)
  
  // lägg till namn från LS
  let nameEl = document.createElement('p');
  nameEl.innerText = data.name;
  scoreNameContainer.insertAdjacentElement('beforeend', nameEl);
  
  
  // lägg till felgissningar från LS
  let guessesEl = document.createElement('p');
  guessesEl.inneText = data.guesses;
  scoreWrongGuessesContainer.insertAdjacentElement('beforeend', guessesEl);
  
  scoreWrongGuessesContainer.append(scoreHeadingWrongGuesses);
  // lägg till vinst? boolean? 
  
  let scoreEl = document.createElement('p'); 
  scoreEl.inneText = data.wins;
  scoreHeadingWinLose.insertAdjacentElement('beforeend', scoreEl);
  
  scoreWinLoseContainer.append(scoreHeadingWinLose)
})


// ---------------------------------------------------------------------------------------------------------------------------------------------

// GÖra om stringvärdet till 
let rememberScoreParseValue = JSON.stringify(remember);

// Key för Localstorage
const LS_KEY = "hangman_Key_toLocalStorage";


// För att lägga namnet ifrån input och i H1 meningen
// remember.inputName.addEventListener("input", (event) => {
//   const value = event.target.value;
//   localStorage.setItem(LS_KEY, value);

//   renderRememberHeading(value);
//   updateUserStat(value, wins, losses, guesses);
// });
function renderRememberHeading(value) {
  remember.heading.innerText = `Välkommen ${value}!`;
}

// När webbsidan laddas hämtas det sparade namnent ifrån den lokala databasen
let savedName = localStorage.getItem(LS_KEY);
if (savedName !== "" && savedName !== null) {
  // remember.input.value = savedName;  // TODO Ska namnet stå kvar i inputfältet? Eller ska input vara borta då?
  savedName = savedName[0].toUpperCase() + savedName.slice(1).toLowerCase(); // Gör första bokstaven stor i namnet
  renderRememberHeading(savedName);
}

// kolla om local storage redan innehåller data:
function checkLocalStorage() {
  let data = localStorage.getItem('userStats');
  data = JSON.parse(data);
  if (data == null) {
    data = remember;
  }
  return data;
};

// funktion för att uppdatera LS på användaren
function updateUserStat(name, win, loss, guesses) {
  let previousData = checkLocalStorage();
  if (previousData !== null) {
    let data = {
      name: name,
      wins: previousData.wins + win,
      losses: previousData.losses + loss,
      guesses: previousData.guesses + guesses
    };
    localStorage.setItem('userStats', JSON.stringify(data));
  } else {
    let data = {
      name: name,
      wins: wins,
      losses: losses,
      guesses: guesses
    };
    localStorage.setItem('userStats', JSON.stringify(data));
  }
};

// vid lägg till namn så vill vi ha data på användaren
addNameBtn.addEventListener('click', () => {
  console.log('du klickade');
  let newName = document.querySelector('#name-input').value;
  name = newName;
  updateUserStat(newName, 0, 0, 0);
});