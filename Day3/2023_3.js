const fs = require('fs');
const path = require('path');

const data = fs.readFileSync(path.resolve(__dirname, './2023_3.txt'), 'utf8');

// go through each line and look for a number
// when you find a digit, check for a symbol in all directions around it
// if there is a symbol, keep going until you find the end of the number and then add that entire number to the sum
// if there isn't a symbol, keep track of that first number but move on to see if the number is longer or is done.
// repeat

const lines = data.split('\n');

const symbolReg = /[^a-zA-Z0-9_.]/
const numberReg = /\d/

let total = 0;
// loop through each line
for (let i = 0; i < lines.length; i++) {
  let tempNum = "";
    let symbolFound = false;
  // loop through each character in the line
  for (let j = 0; j < lines[i].length; j++) {
    // Check if the character is a number
    let isNumber = numberReg.test(lines[i][j]);
    let isSymbol = symbolReg.test(lines[i][j]);

    if (!isNumber && !isSymbol){
      tempNum = ""
      continue
    }

    if (isNumber) {
      tempNum += lines[i][j]
      // search surrounding areas for symbols
      // test above
      if (i > 0) { // exclude looking above the top row
        if (symbolReg.test(lines[i-1][j-1]) || symbolReg.test(lines[i-1][j]) || symbolReg.test(lines[i-1][j+1])){
          symbolFound = true;
        }
        // test below
      }
      if (i < lines.length - 1) { // exclude looking below the bottom row
        if (symbolReg.test(lines[i+1][j-1]) || symbolReg.test(lines[i+1][j]) || symbolReg.test(lines[i+1][j+1])){
          symbolFound = true;
        }
        // test to either side
      }
      if (j > 0 && j < lines[i].length) { // exclude looking past the left and right side
        if (symbolReg.test(lines[i][j-1]) || symbolReg.test(lines[i][j+1])){
          symbolFound = true;
        }
      }
    }

    console.log("Symbol found: ", symbolFound)
    if (symbolFound){
      // find the end of the number then add total number to the sum
      while (numberReg.test(lines[i][j+1])) {
        tempNum += lines[i][j+1]
        j++
      }
      console.log("tempNumber: ", tempNum)
      total += Number(tempNum)
      // reset to look for next number
      tempNum = ""
      symbolFound = false;
    }

    console.log("total: ", total)
    console.log("Is a number: ", isNumber)
    console.log("Input: ", lines[i][j])
    console.log("**********************")
  }
}

