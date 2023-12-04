const fs = require('fs');
const path = require('path');

const data = fs.readFileSync(path.resolve(__dirname, './2023_4_data.txt'), 'utf8');

const cards = data.split("\n")

let total = 0;

for (let i = 0; i < cards.length; i++) {
  let cardPoints = 0;
  let winningNums = cards[i].split(" | ")[0].split(": ")[1].split(" ")
  // single digit numbers have a space in front of them so we end up with an empty string in the array before a single digit number
  // In the sample there are 5 winning numbers, in the full data set there are 10
  let myNums = cards[i].split(" | ")[1].split(" ")

  // loop through my numbers and see if any of them are winning numbers
  for (let j = 0; j < myNums.length; j++) {
    if (myNums[j] === ''){
      continue
    }

    if (winningNums.includes(myNums[j])){
      if (cardPoints === 0) {
        cardPoints ++
      } else {
        cardPoints *= 2
      }
    }
  }
  total += cardPoints



  console.log("winningNums: ", winningNums)
  console.log("myNums: ", myNums)
  console.log("total: ", total)
  console.log("****************")
}
