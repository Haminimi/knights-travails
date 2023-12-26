class Graph {
	constructor() {
		this.vertices = new Map();
	}

	addVertex(vertex) {
		this.vertices.set(vertex.toString(), []);
	}

	addEdge(vertex1, vertex2) {
		const key1 = vertex1.toString();
		const key2 = vertex2.toString();

		if (!this.vertices.has(key1) || !this.vertices.has(key2)) {
			console.error('Invalid vertices.');
			return;
		}

		if (!this.vertices.get(key1).includes(key2)) {
			this.vertices.get(key1).push(key2);
		}

		if (!this.vertices.get(key2).includes(key1)) {
			this.vertices.get(key2).push(key1);
		}
	}

	printGraph() {
		for (const [vertex, edges] of this.vertices) {
			console.log(`${vertex} -> ${edges.join(', ')}`);
		}
	}
}
