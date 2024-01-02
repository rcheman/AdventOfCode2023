const fs = require('fs');
const path = require('path');

const data = fs.readFileSync(path.resolve(__dirname, './2023_8_data.txt'), 'utf8');

let instructions = data.split("\n\n")[0].split("")
let unparsedNodes = data.split("\n\n")[1].split("\n")

class Graph {
  constructor(noOfVertices) {
    this.noOfVertices = noOfVertices;
    this.AdjList = {}
  }
  addVertex(v) {
    this.AdjList[v] = []
  }
  addEdge(v,w){
    this.AdjList[v].push(w);
  }
  // printGraph() {
  //   let get_keys = Object.keys(this.AdjList)
  //   for (let i of get_keys) {
  //     let get_values = this.AdjList[i];
  //     let conc = "";
  //
  //     for (let j of get_values){
  //       conc += j + " "
  //     }
  //     console.log(i + " ->" + conc)
  //   }
  // }
  // getLeft(v) {
  //   return this.AdjList[v][0]
  // }
  // getRight(v) {
  //   return this.AdjList[v][1]
  // }
}



let [graph] = createGraph(unparsedNodes)


let AKeys = findAllAs(Object.keys(graph.AdjList))
followInstructions(instructions, graph, AKeys)

// create the linked list of nodes based on the unparsedNodes
function createGraph(unparsedNodes){
  let graph = new Graph(unparsedNodes.length)

  for (let i = 0; i < unparsedNodes.length; i++){
    // split the node into it's title, left, and right
    let title = unparsedNodes[i].split(" = ")[0]
    let left = unparsedNodes[i].split("(")[1].split(",")[0]
    let right = unparsedNodes[i].split("(")[1].split(", ")[1].split(")")[0]
    graph.addVertex(title)
    // If we always add the edges as left first, then right, then [0] is left and [1] is right
    graph.addEdge(title, left)
    graph.addEdge(title, right)

  }
  return [graph]
}

function followInstructions(instructions, graph, AKeys) {
  // go through the instructions and follow the graph based on them looking for ZZZ
  // if instructions run out before finding ZZZ, repeat instructions
  let steps = 0;
  let currNodes = AKeys

  let isAllZs = false;


  let i = 0;
  while (!isAllZs) {
    if (i >= instructions.length){
      i = 0;
    }
      // Go left
      if (instructions[i] === "L"){
        currNodes[0] = graph.AdjList[currNodes[0]][0]
        currNodes[1] = graph.AdjList[currNodes[1]][0]
        currNodes[2] = graph.AdjList[currNodes[2]][0]
        currNodes[3] = graph.AdjList[currNodes[3]][0]
        currNodes[4] = graph.AdjList[currNodes[4]][0]
        currNodes[5] = graph.AdjList[currNodes[5]][0]
      } // Go right
      else if (instructions[i] === "R") {
        currNodes[0] = graph.AdjList[currNodes[0]][1]
        currNodes[1] = graph.AdjList[currNodes[1]][1]
        currNodes[2] = graph.AdjList[currNodes[2]][1]
        currNodes[3] = graph.AdjList[currNodes[3]][1]
        currNodes[4] = graph.AdjList[currNodes[4]][1]
        currNodes[5] = graph.AdjList[currNodes[5]][1]
      }
    if (currNodes[0][2] === "Z"){
      isAllZs = currNodes.filter((e) => e[2] === "Z").length === AKeys.length
    }
    steps ++
    i++
    if (steps % 10000000 === 0){
      console.log("steps: ", steps)
    }
  }
  console.log("final steps: ", steps)

}

function findAllAs(keys){
  return keys.filter((e) => e[2] === "A" )
}