const CardValue = {
  A: 14,
  K: 13,
  Q: 12,
  T: 10,
  '9': 9,
  '8': 8,
  '7': 7,
  '6': 6,
  '5': 5,
  '4': 4,
  '3': 3,
  '2': 2,
  J: 1,
};

type CardValueKey = keyof typeof CardValue;

enum Match {
  HighCard = 0,
  OnePair = 1.2,
  TwoPairs = 2.2,
  ThreeOfAKind = 3,
  FullHouse = 3.2,
  FourOfAKind = 4,
  FiveOfAKind = 5,
}

type Hand = {
  cards: string;
  bid: number;
  points: Match;
};

export function day07Part2(lines: string[]) {
  const hands: Hand[] = [];

  for (const line of lines) {
    const [cards, bid] = line.split(' ');
    const hand: Hand = {
      cards,
      bid: parseInt(bid),
      points: getPoints(cards),
    };
    hands.push(hand);
  }

  hands.sort((a, b) => {
    if (a.points === b.points) {
      for (let i = 0; i < a.cards.length; i++) {
        if (a.cards[i] === b.cards[i]) {
          continue;
        }
        return CardValue[a.cards[i] as CardValueKey] > CardValue[b.cards[i] as CardValueKey]
          ? 1
          : -1;
      }

      return 0;
    }

    return a.points > b.points ? 1 : -1;
  });

  let sum = 0;
  for (let h = 0; h < hands.length; h++) {
    const hand = hands[h];
    const bid = hand.bid;
    const rank = h + 1;
    sum += bid * rank;
  }

  return sum;
}

function getPoints(cards: string): Match {
  const matches: Record<string, number> = {};
  let jokers = 0;

  for (let c = 0; c < cards.length; c++) {
    const card = cards[c];

    if (card === 'J') {
      jokers++;
      continue;
    }

    if (!matches[card]) {
      matches[card] = 0;
    }

    matches[card]++;
  }

  if (jokers >= 4) {
    return Match.FiveOfAKind;
  }

  let points = Match.HighCard;

  Object.values(matches).some((v) => {
    if (v === 5) {
      points = Match.FiveOfAKind;
      return true;
    }
    if (v === 4) {
      points = Match.FourOfAKind;
      return true;
    }
    if (v === 3) {
      if (!points) {
        points = Match.ThreeOfAKind;
        return false;
      }

      points = Match.FullHouse;
      return true;
    }

    if (v === 2) {
      if (points === Match.ThreeOfAKind) {
        points = Match.FullHouse;
        return true;
      }

      if (points === Match.OnePair) {
        points = Match.TwoPairs;
        return true;
      }

      points = Match.OnePair;
      return false;
    }
  });

  if (jokers) {
    if (points === Match.HighCard) {
      if (jokers === 1) {
        return Match.OnePair;
      }

      return 1 + jokers;
    }

    if (points === Match.OnePair) {
      return Math.ceil(points + jokers);
    }

    if (points === Match.TwoPairs) {
      return Match.FullHouse;
    }

    if (points === Match.ThreeOfAKind) {
      return Match.ThreeOfAKind + jokers;
    }

    if (points === Match.FourOfAKind) {
      return Match.FiveOfAKind;
    }
  }

  return points;
}
