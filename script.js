import words from "/svenska-ord.json" assert { type: "json" };

// Variabels from DOM element
const body = document.querySelector("body");
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
const letterBoxes = document.querySelector(".gamespace");
const hardGameBtn = document.querySelector("#hardGameBtn");
const mediumGameBtn = document.querySelector("#mediumGameBtn");
const easyGameBtn = document.querySelector("#easyGameBtn");
const gameButtons = document.querySelector(".game-buttons");
let randomWord;
let selectedWord;

let gameActive = false;
let win = false;
let sorted = false;

let wrongLetter = [];
let correctLetter = [];
let guesses = 0;
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
const mediumList = finalWordList.filter((word) => {
  return word.length > 5 && word.length < 10;
});
const hardList = finalWordList.filter((word) => {
  return word.length <= 5;
});

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
    if (gameActive) {
      let name = e.key.toUpperCase();
      console.log(name);
      //Blockera knappen från att användas igen // TODO
      lockButtonsUsingKeyboard(name);

      if (keyboardLetters.includes(name)) {
        guessLetter(name);
      }
    }
  });
}

function hardGame() {
  pickAWord(hardList);
  displayHangman();
  showWordOrBoxes();
  resetButtons();
  gameActive = true;
  listenForKeys();
}
function mediumGame() {
  pickAWord(mediumList);
  displayHangman();
  showWordOrBoxes();
  resetButtons();
  gameActive = true;
  listenForKeys();
}
function easyGame() {
  pickAWord(easyList);
  displayHangman();
  showWordOrBoxes();
  resetButtons();
  gameActive = true;
  listenForKeys();
}

function startGame() {
  clear();
  lockButtons();
  stopKey();
}

// Rensa gissningar och fel ord
function clear() {
  gameActive = false;
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
}

// Genererar ett random ord i listan
function pickAWord(list) {
  randomWord = list[Math.floor(Math.random() * list.length)];

  selectedWord = randomWord.toUpperCase();

  console.log(selectedWord);
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

  // Om vinst anropa vinstfunktionen

  if (selectedWord === wordInLetterBoxes) {
    gameActive = false;
    win = true;
    saveHighScore(totalScore, scores);
    endMessage.innerText = `DU VANN!!! 😀🏆😀 \n Du gissade bara fel ${guesses} gånger`;
    popup.style.display = "flex";
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
  });
}
// Function för att visa gubben igen när man väljer spela igen i popup
function showHangman() {
  hangmanParts.forEach((part) => {
    part.style.display = "block";
  });
}

function guessLetter(letter) {
  // finns letter i selectedword?

  // "abc".search;
  let matchIndex = selectedWord.search(letter);

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
      gameActive = false;
      win = false;
      saveHighScore(totalScore, scores);
      console.log(wrongLetter.length);
      console.log("DU FÖRLORADE!!! 💩💩💩💩");
      endMessage.innerText = `DU FÖRLORADE!!! \n 💩💩💩💩 \n Ordet var ${selectedWord}`;
      popup.style.display = "flex";
    }
  } else {
    // Om ja, sluta leta i listan och skriva ut bokstaven i rutan
    if (selectedWord.includes(letter)) {
      if (!correctLetter.includes(letter)) {
        // FÖRHINDRAR ARR ARRAY FYLLS PÅ MED SAMMA
        correctLetter.push(letter);
        showWordOrBoxes();
      }
    }
  }
}

// Data OCH Localstorage💩💩💩💩💩💩💩

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

// TODO Poängsystem?
// Gissa rätt ger X poäng
// Varje felgissning drar av Y poäng ---
// Svårighetsgrad ger multiplier x1 x2 x3

// Spara antal drag
// Spara poäng
// Sortera resultat
// Poäng och spara användaren
const startScore = 100;
const minusScore = guesses;
const totalScore = 0;

// Spara antal drag
// Spara poäng
// Sortera resultat

// -------------------------------scoreboard

