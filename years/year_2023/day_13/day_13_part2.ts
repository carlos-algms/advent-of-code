/**
 *
 */
export default function day13Part2(input: string): number {
  const blocks = input.split('\n\n');

  const sum = blocks.reduce((acc, block) => {
    const lines = block.split('\n');
    const rSize = findRowMirror(lines);

    const hSize = findHorizontalReflectionSize(lines);

    return acc + rSize * 100 + hSize;
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

    const mirrorAbove = above.join('\n');
    const mirrorBelow = below.join('\n');

    if (above.length && below.length && mirrorAbove === mirrorBelow) {
      return i;
    }
  }

  return 0;
}
