const fs = require('fs');
const path = require('path');

const data = fs.readFileSync(path.resolve(__dirname, './2023_2_data.txt'), 'utf8');

// Find the minimum number of die of each color to play each game.
// i.e. look for the highest die number for each color in each round and the highest of all rounds is the value we want
// Multiply the highest die number for each color together, get the sum of all games

const games = data.split('\n');


let totalPower = 0;

for (let i = 0; i < games.length; i++) {
  const maxDie = {
    "red": 0,
    "red,": 0,
    "green": 0,
    "green,": 0,
    "blue,": 0,
    "blue": 0,
  }
  let gameId = games[i].split(':')[0].split(' ')[1]
  let rounds = games[i].split(':')[1].split(';')
  // loop through each round and check that each count is not beyond the maximum
  for (let j = 0; j < rounds.length; j++){
    let die = rounds[j].split(' ')

    // Check each die
    for (let k = 1; k < die.length; k += 2) {
      if (maxDie[die[k+1]] < Number(die[k])) {
        maxDie[die[k+1]] = Number(die[k])
      }
    }

  }

  // Get the max values for the three colors and get the product
  let maxRed = Math.max(maxDie["red"], maxDie["red,"])
  let maxGreen = Math.max(maxDie["green"], maxDie["green,"])
  let maxBlue = Math.max(maxDie["blue"], maxDie["blue,"])
  totalPower += maxGreen * maxBlue * maxRed

  console.log(maxDie)
  console.log("rounds: ",rounds)
  console.log("total power: ", totalPower)
  console.log("****************************")
}


// find the games that are possible given these maximum die limits

// calculate the sum of the game IDs for the games that are possible