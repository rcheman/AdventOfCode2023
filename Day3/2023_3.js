const fs = require('fs');
const path = require('path');

const data = fs.readFileSync(path.resolve(__dirname, './2023_3_data.txt'), 'utf8');

// go through each line and look for a number
// when you find a digit, check for a symbol in all directions around it
// if there is a symbol, keep going until you find the end of the number and then add that entire number to the sum
// if there isn't a symbol, keep track of that first number but move on to see if the number is longer or is done.
// repeat

const lines = data.split('\n');

const gearReg = /[*]/
const numberReg = /\d/


let total = 0;
// loop through each line
for (let i = 0; i < lines.length; i++) {
  let tempNums = new Set();
    let numberFound = false;
  // loop through each character in the line
  for (let j = 0; j < lines[i].length; j++) {
    // Check if the character is a gear
    let isNumber = numberReg.test(lines[i][j]);
    let isGear = gearReg.test(lines[i][j]);

    if (!isNumber && !isGear) {
      tempNums.clear()
      continue
    }

    if (isGear) {
      if (i > 0) { // exclude looking above the top row
        if (numberReg.test(lines[i - 1][j - 1])){
          tempNums.add(findFullNumber(i-1,j-1))
        }
        if (numberReg.test(lines[i - 1][j])){
          tempNums.add(findFullNumber(i-1, j))
        }
        if (numberReg.test(lines[i - 1][j + 1])) {
          tempNums.add(findFullNumber(i-1, j+1))
        }
        // test below
      }
      if (i < lines.length - 1) { // exclude looking below the bottom row
        if (numberReg.test(lines[i + 1][j - 1])) {
          tempNums.add(findFullNumber(i+1,j-1))
        }
        if (numberReg.test(lines[i + 1][j])) {
          tempNums.add(findFullNumber(i+1, j))
        }
        if (numberReg.test(lines[i + 1][j + 1])) {
          tempNums.add(findFullNumber(i+1, j+1))
        }
        // test to either side
      }
      if (j > 0 && j < lines[i].length) { // exclude looking past the left and right side
        if (numberReg.test(lines[i][j - 1])) {
          tempNums.add(findFullNumber(i, j-1))
        }
        if (numberReg.test(lines[i][j + 1])) {
          tempNums.add(findFullNumber(i, j+1))
        }
      }
      // Make sure we have more than one part
      if (tempNums.size > 1) {
        let gearNumbers = tempNums.values()
        let num1 = Number(gearNumbers.next().value)
        let num2 = Number(gearNumbers.next().value)
        total += num1 * num2
      }
    }


    console.log("total: ", total)
    console.log("Is a gear: ", isGear)
    console.log("Found numbers: ", tempNums)
    console.log("Input: ", lines[i][j])
    console.log("**********************")

    function findFullNumber(I, J) {
      let foundNumber = "";
      // look back until you find the beginning of the number
      while (numberReg.test(lines[I][J-1])){
        J--
      }
      foundNumber += lines[I][J]
      // continue until the end of the number
      while (numberReg.test(lines[I][J+1])){
        J++
        foundNumber += lines[I][J]
      }
      return foundNumber
    }

  }
}

