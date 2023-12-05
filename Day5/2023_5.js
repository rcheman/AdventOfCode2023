const fs = require('fs');
const path = require('path');

const data = fs.readFileSync(path.resolve(__dirname, './2023_5_data.txt'), 'utf8');

// Data structure
// Destination range start, source range start, range length


// section out the input into the different maps
let maps = data.split("\n\n")
let seeds = maps.shift().split(": ")[1].split(" ")


let separatedMaps = separateMaps(maps)
let populatedMaps = populateMapRanges(separatedMaps)
let locations = getAllLocations(seeds, populatedMaps)
let minLocation = Math.min(...locations)

console.log("minLocation: ", minLocation)



function getAllLocations(seeds, populatedMaps) {
  let arr = []
  for (let i = 0; i < seeds.length; i++){
    arr.push(getLocation(seeds[i], populatedMaps))
  }
  return arr;
}

function getLocation(seed, populatedMaps) {
  // Based on the given seed, loop through the maps and find the matching values until we get the location number
  // If they key doesn't exist, then the value is the same as key
  let nextVal = Number(seed)
  for (let i = 0; i < populatedMaps.length; i++){

    // Loop through each group of [sourceStart, sourceEnd, destinationStart] to get the next value for the next map
    for (let j = 0; j < populatedMaps[i].length; j++){
      let sourceStart = populatedMaps[i][j][0]
      let sourceEnd = populatedMaps[i][j][1]
      let destinationStart = populatedMaps[i][j][2]

      // if the seed is between the source start and end, then we subtract the sourceStart from the seed, then we add that number to destination start to get our value
      // Check this for each map pairing and if the seed isn't in any of the ranges, then nextVal = seed
      if (nextVal >= sourceStart && nextVal <= sourceEnd) {
        let diff = nextVal - sourceStart;
        nextVal = destinationStart + diff
        break
      }
    }
  }
  return nextVal
}



// given the array of arrays with our map data, create objects for each map and populate them based on the maps
function populateMapRanges(mapsArray) {
  let arr = []
  for (let i = 0; i < mapsArray.length; i++) {
    arr.push(processMapToRanges(mapsArray[i]))
  }
  return arr
}


// separate out the actual data for the maps from their titles and create and array of arrays
function separateMaps(maps){
  let mapArrs = []
  for (let i = 0; i < maps.length; i++) {
    mapArrs.push(maps[i].split(":\n")[1].split("\n"))
  }
  return mapArrs
}


// expects an array of strings, each string containing the three numbers for mapping
function processMapToRanges(mapArray) {
  let arr = []
  for (let i = 0; i < mapArray.length; i++) {
    // add initial values for destination and source range
    let values = mapArray[i].split(" ")
    let destinationStart = Number(values[0])
    let sourceStart = Number(values[1])
    let rangeLen = Number(values[2])
    arr.push([sourceStart, sourceStart+rangeLen-1, destinationStart])
  }
  return arr;

}

