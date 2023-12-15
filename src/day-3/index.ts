import fs from 'fs';

const symbolRegex = /[*@\-+#%=\/&$]/g;
const symbolsChars = '*@-+#%=/&$';

const lines = fs.readFileSync('./src/day-3/input')
	.toString()
	.split('\n');

type Number = {
	value: number,
	lineNumber: number,
	lineIndex: number,
	numberLength: number,
}

type Symbol = {
	value: string,
	lineNumber: number,
	lineIndex: number,
}

const numbers: Number[] = lines
	.flatMap((line, lineNumber) => {
		return [...line.matchAll(/\d+/g)].map((number) => {
			return ({
				value: parseInt(number[0]),
				lineNumber,
				lineIndex: number.index!,
				numberLength: number[0].length,
			});
		}) ?? [];
	});

const symbols: Symbol[] = lines
	.flatMap((line, lineNumber) => {
		return [...line.matchAll(symbolRegex)].map((number) => ({
			value: number[0],
			lineNumber,
			lineIndex: number.index!,
		})) ?? [];
	});

function isAdjacent(number: Number, symbol: Symbol): boolean {
	for (let digitIndex = 0; digitIndex < number.numberLength; digitIndex++) {
		if (Math.abs((number.lineIndex + digitIndex) - symbol.lineIndex) < 2 &&
			Math.abs(number.lineNumber - symbol.lineNumber) < 2)
			return true;
	}

	return false;
}

const part1 = numbers.filter(number => symbols.some(symbol => isAdjacent(number, symbol)))
	.map(({value}) => value)
	.reduce((a, b) => a + b);

const part2 =  symbols
	.filter(symbol => symbol.value === "*")
	.map(symbol => numbers.filter(number => isAdjacent(number, symbol)))
	.filter(adjacentNumbers => adjacentNumbers.length === 2)
	.map(([{value: v1}, {value: v2}]) => v1 * v2)
	.reduce((a, b) => a + b);

console.log(part1);
console.log(part2);
