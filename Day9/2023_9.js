const fs = require('fs');
const path = require('path');

const data = fs.readFileSync(path.resolve(__dirname, './2023_9_data.txt'), 'utf8');

let histories = data.split("\n");

let allDifferences = []

// get all the differences for each history
for (let i = 0; i < histories.length; i++){
  let history = histories[i].split(" ")
  history = history.map((e) => Number(e))
  allDifferences.push(getDifferences(history))
}
let predictionSum = 0;
calculateProjections(allDifferences)

console.log("Prediction Sum: ", predictionSum)


function calculateProjections(allDifferences) {

  for (let i = 0; i < allDifferences.length; i++) {
    // allDifferences[i] contains all the arrays of differences for a particular history
    let currHistory = allDifferences[i]
    let lastIndex = currHistory.length-1
    let prediction = currHistory[lastIndex-1][0] - currHistory[lastIndex][0]
    for (let j = currHistory.length -2; j > 0 ; j--) {
      // add the last value in the last array to the value in the second to last array, then add that value to the last value in the third to last etc.
      prediction = currHistory[j-1][0] - prediction
      console.log(prediction)
    }
    predictionSum += prediction
  }
}


function getDifferences(history){
  let differenceArrays = []

  // Get the first level of differences
  differenceArrays.push(getDiff(history))
  let allZero = differenceArrays[differenceArrays.length -1].filter((e) => e === 0).length === history.length - differenceArrays.length
  let i = 0;
  while (allZero === false) {
    differenceArrays.push(getDiff(differenceArrays[i]))
    // check if we are down to all zeros
    allZero = differenceArrays[differenceArrays.length -1].filter((e) => e === 0).length === history.length - differenceArrays.length
    i++
  }
  differenceArrays.unshift(history)
  return differenceArrays
}

function getDiff(history) {
  let diffs = []
  for (let i = 1; i < history.length; i++){
    diffs.push((history[i]) - (history[i-1]))
  }
  return diffs
}