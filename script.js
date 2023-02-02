import words from "/svenska-ord.json" assert {type: "json"};

const SCOREBOARDBTN = document.querySelector(".scoreboard");
const PVPBTN = document.querySelector(".pvp")
const PLAYBTN = document.querySelector("#startGameBtn")


let selectedWord = words[Math.floor(Math.random()* words.lenght)];