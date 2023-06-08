import _ from "lodash";
import "./styles.css";

// class that is the project and tasks for the todo list can be added to it.

// use classes or a factory function to create each item that is added to
// the specific project todo list.

const airports = "PHX BKK OKC JFK LAX MEX EZE HEL LOS LAP LIM".split(" ");

//graph can be represented 2 ways, either matrix  or adjacency list

let routes = [
  ["PHX", "LAX"],
  ["PHX", "JFK"],
  ["JFK", "OKC"],
  ["JFK", "HEL"],
  ["JFK", "LOS"],
  ["MEX", "LAX"],
  ["MEX", "BKK"],
  ["MEX", "LIM"],
  ["MEX", "EZE"],
  ["LIM", "BKK"],
];

//as an adjacency list

//the graph

const adjacencyList = new Map();

//add node to map
function addNode(airport) {
  adjacencyList.set(airport, []);
}

// add edge, undirected
function addEdge(origin, destination) {
  adjacencyList.get(origin).push(destination);
  adjacencyList.get(destination).push(origin);
}

//create the graph
airports.forEach(addNode);

routes.forEach((route) => addEdge(...route));

console.log(adjacencyList);

// breadth first seacrch
// breadth first is good for finding the shortest route
function bfs(start) {
  const visited = new Set();

  const queue = [start];

  while (queue.length > 0) {
    const airport = queue.shift(); //pulls the first element from the queue

    const destinations = adjacencyList.get(airport);

    for (const destination of destinations) {
      if (destination === "BKK") {
        console.log("found it!");
      }

      if (!visited.has(destination)) {
        // checks to see if the for loop has
        //visited a node
        visited.add(destination);
        queue.push(destination);
        console.log(destination);
      }
    }
  }
}

// bfs("PHX");

// DFS depth first search

function dfs(start, visited = new Set()) {
  console.log(start);

  visited.add(start);

  const destinations = adjacencyList.get(start);

  for (const destination of destinations) {
    if (destination === "BKK") {
      console.log("DFS found Bangkok in steps");
      return;
    }

    if (!visited.has(destination)) {
      dfs(destination, visited);
    }
  }
}

dfs("PHX");
