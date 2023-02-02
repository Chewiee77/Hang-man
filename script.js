import words from "/svenska-ord.json" assert {type: "json"};

const scoreBoardBtn = document.querySelector(".scoreboard");
const pvpBtn = document.querySelector(".pvp")
const playBtn = document.querySelector("#startGameBtn")


let selectedWord = words[Math.floor(Math.random()* words.length)];
console.log(words)

