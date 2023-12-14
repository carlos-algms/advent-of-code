const Empty = '.';
const Rounded = 'O';

const repeatTimes = 1000000000;

/**
 *
 */
export default function day14Part2(input: string): number {
  let lines = input.split('\n').map((line) => line.split(''));

  let i = 0;
  const seen = new Map<string, number>();
  const history: string[] = [turnIntoKey(lines)];

  while (i < repeatTimes) {
    i++;

    for (let x = 1; x <= 4; x++) {
      lines = moveRocks(lines);
      lines = rotateArrayClockWise(lines);
    }

    const key = turnIntoKey(lines);
    if (seen.has(key)) {
      break;
    }

    seen.set(key, i);
    history.push(turnIntoKey(lines));
  }

  const firstOccurrence = seen.get(turnIntoKey(lines))!;
  const index = ((repeatTimes - firstOccurrence) % (i - firstOccurrence)) + firstOccurrence;
  const target = history[index].split('\n').map((line) => line.split(''));

  const sum = sumWeight(target);
  return sum;
}

function turnIntoKey(lines: string[][]): string {
  return lines.map((line) => line.join('')).join('\n');
}

function moveRocks(lines: string[][]): string[][] {
  const state: string[][] = [];
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    state.push(line);

    for (let c = 0; c < line.length; c++) {
      const char = line[c];
      if (char !== Rounded) {
        continue;
      }

      for (let l = i - 1; l >= 0; l--) {
        const prevLine = state[l];
        const prevChar = prevLine[c];
        if (prevChar !== Empty) {
          break;
        }

        prevLine[c] = Rounded;
        state[l + 1][c] = Empty;
      }
    }
  }

  return state;
}

function rotateArrayClockWise(state: string[][]): string[][] {
  const transposed = state[0].map((_, colIndex) => state.map((row) => row[colIndex]));
  return transposed.map((row) => row.reverse());
}

function sumWeight(lines: string[][]): number {
  let sum = 0;
  let weight = lines.length;
  const matcher = /O/g;

  for (let i = 0; i < weight; i++) {
    const line = lines[i].join('');
    const matches = (line.match(matcher) || []).length;

    sum += matches * (weight - i);
  }

  return sum;
}
