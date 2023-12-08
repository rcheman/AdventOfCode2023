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
  printGraph() {
    let get_keys = Object.keys(this.AdjList)
    for (let i of get_keys) {
      let get_values = this.AdjList[i];
      let conc = "";

      for (let j of get_values){
        conc += j + " "
      }
      console.log(i + " ->" + conc)
    }
  }
  getLeft(v) {
    return this.AdjList[v][0]
  }
  getRight(v) {
    return this.AdjList[v][1]
  }
}



let [graph] = createGraph(unparsedNodes)

graph.printGraph()

followInstructions(instructions, graph)

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

function followInstructions(instructions, graph) {
  // go through the instructions and follow the graph based on them looking for ZZZ
  // if instructions run out before finding ZZZ, repeat instructions
  let steps = 0;
  let currNode = "AAA"

  let i = 0;
  while (currNode !== "ZZZ") {
    if (i >= instructions.length){
      i = 0;
    }
      // Go left
      if (instructions[i] === "L"){
        currNode = graph.getLeft(currNode)
      } // Go right
      else if (instructions[i] === "R") {
        currNode = graph.getRight(currNode)
      }
      steps ++
      i++
  }
  console.log("steps: ", steps)

}