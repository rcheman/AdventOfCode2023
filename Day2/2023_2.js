const fs = require('fs');
const path = require('path');

const data = fs.readFileSync(path.resolve(__dirname, './2023_2.txt'), 'utf8');

// Limitations: 12 red, 13 green, 14 blue

const games = data.split('\n');

const maxDie = {
  "red": 12,
  "red,": 12,
  "green": 13,
  "green,": 13,
  "blue ": 14,
  "blue": 14,
}

let gameIdTotal = 0;

for (let i = 0; i < games.length; i++) {
  let gameId = games[i].split(':')[0].split(' ')[1]
  console.log("Game Id: ", gameId)
  let rounds = games[i].split(':')[1].split(';')
  // loop through each round and check that each count is not beyond the maximum
  let exitLoop = false;
  for (let j = 0; j < rounds.length; j++){
    let die = rounds[j].split(' ')

    for (let k = 1; k < die.length; k += 2) {
      if (maxDie[die[k+1]] < die[k]) {
        console.log('impossible')
        gameIdTotal -= Number(gameId);
        exitLoop = true;
        break
      }
    }
    if (exitLoop) {
      break
    }
  }
  gameIdTotal += Number(gameId)

  console.log("rounds: ",rounds)
  console.log(gameIdTotal)
}


// find the games that are possible given these maximum die limits

// calculate the sum of the game IDs for the games that are possible