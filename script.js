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
// const improvedWordList = words.filter((word) => !word.includes(" "));
// console.log(improvedWordList);
// const finalWordList = improvedWordList.filter((word) => !word.includes("-"));

// // let selectedWord = finalWordList[Math.floor(Math.random() * words.length)];

// console.log(finalWordList);
// console.log(words);
// console.log(words.length);
// console.log(selectedWord);
// // console.log(selectedWord.includes("-")); 

// function startGame() {
//       pickAWord();
//       showEmptyLetterBoxes();
//       // changeButtonActivation(false);
// }
// startGameBtn = document.querySelector("#startGameBtn");
// document.querySelector("#startGameBtn").addEventListener("click", startGame);


// // Genererar ett random ord i listan
// function pickAWord() {
//   selectedWord = 
//     finalWordList[Math.floor(Math.random() * finalWordList.length)];

//   console.log(selectedWord);
//   // alert(selectedWord)
// }
// pickAWord();


// function showEmptyLetterBoxes() {
//   let letterBox = " "; 
//   console.log(selectedWord);
//   for (let i = 0; i < selectedWord.length; i ++) {
//     console.log(selectedWord);
//     console.log(selectedWord.length);
//     letterBox += '<span class="box">&nbsp;</span>';
//     console.log(i);
//     console.log(pickAWord)
//   }

//   document.querySelector(".gamespace").innerHTML = letterBox;

//   letterBoxes = document.querySelector(".gamespace").querySelector(".box");
// }
// --------------------------------------------------------------------------------------------------------------------------------------------------------------------Här fungerar koden 


//  Hur Många gissningar av 6  ---------------------------------------
let maxWrong = 6;
document.getElementById('maxWrong').innerHTML = maxWrong
// ---------------------------------------------------------

// Kod för figuren

// Nytt malin --------------------------------------

// Jag vill ta emot ett namn
// -sätta namnet i h1 taggen. 
console.log('hello world')
 let h1 = document.querySelector('h1')
document.querySelector('.nameH1Btn').addEventListener('click', () => {
    console.log('Du klickade på Namnknappen')
  })
  

// Här börjar checkboxen
  let toggleVisibilityText = document.querySelector('#toggle-visibility-text')
let state = {
  isVisible: true
}

let toggleVisibility = document.querySelector('#toggle-visibility').addEventListener('input', event =>{
  const checked = event.target.checked
  console.log('Checkbox change (input event) -> ', checked)

  state.isVisible = checked

  if(state.isVisible){
    toggleVisibilityText.classList.remove('invisible')
    // när det är synligt ta bort texten/listan

  } else{
    toggleVisibilityText.classList.add('invisible')
    //när den är osynlig lägg till listan 
  }

})




  
























//  fungerar för att klicak på knappen ---------------------
//  let h1 = document.querySelector('h1')
// //  console.log('h1', h1);

// document.querySelector('.nameH1Btn').addEventListener('click', () => {
//   console.log('Du klickade på Namnknappen')

// })
 
//  console.log('hello world 3')----------------------------------------------------------------------------------------------




// FUNGERANDE CHECKBOX - SYNLIG TEXT

// let toggleVisibilityText = document.querySelector('#toggle-visibility-text')

// let state = {
//   isVisible: true
// }
// let toggleVisibility = document.querySelector('#toggle-visibility').addEventListener('input', event =>{
//   const checked = event.target.checked
//   console.log('Checkbox change (input event) -> ', checked)

//   state.isVisible = checked

//   if(state.isVisible){
//     toggleVisibilityText.classList.remove('invisible')
//     // när det är synligt ta bort texten/listan

//   } else{
//     toggleVisibilityText.classList.add('invisible')
//     //när den är osynlig lägg till listan 
//   }

// })---------------------------