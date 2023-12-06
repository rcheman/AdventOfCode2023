const fs = require('fs');
const path = require('path');

const data = fs.readFileSync(path.resolve(__dirname, './2023_6_data.txt'), 'utf8');

// Get the time and the distance data
const splitData = data.split("\n")
const maxTimes = splitData[0].split(":      ")[1]
const distances = splitData[1].split(":  ")[1]

console.log(distances)


// let winCounts = [];

// for (let i = 0; i < maxTimes.length; i++) {
//   findWinningTimes(Number(distances[i]), Number(maxTimes[i]), Number(maxTimes[i]))
//
// }
//
// let total = winCounts.reduce((a,b) => a*b, 1)
// console.log(total)
// divide the distance + 1 by the time, decreasing the time until the result of the division plus the time are less than the max time

findWinningTimes(Number(distances), Number(maxTimes), Number(maxTimes))

function findWinningTimes(distance, time, maxTime){
  console.log("distance: ", distance)
  console.log("time: ", time)

  let winningTally = 0;
  while (time > 0){
    if (((distance + 1) / time + time) <= maxTime){
      winningTally ++
    }
    time --

  }
  console.log(winningTally)
}
