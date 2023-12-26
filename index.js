class Graph {
	constructor() {
		this.vertices = new Map();
	}

	addVertex(vertex) {
		this.vertices.set(vertex.toString(), []);
	}
}