// när man trycker på scoreboard-knappen ska det komma upp en popup overlay.
// i popupen ska det finna 3 rubriker: namn, antal fel gissningar och om man har vunnit eller förlorar.
// i under rubrikerna ska det sparade datan visas.
// en filtrerings knapp ska finnas där man kan filterera mellan kronologisk ordning (namn i alfabetiskordning) / bäst resultat
// knapp [stäng]

const HIGH_SCORES = "scores";
const scoreString = localStorage.getItem(HIGH_SCORES);
let scores = JSON.parse(scoreString) ?? [];

// saveHighScore(totalScore, scores); // TODO
// showHighScores(); // TODO

// //TODO ADDERA NAMNET
// const user = localStorage.getItem(LS_KEY);
// console.log(user);

// const newScore = { user, totalScore, win };

function saveHighScore(_, scores) {
  const user = localStorage.getItem(LS_KEY);
  if (!user) {
    const user = prompt("Enter Name:");
    localStorage.setItem(LS_KEY, user);
    const newScore = { user, guesses, win };
    scores.push(newScore);
  } else {
    // totalScore = startScore - minusScore;
    // console.log(user);
    // console.log(guesses);
    // console.log(scores);
    // console.log(startScore);
    // console.log(minusScore);
    // console.log(totalScore);
    // console.log(newScore);
    const newScore = { user, guesses, win }; // Addera vinst/förlust med win (true or false)
    scores.push(newScore);
  }
  localStorage.setItem(HIGH_SCORES, JSON.stringify(scores));
  console.log(scores);
}

// const scoreBoard = document.querySelector(".scoreboard-container");
// function showHighScores() {
//   scoreBoard.innerHTML = scores
//     .map((score) => `<li>${score.user} - ${score.guesses} - ${score.win}</li>`)
//     .join("");

//   // scorePopUp.append(scores);
// }

// showHighScores();

// Scoreboard Popup

