import _ from "lodash";
import "./styles.css";

class Graph {
  constructor(numVertices) {
    this.numVertices = numVertices;
    this.matrix = [];

    for (let i = 0; i < numVertices; i++) {
      this.matrix[i] = [];
      for (let j = 0; j < numVertices; j++) {
        this.matrix[i][j] = 0;
      }
    }
  }

  addEdge(source, destination) {
    // Assuming the graph is undirected
    this.matrix[source][destination] = 1;
    this.matrix[destination][source] = 1;
  }

  print() {
    for (let i = 0; i < this.numVertices; i++) {
      const neighbors = [];

      for (let j = 0; j < this.numVertices; j++) {
        if (this.matrix[i][j] === 1) {
          neighbors.push(j);
        }
      }

      console.log(`Vertex ${i} is connected to: ${neighbors.join(", ")}`);
    }
  }
}

// Usage example
const graph = new Graph(5);
graph.addEdge(0, 1);
graph.addEdge(0, 4);
graph.addEdge(1, 2);
graph.addEdge(1, 3);
graph.addEdge(1, 4);
graph.addEdge(2, 3);
graph.addEdge(3, 4);

graph.print();
