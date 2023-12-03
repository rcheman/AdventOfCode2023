const fs = require('fs');
const path = require('path');

const data = fs.readFileSync(path.resolve(__dirname, './2022_3_data.txt'), 'utf8');

// Each line is a separate rucksack
// There are two compartments in each rucksack and the rucksack is split exactly in half
// Find the item that is in both compartments
// The items have priority values a-z are 1-26 and A-Z are 27-52
// Get the sum of all the priority values for each item that appears in both compartments

let total = 0;

// split into each individual rucksack
let sacks = data.split("\n");
priorityPerGroup(sacks)
console.log(total)

function priorityPerGroup(sacks){
  // Look through the first sack
  for (let i = 0; i < sacks.length; i += 3){
    for (let j = 0; j < sacks[i].length; j++){
      // compare item in the first sack with items in the second and third sack
      if (sacks[i+1].includes(sacks[i][j]) && sacks[i+2].includes(sacks[i][j])){
        let item = sacks[i][j]
        // get the items value
        addPriorityValue(item)
        break;
      }
    }

    // get the priority value for said item
    // add value to running total

  }
}


function priorityPerSack(sacks){
  sacks.forEach((sack) => {
    // split the rucksack into two even compartments
    let second_half = sack.slice(sack.length/2)
    // go through the first compartment and check if each item is also in the second compartment (array.includes)
    for (let i = 0; i < sack.length/2; i++){
      if (second_half.includes(sack[i])){
    // get the point value of the item by checking if it is upper or lower case, and then getting the ASCII value using .charCodeAt
        let item = sack[i]
        addPriorityValue(item)

        break;
      }
    }
  })
}

function addPriorityValue(item) {
  // Is lowercase
  if (item.toLowerCase() === item) {
    total  += item.charCodeAt(0) - 96
  } else {
    // Is uppercase
    total += item.charCodeAt(0) - 38
  }
}




// Add the point total to our running sum