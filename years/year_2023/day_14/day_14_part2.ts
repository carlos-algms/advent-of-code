const Empty = '.';
const Rounded = 'O';

/**
 *
 */
export default function day14Part2(input: string): number {
  const lines = input.split('\n');
  const state: string[][] = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].split('');
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

  let sum = 0;
  let weight = state.length;
  const matcher = /O/g;

  for (let i = 0; i < weight; i++) {
    const line = state[i].join('');
    const matches = (line.match(matcher) || []).length;

    sum += matches * (weight - i);
  }

  return sum;
}
