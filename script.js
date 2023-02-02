import words from "/svenska-ord.json" assert {type: "json"};

const SCOREBOARDBTN = document.querySelector(".scoreboard");
const PVPBTN = document.querySelector(".pvp")
const PLAYBTN = document.querySelector("#startGameBtn")

const GROUND = document.querySelector("#ground")
const SCAFFOLD = document.querySelector("#scaffold")
const HEAD = document.querySelector("#head")
const BODY = document.querySelector("#body")
const ARMS = document.querySelector("#arms")
const LEGS = document.querySelector("#legs")


let selectedWord = words[Math.floor(Math.random()* words.length)];

