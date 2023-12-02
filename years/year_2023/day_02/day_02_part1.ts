export type Day2Part1ReturnValue = {
  sum: number;
  ids: string[];
};

export type BagContent = {
  red: number;
  green: number;
  blue: number;
};

export function day02Part1(input: string[], bagLoad: BagContent): Day2Part1ReturnValue {
  const result: Day2Part1ReturnValue = {
    sum: 0,
    ids: [],
  };

  for (const line of input) {
    const [game, roundsData] = line.split(': ');

    const rounds = roundsData.split('; ');
    const isPossible = rounds.every((round) => {
      const colors = round.split(', ');

      return colors.every((color) => {
        const [colorCount, colorName] = color.split(' ');
        const count = parseInt(colorCount);
        const loadedCount = bagLoad[colorName as keyof BagContent];
        return loadedCount && loadedCount >= count;
      });
    });

    if (isPossible) {
      const [_, id] = game.split(' ');
      result.ids.push(id);
      result.sum += parseInt(id);
    }
  }

  return result;
}
