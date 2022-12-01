import fs from 'fs';

(async () => {
  const fileContent = await readInputFile();

  const groups = fileContent.trim().split(/\n\n/g);
  const groupsSum = groups.map((group, i) => {
    const numbers = group
      .trim()
      .split('\n')
      .map((n) => parseInt(n, 10));
    return {
      i,
      sum: numbers.reduce((acc, n) => acc + n, 0),
    };
  });

  const output = groupsSum
    .sort((a, b) => b.sum - a.sum)
    .reduce((acc, { i, sum }) => {
      acc.push(`${i} - ${sum}`);
      return acc;
    }, <string[]>[])
    .join('\n');

  fs.writeFileSync(__dirname + '/output.txt', output, 'utf8');

  const [top, second, third] = groupsSum;
  console.log(`
## Top:
Position: ${top.i}
Sum: ${top.sum}
`);

  // for part 2
  const top3Sum = [top, second, third].reduce((acc, { sum }) => acc + sum, 0);

  console.log(`
## Top 3 sum:
Sum: ${top3Sum}
`);
})();

function readInputFile(): Promise<string> {
  const inputPath = __dirname + '/input.txt';

  return new Promise<string>((resolve, reject) => {
    fs.readFile(inputPath, 'utf8', (err, data) => {
      if (err) {
        reject(err);
        return;
      }

      resolve(data);
    });
  });
}
