import fs from 'fs';

const symbolRegex = /[*@\-+#%=\/&$]/g;
const symbolsChars = '*@-+#%=/&$';

const sum = fs.readFileSync('./src/day-3/input')
	.toString()
	.split('\n')
	.flatMap((line, lineNumber) =>
		[...line.matchAll(/\d+/g)].map((number) =>
			({
				value: parseInt(number[0]),
				lineNumber,
				lineIndex: number.index!,
				numberLength: number[0].length,
			})) ?? [])
	.filter(number => {
		const digitIndexes: number[] = [];
		for (let i = 0; i < number.numberLength; i++) {
			digitIndexes.push(i);
		}
		return digitIndexes
			.some(digitIndex =>
				[
					(fs.readFileSync('./src/day-3/input')
						.toString()
						.split('\n'))[number.lineNumber - 1]?.[number.lineIndex + digitIndex - 1],
					(fs.readFileSync('./src/day-3/input')
						.toString()
						.split('\n'))[number.lineNumber + 1]?.[number.lineIndex + digitIndex - 1],
					(fs.readFileSync('./src/day-3/input')
						.toString()
						.split('\n'))[number.lineNumber - 1]?.[number.lineIndex + digitIndex + 1],
					(fs.readFileSync('./src/day-3/input')
						.toString()
						.split('\n'))[number.lineNumber + 1]?.[number.lineIndex + digitIndex + 1],
					(fs.readFileSync('./src/day-3/input')
						.toString()
						.split('\n'))[number.lineNumber - 1]?.[number.lineIndex + digitIndex],
					(fs.readFileSync('./src/day-3/input')
						.toString()
						.split('\n'))[number.lineNumber + 1]?.[number.lineIndex + digitIndex],
					(fs.readFileSync('./src/day-3/input')
						.toString()
						.split('\n'))[number.lineNumber]?.[number.lineIndex + digitIndex - 1],
					(fs.readFileSync('./src/day-3/input')
						.toString()
						.split('\n'))[number.lineNumber]?.[number.lineIndex + digitIndex + 1],
				].filter(char => char !== undefined).some(char => symbolsChars.includes(char)));
	})
	.map(({value}) => value)
	.reduce((a, b) => a + b);

console.log(sum);
