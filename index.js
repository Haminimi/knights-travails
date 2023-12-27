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

	addSquares() {
		for (let i = 0; i < 8; i++) {
			for (let j = 0; j < 8; j++) {
				this.addVertex([i, j]);
			}
		}
	}

	addKnightEdge(square) {
		const knightMovesArray = [
			[1, 2],
			[2, 1],
			[-1, -2],
			[-2, -1],
			[-1, 2],
			[-2, 1],
			[1, -2],
			[2, -1],
		];

		for (const move of knightMovesArray) {
			const newSquare = [square[0] + move[0], square[1] + move[1]];

			if (
				newSquare[0] >= 0 &&
				newSquare[0] < 8 &&
				newSquare[1] >= 0 &&
				newSquare[1] < 8
			) {
				this.addEdge(square, newSquare);
			}
		}
	}

	generateKnightEdges() {
		for (let i = 0; i < 8; i++) {
			for (let j = 0; j < 8; j++) {
				this.addKnightEdge([i, j]);
			}
		}
	}

	knightMoves(current, target) {
		current = current.toString();
		target = target.toString();
		const visited = new Set();
		const queue = [[current, [current]]];

		while (queue.length > 0) {
			const [currentSquare, path] = queue.shift();

			if (currentSquare === target) {
				const resultMessage = `You made it in ${
					path.length - 1
				} moves. Here is your path:`;
				console.log(resultMessage);
				return path;
			}

			if (!visited.has(currentSquare)) {
				visited.add(currentSquare);
				const options = this.vertices.get(currentSquare);
				options.forEach((option) => {
					queue.push([option, path.concat(option)]);
				});
			}
		}
	}
}

const chessboard = new Graph();
function initialize() {
	chessboard.addSquares();
	chessboard.generateKnightEdges();
	chessboard.printGraph();
}

initialize();
console.log(chessboard.knightMoves([0, 0], [7, 7]));
