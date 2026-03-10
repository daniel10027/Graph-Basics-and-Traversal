class Graph {
  constructor(isDirected = false) {
    this.adjList = new Map();
    this.isDirected = isDirected;
  }

  // Add a vertex if it does not exist
  addVertex(vertex) {
    if (!this.adjList.has(vertex)) {
      this.adjList.set(vertex, []);
    }
  }

  // Add an edge between two vertices
  addEdge(u, v) {
    this.addVertex(u);
    this.addVertex(v);
    this.adjList.get(u).push(v);
    if (!this.isDirected) {
      this.adjList.get(v).push(u);
    }
  }

  // Remove an edge between two vertices
  removeEdge(u, v) {
    if (this.adjList.has(u)) {
      this.adjList.set(
        u,
        this.adjList.get(u).filter((vertex) => vertex !== v)
      );
    }
    if (!this.isDirected && this.adjList.has(v)) {
      this.adjList.set(
        v,
        this.adjList.get(v).filter((vertex) => vertex !== u)
      );
    }
  }

  // Check if an edge exists
  hasEdge(u, v) {
    return this.adjList.has(u) && this.adjList.get(u).includes(v);
  }

  // Print the adjacency list of the graph
  printGraph() {
    for (let [vertex, neighbors] of this.adjList.entries()) {
      console.log(`${vertex} -> ${neighbors.join(", ")}`);
    }
  }

  // DFS traversal
  dfs(start) {
    const visited = new Set();
    const result = [];

    const dfsHelper = (vertex) => {
      if (!vertex || visited.has(vertex)) return;
      visited.add(vertex);
      result.push(vertex);
      for (let neighbor of this.adjList.get(vertex)) {
        dfsHelper(neighbor);
      }
    };

    dfsHelper(start);
    return result;
  }

  // BFS traversal
  bfs(start) {
    const visited = new Set();
    const queue = [start];
    const result = [];

    visited.add(start);

    while (queue.length > 0) {
      const vertex = queue.shift();
      result.push(vertex);
      for (let neighbor of this.adjList.get(vertex)) {
        if (!visited.has(neighbor)) {
          visited.add(neighbor);
          queue.push(neighbor);
        }
      }
    }

    return result;
  }
}

// ------------------ Testing ------------------

// Create an undirected graph
const graph = new Graph(false);

// Add edges
graph.addEdge("A", "B");
graph.addEdge("A", "C");
graph.addEdge("B", "C");
graph.addEdge("C", "D");

// Print the graph
console.log("Graph adjacency list:");
graph.printGraph();

// Check edges
console.log("Does edge A-B exist?", graph.hasEdge("A", "B")); // true
console.log("Does edge B-D exist?", graph.hasEdge("B", "D")); // false

// DFS traversal
const dfsResult = graph.dfs("A");
console.log("DFS starting from A:", dfsResult.join(" -> "));

// BFS traversal
const bfsResult = graph.bfs("A");
console.log("BFS starting from A:", bfsResult.join(" -> "));

// Remove an edge
graph.removeEdge("A", "B");
console.log("Graph after removing edge A-B:");
graph.printGraph();