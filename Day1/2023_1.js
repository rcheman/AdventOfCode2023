const fs = require('fs');
const path = require('path');

const data = fs.readFileSync(path.resolve(__dirname, './2023_1.txt'), 'utf8');

let lines = data.split("\n");
let total = 0;

// For part 1, used a Set and nested loops to check each character and see if it's in the set
// const numbers = new Set(['1','2','3','4','5','6','7','8','9','0']);


const spelled_numbers = {
  'one': '1',
  'two': '2',
  'three': '3',
  'four': '4',
  'five': '5',
  'six': '6',
  'seven': '7',
  'eight': '8',
  'nine': '9',
}

for (let i = 0; i < lines.length; i++) {
  let temp_num_string = "";
  // capture groups with look ahead to account for overlapping words ie. "eightwo"
  let regex = new RegExp((/(?=((one)|(two)|(three)|(four)|(five)|(six)|(seven)|(eight)|(nine)|\d))/g))
  // matchAll has an array with additional properties, the second element is the capture group we want
  const matches = Array.from(lines[i].matchAll(regex), (match) => match[1])


  // Get the value of the number string
  if (spelled_numbers[matches[0]]){
    temp_num_string += spelled_numbers[matches[0]]
  } else {
    temp_num_string += matches[0]
  }

  if (spelled_numbers[matches[matches.length -1]]){
    temp_num_string += spelled_numbers[matches[matches.length -1]]
  } else {
    temp_num_string += matches[matches.length -1]
  }

  total += Number(temp_num_string);
}

console.log(total)
