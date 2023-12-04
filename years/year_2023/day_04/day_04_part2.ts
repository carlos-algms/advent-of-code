export function day04Part2(lines: string[]): number {
  const cardsPile: Record<number, number> = {};

  for (let l = 0; l < lines.length; l++) {
    addCardToPile(cardsPile, l, 1);

    const line = lines[l];
    const [_gameData, cardData] = line.split(': ');
    const [draw, bet] = cardData.split(' | ');

    const drawSet = new Set(draw.trim().split(/\s+/g));
    const betSet = new Set(bet.trim().split(/\s+/g));
    const matches = [...betSet].filter((number) => drawSet.has(number));

    for (let f = l + 1, to = l + matches.length; f <= to && f < lines.length; f++) {
      addCardToPile(cardsPile, f, cardsPile[l]);
    }
  }

  const totalCards = Object.values(cardsPile).reduce((acc, quantity) => acc + quantity, 0);
  return totalCards;
}

function addCardToPile(pile: Record<number, number>, index: number, quantity: number) {
  if (pile[index] === undefined) {
    pile[index] = 0;
  }

  pile[index] += quantity;
}
