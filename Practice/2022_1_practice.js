// Input: groups of numbers separated by two new lines
// Output: a single number that is the highest total of a group of numbers

// import the data from the file
const fs = require('fs');
const path = require('path');

const data = fs.readFileSync(path.resolve(__dirname, './2022_1_data.txt'), 'utf8');

let elves = data.split('\n\n');
let elf_totals = [];

// get the total for each elf and compare to the max
for (let i = 0; i < elves.length; i++){
  // loop through each elves values to get their individual total
  let total = 0;
  let elf_calories = elves[i].split('\n')

  for (let j = 0; j < elf_calories.length; j++){
    total += Number(elf_calories[j]);
  }
  elf_totals.push(total)
}
function compare(a,b){
  return a-b
};

elf_totals.sort(compare);

let top3total = elf_totals[elf_totals.length -1] + elf_totals[elf_totals.length -2] + elf_totals[elf_totals.length -3]
console.log(top3total)



