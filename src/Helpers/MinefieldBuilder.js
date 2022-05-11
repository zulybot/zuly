function mineGen (mines) {
	let i;
	const mineField = [];
	const width = 9;
	const height = 9;
	for (i = 0; i < height; ++i) {
		mineField.push(Array(width).fill(0));
	}

	let squaresLeft = width * height;
	for (i = 0; i < mines; ++i) {
		const nextSquare = Math.floor(Math.random() * squaresLeft);
		let insertX = 0;
		let insertY = 0;
		[insertY, insertX] = nthOpenSquare(mineField, nextSquare);
		mineField[insertY][insertX] = -1;
		let j;
		let k;
		// Incrementing the mine counts of surrounding squares
		for (j = -1; j <= 1; ++j) {
			for (k = -1; k <= 1; ++k) {
				const currY = insertY + j;
				const currX = insertX + k;
				if (currY < 0 || currY >= height || (currX < 0 || currX >= width)) {
					continue;
				}
				if (mineField[currY][currX] !== -1) {
					++mineField[currY][currX];
				}
			}
		}

		--squaresLeft;
		if (squaresLeft === 0) {
			break;
		}
	}

	let boardStr = '';
	for (i = 0; i < height; ++i) {
		for (let j = 0; j < width; ++j) {
			boardStr += codeToEmoji(mineField[i][j]);
		}
		boardStr += '\n';
	}

	return boardStr;
}

function nthOpenSquare (mineField, n) {
	let openSquaresSeen = 0;
	const height = mineField.length;
	const width = mineField[0].length;

	for (let i = 0; i < height; ++i) {
		for (let j = 0; j < width; ++j) {
			if (mineField[i][j] !== -1) {
				if (openSquaresSeen === n) {
					return [i, j];
				}
				++openSquaresSeen;
			}
		}
	}
}

function codeToEmoji (n) {
	switch (n) {
		case 0:
			return ' ||:zero:|| ';
		case 1:
			return ' ||:one:|| ';
		case 2:
			return ' ||:two:|| ';
		case 3:
			return ' ||:three:|| ';
		case 4:
			return ' ||:four:|| ';
		case 5:
			return ' ||:five:|| ';
		case 6:
			return ' ||:six:|| ';
		case 7:
			return ' ||:seven:|| ';
		case 8:
			return ' ||:eight:|| ';
		case -1:
			return ' ||:boom:|| ';
	}
}
module.exports = mineGen;