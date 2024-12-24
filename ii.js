// Define a class to represent a graph edge
class Edge {
    constructor(src, dest, weight) {
        this.src = src;
        this.dest = dest;
        this.weight = weight;
    }
}

// Define a class to represent a subset for union-find
class Subset {
    constructor(parent, rank) {
        this.parent = parent;
        this.rank = rank;
    }
}

// Find set of an element i (uses path compression technique)
function find(subsets, i) {
    if (subsets[i].parent !== i) {
        subsets[i].parent = find(subsets, subsets[i].parent);
    }
    return subsets[i].parent;
}

// Perform union of two sets (by rank)
function union(subsets, x, y) {
    const xroot = find(subsets, x);
    const yroot = find(subsets, y);

    if (subsets[xroot].rank < subsets[yroot].rank) {
        subsets[xroot].parent = yroot;
    } else if (subsets[xroot].rank > subsets[yroot].rank) {
        subsets[yroot].parent = xroot;
    } else {
        subsets[yroot].parent = xroot;
        subsets[xroot].rank++;
    }
}

// Function to implement Kruskal's Algorithm
function kruskalMST(edges, V) {
    // Sort edges in ascending order of weights
    edges.sort((a, b) => a.weight - b.weight);

    const result = []; // Array to store the resultant MST
    const subsets = new Array(V).fill(null).map((_, v) => new Subset(v, 0));

    let e = 0; // Index used for result[]
    let i = 0; // Index used for sorted edges

    // Number of edges to be taken is V-1
    while (e < V - 1 && i < edges.length) {
        const nextEdge = edges[i++];

        const x = find(subsets, nextEdge.src);
        const y = find(subsets, nextEdge.dest);

        // If including this edge does not cause a cycle, include it in result
        // and move to the next edge
        if (x !== y) {
            result.push(nextEdge);
            union(subsets, x, y);
            e++;
        }
    }

    return result;
}

// b. Analyze the Kruskal's Algorithm
// Time Complexity:
// - Sorting edges: O(E log E)
// - Finding and Union operations (using path compression and rank): O(E log V)
// Overall: O(E log E) (as E >= V)
// Space Complexity: O(V) for subsets
// Kruskal's Algorithm is a greedy algorithm and works well for sparse graphs.

// c. Implement the algorithm
// Example usage
const edges = [
    new Edge(0, 1, 10),
    new Edge(0, 2, 6),
    new Edge(0, 3, 5),
    new Edge(1, 3, 15),
    new Edge(2, 3, 4)
];
const V = 4; // Number of vertices

const mst = kruskalMST(edges, V);
console.log("Edges in the MST:");
mst.forEach(edge => console.log(`(${edge.src}, ${edge.dest}) -> ${edge.weight}`));