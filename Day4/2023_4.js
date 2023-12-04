const fs = require('fs');
const path = require('path');

const data = fs.readFileSync(path.resolve(__dirname, './2023_4_data.txt'), 'utf8');

const cards = data.split("\n")

let totalCards = 0;

let cardCopies = {}

for (let i = 0; i < cards.length; i++) {
  let cardNumberArray = (cards[i].split(" | ")[0].split(": ")[0].split(" "))
  let cardNumber = Number(cardNumberArray[cardNumberArray.length - 1])
  let winningNums = cards[i].split(" | ")[0].split(": ")[1].split(" ")
  // single digit numbers have a space in front of them so we end up with an empty string in the array before a single digit number
  // In the sample there are 5 winning numbers, in the full data set there are 10
  let myNums = cards[i].split(" | ")[1].split(" ")

  if (!cardCopies[cardNumber]) {
    cardCopies[cardNumber] = 1;
  } else {
    cardCopies[cardNumber]++;
  }

  // Check for card copies and loop through the number of copies you have plus one to account for original
  for (let k = cardCopies[cardNumber]; k > 0; k --){
    let cardWins = 0;
    // loop through my numbers and see if any of them are winning numbers
    for (let j = 0; j < myNums.length; j++) {
      if (myNums[j] === ''){
        continue
      }

      // for every winning number, you get additional copies of subsequent cards
      if (winningNums.includes(myNums[j])){
        cardWins++
        if (cardCopies[cardNumber + cardWins]){
          cardCopies[cardNumber + cardWins]++
        } else {
          cardCopies[cardNumber + cardWins] = 1
        }
      }
    }
  }


  console.log("cardNumber: ", cardNumber)
  console.log("cardCopies: ", cardCopies)
  console.log("****************")
}

totalCards = Object.values(cardCopies).reduce((a,b) => a + b)
  console.log("totalCards: ", totalCards)
