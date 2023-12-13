/**
 *
 */
export default function day13Part2(input: string): number {
  const blocks = input.split('\n\n');

  const sum = blocks.reduce((acc, block) => {
    const lines = block.split('\n');
    const rSize = findRowMirror(lines);

    if (rSize) {
      return acc + rSize * 100;
    }

    const hSize = findHorizontalReflectionSize(lines);

    return acc + hSize;
  }, 0);

  return sum;
}

function findHorizontalReflectionSize(lines: string[]): number {
  const transposedLines = lines[0]
    .split('')
    .map((_, colIndex) => lines.map((row) => row[colIndex]).join(''));

  return findRowMirror(transposedLines);
}

function findRowMirror(lines: string[]): number {
  for (let i = 1; i < lines.length; i++) {
    // I probably can compare only the current line with the next one
    let above = lines.slice(0, i).reverse();
    let below = lines.slice(i);

    if (above.length > below.length) {
      above.length = below.length;
    }

    if (below.length > above.length) {
      below.length = above.length;
    }

    let diffCount = 0;
    for (let l = 0; l < above.length && diffCount <= 2; l++) {
      const aboveLine = above[l];
      const belowLine = below[l];

      for (let c = 0; c < aboveLine.length && diffCount <= 2; c++) {
        if (aboveLine[c] !== belowLine[c]) {
          diffCount++;
        }
      }
    }

    if (diffCount === 1) {
      return i;
    }
  }

  return 0;
}
