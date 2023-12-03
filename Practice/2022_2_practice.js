/*
Scoring Rules for Rock Paper Scissors
Total score = sum of scores for each round

Round scoring
*************
Rock = 1
Paper = 2
Scissors = 3

Outcome
Lost = 0
Draw = 3
Won = 6


Symbols
*************
Rock = X/A
Paper = Y/B
Scissors = Z/C
 */

// Import the data
const fs = require('fs');
const path = require('path');

const data = fs.readFileSync(path.resolve(__dirname, './2022_2_data.txt'), 'utf8');

// Track my score throughout the game
let total = 0;
// Split the file into lines as each line is a round
let rounds = data.split('\n');

rounds.forEach(calculateScore)
console.log(total)
// Divide each round into my opponents choice and my choice


function calculateScore(round) {
  let splitRound = round.split(' ');
  // calculate number value of choices
  let opponentChoice = choiceValue(splitRound[0])
  choose(opponentChoice, splitRound[1])
}

function choiceValue(choice){
 if (choice === "A"){
   return 1
 } else if (choice === "B"){
   return 2
 } else {
   return 3
 }
}

// X = Lose, Y = Draw, Z = Win
function choose(opponent, result){
  // tie
  if (result === "Y"){
    total += opponent;
    total += 3;
    return opponent
  } // win
    else if (result === "Z") {
      total += 6
      if (opponent === 1) total += 2;
      if (opponent === 2) total += 3;
      if (opponent === 3) total += 1;
  } // lose
    else {
      if (opponent === 1) total += 3;
      if (opponent === 2) total+= 1;
      if (opponent === 3) total += 2;
  }
}
//
// function winningPoints(opponent, me) {
//   // tie
//   if (opponent === me){
//     total += 3;
//     // I win    Rock > Scissors             Paper >       Rock             Scissors > Paper
//   } else if (me === 1 && opponent === 3 || me === 2 && opponent === 1 || me === 3 && opponent === 2) {
//       total += 6;
//   }
// }
// Increase my score based on my choice
// Figure out who won the round
// Increase my score based on whether I won or not
// Repeat and report my total score