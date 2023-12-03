export type Day2Part2ReturnValue = {
  sum: number;
  sums: number[];
};

export function day02Part2(input: string[]): Day2Part2ReturnValue {
  const result: Day2Part2ReturnValue = {
    sum: 0,
    sums: [],
  };

  for (const line of input) {
    const minimalLoad: Record<string, number> = {};

    const [_, roundsData] = line.split(': ');

    const rounds = roundsData.split('; ');

    for (const round of rounds) {
      const colors = round.split(', ');

      for (const color of colors) {
        const [colorCount, colorName] = color.split(' ');
        const count = parseInt(colorCount);

        if (minimalLoad[colorName] === undefined) {
          minimalLoad[colorName] = count;
        } else {
          minimalLoad[colorName] = Math.max(minimalLoad[colorName], count);
        }
      }
    }

    const sum = Object.values(minimalLoad).reduce((a, b) => a * b, 1);
    result.sum += sum;
    result.sums.push(sum);
  }

  return result;
}
