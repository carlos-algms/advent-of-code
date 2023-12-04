export type Day04Part1Result = {
  /**
   * The sum of every card points
   */
  sum: number;
  matches: string[][];
};

/**
 * Line example:
 *
 * `Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53`
 */
export function day04Part1(lines: string[]): Day04Part1Result {
  const result: Day04Part1Result = {
    sum: 0,
    matches: [],
  };

  for (const line of lines) {
    const [_gameData, cardData] = line.split(': ');
    const [draw, bet] = cardData.split(' | ');

    const drawSet = new Set(draw.trim().split(/\s+/g));
    const betSet = new Set(bet.trim().split(/\s+/g));
    const matches = [...betSet].filter((number) => drawSet.has(number));

    if (matches.length > 0) {
      result.matches.push(matches);
      result.sum += doubleNTimes(matches.length);
    }
  }

  return result;
}

function doubleNTimes(n: number): number {
  if (n === 0) {
    return 0;
  }

  if (n === 1) {
    return 1;
  }

  return 2 * doubleNTimes(n - 1);
}
