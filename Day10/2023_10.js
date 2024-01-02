const fs = require('fs');
const path = require('path');

const data = fs.readFileSync(path.resolve(__dirname, './2023_10_data.txt'), 'utf8');

let rows = data.split("\n")

// find S (the animal's starting point)
let startingIndex;
for (let i = 0; i < rows.length; i++){
  let index = rows[i].indexOf("S")
  if (index !== -1){
    startingIndex = [i, index]
  }
}

console.log(startingIndex)
// from S, identify the loop of pipes

/**
 * Key:
 * "|" = north - south
 * "-" = east - west
 * "L" = north - east
 * "J" = north - west
 * "7" = South - west
 * "F" = south - east
 * "." = ground
 */
findLoop(startingIndex, rows)

function findLoop(startingIndex, rows){
  let loopLength = 0;
  let i = startingIndex[0]
  let j = startingIndex[1]
  console.log(rows[i][j])
  let currPipe = [[i],[j], "start"]

  // Check if we should go North
  if (rows[i-1][j] === "|" || rows[i-1][j] === "7" || rows[i-1][j] === "F") {
    i--
    currPipe = [i, j, rows[i][j], "N"]
  }
  // Check if we should go east
  else if (rows[i][j+1] === "-" || rows[i][j+1] === "7" || rows[i][j+1] === "J") {
    j++
    currPipe = [i, j, rows[i][j], "E"]
  } // Check west
  else if (rows[i][j-1] === "-" || rows[i][j-1] === "F" || rows[i][j-1] === "L"){
    j--
    currPipe = [i, j, rows[i][j], "W"]
  } // Check south
  else if (rows[i-1][j] === "|" || rows[i-1][j] === "L" || rows[i-1][j] === "J"){
    i++
    currPipe = [i, j, rows[i][j], "S"]
  }
  console.log("next pipe: ", currPipe )

  loopLength ++

  while (rows[i][j] !== "S"){
    let currShape = currPipe[2]
    let going = currPipe[3]
    // going south
    if (currShape === "|" && going === "S"){
      i++
      currPipe = [i, j, rows[i][j], "S"]
    }
    // going north
    else if (currShape === "|" && going === "N") {
      i--
      currPipe = [i,j, rows[i][j], "N"]
    } // going east
    else if (currShape === "-" && going === "E"){
      j++
      currPipe = [i,j, rows[i][j], "E"]
    } // going west
    else if (currShape === "-" && going === "W"){
      j--
      currPipe = [i,j, rows[i][j], "W"]
    } // going north-west
    else if (currShape === "7" && going === "N"){
      j--
      currPipe = [i,j, rows[i][j], "W"]
    } // going east-south
    else if (currShape === "7" && going === "E"){
      i++
      currPipe = [i,j,rows[i][j], "S"]
    } // going south-east
    else if (currShape === "L" && going === "S"){
      j++
      currPipe = [i,j,rows[i][j], "E"]
    } // going west-north
    else if (currShape === "L" && going === "W"){
      i--
      currPipe = [i,j,rows[i][j], "N"]
    } // going south-west
    else if (currShape === "J" && going === "S"){
      j--
      currPipe = [i,j,rows[i][j], "W"]
    } // going east-north
    else if (currShape === "J" && going === "E"){
      i--
      currPipe= [i,j,rows[i][j], "N"]
    } // going west-south
    else if (currShape === "F" && going === "W"){
      i++
      currPipe = [i,j,rows[i][j], "S"]
    } // going north-east
    else if (currShape === "F" && going === "N"){
      j++
      currPipe= [i,j,rows[i][j], "E"]
    }
    loopLength++
    console.log(currPipe)
  }

  console.log("Final Loop length: ", loopLength)

  console.log("Furthest steps: ", loopLength/2)

}

// function changeDirection()

// find the length of the loop and divide that by 2