scoreBoardBtn.addEventListener("click", () => {
  let scoreOverlay = document.createElement("div");
  scoreOverlay.classList.add("scoreoverlay");
  // showHighScores();
  scoreOverlay.addEventListener("click", () => {
    scoreOverlay.remove();

    // location.reload();
  });

  let scorePopUp = document.createElement("div");
  scorePopUp.classList.add("scorepopup");
  scorePopUp.addEventListener("click", (event) => {
    event.stopPropagation();
  });

  let scoreNameContainer = document.createElement("div");
  let scoreWrongGuessesContainer = document.createElement("div");
  let scoreWinLoseContainer = document.createElement("div");
  let scoreBtnDiv = document.createElement("div");
  scoreBtnDiv.classList.add("score-btn-div");
  let body = document.querySelector("body");
  let scoreHeadingName = document.createElement("h2");
  scoreHeadingName.innerText = "Namn ↑↓";
  let scoreDisplayUserName = document.createElement("p");
  let scoreHeadingWrongGuesses = document.createElement("h2");
  scoreHeadingWrongGuesses.innerText = "gissningar ↑↓";
  let scoreDisplayUserGuesses = document.createElement("p");
  let scoreHeadingWinLose = document.createElement("h2");
  scoreHeadingWinLose.innerText = "Resultat ↑↓";
  let scoreDisplayUserWin = document.createElement("p");

  body.append(scoreOverlay);
  scoreOverlay.append(scorePopUp);

  scorePopUp.append(scoreNameContainer);
  scorePopUp.append(scoreWrongGuessesContainer);
  scorePopUp.append(scoreWinLoseContainer);
  scorePopUp.append(scoreBtnDiv);

  scoreNameContainer.append(scoreHeadingName);
  scoreWrongGuessesContainer.append(scoreHeadingWrongGuesses);
  scoreWinLoseContainer.append(scoreHeadingWinLose);

  scoreHeadingName.append(scoreDisplayUserName);
  scoreHeadingWrongGuesses.append(scoreDisplayUserGuesses);
  scoreHeadingWinLose.append(scoreDisplayUserWin);

  // Resetknapp alldata
  const clearAllBtn = document.createElement("button");
  clearAllBtn.innerText = "Reset All";
  clearAllBtn.classList.add("clear-all-btn");
  scoreBtnDiv.append(clearAllBtn);

  clearAllBtn.addEventListener("click", () => {
    localStorage.clear();
    scoreDisplayUserName.remove();
    scoreDisplayUserGuesses.remove();
    scoreDisplayUserWin.remove();
    showHighScores();
  });

  // Rensa stats från enskild person
  // Resetknapp aktuell användare
  const removeUserBtn = document.createElement("button");
  removeUserBtn.innerText = "Reset User";
  removeUserBtn.classList.add("remove-user-btn");
  scoreBtnDiv.append(removeUserBtn);

  removeUserBtn.addEventListener("click", () => {
    // console.log(scores[0]);
    // console.log(...scores);
    // console.log(...scores);
    // console.log(JSON.parse(localStorage.getItem("scores")));
    // console.log(JSON.parse(localStorage.getItem("scores")));
    // scores.forEach((user) => {
    //   console.log(user);
    //   console.log(user.user);
    //   console.log(localStorage.getItem(LS_KEY));
    const userCheck = localStorage.getItem(LS_KEY);
    //   console.log(user.user === userCheck);
    const user = [...scores];

    for (let i = 0; i < user.length; i++) {
      // console.log([i]);
      // console.log(user);
      // console.log(user[i].user);
      // console.log(userCheck);
      // console.log(test);
      // console.log(user.user);
      // console.log(typeof user.user);
      // console.log(typeof userCheck);
      if (user[i].user === userCheck) {
        // console.log(user[i].user === userCheck);
        scores.forEach(() => {
          scores.splice(i, 1);
          localStorage.setItem(HIGH_SCORES, JSON.stringify(scores));
          console.log(user);
          console.log(scores);
          console.log(scores);
          showHighScores();
        });
        // scores.splice(i, 1);
      }
    }
    // });

    // scoreDisplayUserName.remove();
    // scoreDisplayUserGuesses.remove();
    // scoreDisplayUserWin.remove();
  });
  // Sortera namn i bokstavsordning

  scoreHeadingName.addEventListener("click", () => {
    if (!sorted) {
      scoreDisplayUserName.innerHTML = scores // TODO
        .map((score) => `<li class="score-list">${score.user}</li>`)
        .sort()
        .join("");
      sorted = true;
    } else {
      scoreDisplayUserName.innerHTML = scores // TODO
        .map((score) => `<li class="score-list">${score.user}</li>`)
        .sort()
        .reverse()
        .join("");
      sorted = false;
    }
  });

  // Sortera Felgissningar i antal

  scoreHeadingWrongGuesses.addEventListener("click", () => {
    if (!sorted) {
      scoreDisplayUserGuesses.innerHTML = scores // TODO
        .map((score) => `<li class="score-list">${score.guesses}</li>`)
        .sort()
        .join("");
      sorted = true;
    } else {
      scoreDisplayUserGuesses.innerHTML = scores // TODO
        .map((score) => `<li class="score-list">${score.guesses}</li>`)
        .sort()
        .reverse()
        .join("");
      sorted = false;
    }
  });

  // Sortera Vinster i true/false
  scoreHeadingWinLose.addEventListener("click", () => {
    if (!sorted) {
      scoreDisplayUserWin.innerHTML = scores // TODO
        .map((score) => `<li class="score-list">${score.win}</li>`)
        .sort()
        .join("");
      sorted = true;
    } else {
      scoreDisplayUserWin.innerHTML = scores // TODO
        .map((score) => `<li class="score-list">${score.win}</li>`)
        .sort()
        .reverse()
        .join("");
      sorted = false;
    }
  });

  function showHighScores() {
    scoreDisplayUserName.innerHTML = scores // TODO
      .map((score) => `<li class="score-list">${score.user}</li>`)
      .join("");
    scoreDisplayUserGuesses.innerHTML = scores // TODO
      .map((score) => `<li class="score-list">${score.guesses}</li>`)
      .join("");
    scoreDisplayUserWin.innerHTML = scores // TODO
      .map(
        (score) =>
          `<li class="score-list">${score.win ? "Vinst" : "Förlust"}</li>`
      )
      .join("");
  }
  showHighScores();
});
