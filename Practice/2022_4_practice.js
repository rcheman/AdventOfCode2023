// Import the data
const fs = require('fs');
const path = require('path');

let data = fs.readFileSync(path.resolve(__dirname, './2022_4_data.txt'), 'utf8');
// divide up the lines to get to individual pairs of elves

let pairs = data.split('\n');

let count = 0;

for (let i = 0; i < pairs.length; i++){
  let pair = pairs[i].split(',');
  let elf1 = pair[0].split('-');
  let elf2 = pair[1].split('-');

  console.log("elf1: ", elf1)
  console.log('elf2: ', elf2)
  // first elf's range encompasses second elf's
  if (elf1[0] <= elf2[0] && elf1[1] >= elf2[1]){
    count ++
    // second elf's range encompasses first elf's
  } else if (elf2[0] <= elf1[0] && elf2[1] >=elf1[1]){
    count ++
  }
  console.log(count)
}

console.log(count)
// check if one elf's assignment range fully encompasses another elf's range

// identify the smaller first number in the pairing, then identify the larger number in the pairing.
// If both numbers are for the same elf, then they cover the entire section.