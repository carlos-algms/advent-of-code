import { fileReader } from '../../shared/fileReader';

enum Players {
  Opponent = 0,
  Me = 1,
  Draw,
}

enum SignsOpponent {
  Rock = 'A',
  Paper = 'B',
  Scissor = 'C',
}

enum SignsMe {
  Rock = 'X',
  Paper = 'Y',
  Scissor = 'Z',
}

enum RoundPoints {
  Lose = 0,
  Draw = 3,
  Win = 6,
}

/**
 * Maps the points to the actual sign
 * Each player has a different code for the same sign
 */
const Points = {
  [SignsOpponent.Rock]: 1,
  [SignsMe.Rock]: 1,
  [SignsOpponent.Paper]: 2,
  [SignsMe.Paper]: 2,
  [SignsOpponent.Scissor]: 3,
  [SignsMe.Scissor]: 3,
};

const SignsGuide = {
  [SignsMe.Rock]: Players.Opponent,
  [SignsMe.Paper]: Players.Draw,
  [SignsMe.Scissor]: Players.Me,
};

const SignsDraw = {
  [SignsOpponent.Rock]: SignsMe.Rock,
  [SignsOpponent.Paper]: SignsMe.Paper,
  [SignsOpponent.Scissor]: SignsMe.Scissor,
};

const SignsOpponentWins = {
  [SignsOpponent.Rock]: SignsMe.Scissor,
  [SignsOpponent.Paper]: SignsMe.Rock,
  [SignsOpponent.Scissor]: SignsMe.Paper,
};

const SignsMeWins = {
  [SignsOpponent.Rock]: SignsMe.Paper,
  [SignsOpponent.Paper]: SignsMe.Scissor,
  [SignsOpponent.Scissor]: SignsMe.Rock,
};

(async () => {
  // const input = ['A Y', 'B X', 'C Z'];
  const input = await fileReader(__dirname + '/input.txt');
  const scorePart1: [number, number] = [0, 0];
  const scorePart2: [number, number] = [0, 0];

  input.forEach((round) => {
    const [o, m] = round.split(' ') as [SignsOpponent, SignsMe];
    const [pointsOpponent, pointsMe] = getWinnerPointsPart1(o, m);
    const [pointsOpponent2, pointsMe2] = getWinnerPointsPart2(o, m);

    scorePart1[Players.Opponent] += pointsOpponent;
    scorePart1[Players.Me] += pointsMe;

    scorePart2[Players.Opponent] += pointsOpponent2;
    scorePart2[Players.Me] += pointsMe2;
  }, []);

  console.log(`
Score part 1:
  Opponent: ${scorePart1[Players.Opponent]}
  Me: ${scorePart1[Players.Me]}
  `);

  console.log(`
Score part 2:
  Opponent: ${scorePart2[Players.Opponent]}
  Me: ${scorePart2[Players.Me]}
  `);
})();

/**
 * For the part 1: Just compare the Opponent sign against the Player sign
 */
function getWinnerPart1(o: SignsOpponent, m: SignsMe): Players {
  if (Points[o] === Points[m]) {
    return Players.Draw;
  }

  if (o === SignsOpponent.Rock) {
    if (m === SignsMe.Paper) {
      return Players.Me;
    }
  } else if (o === SignsOpponent.Paper) {
    if (m === SignsMe.Scissor) {
      return Players.Me;
    }
  } else if (o === SignsOpponent.Scissor) {
    if (m === SignsMe.Rock) {
      return Players.Me;
    }
  }

  return Players.Opponent;
}

function getPointsForWinner(winner: Players): [number, number] {
  switch (winner) {
    case Players.Draw:
      return [RoundPoints.Draw, RoundPoints.Draw];

    case Players.Opponent:
      return [RoundPoints.Win, RoundPoints.Lose];

    case Players.Me:
      return [RoundPoints.Lose, RoundPoints.Win];
  }
}

function sumSignPoints(points: [number, number], o: SignsOpponent, m: SignsMe): [number, number] {
  return [points[Players.Opponent] + Points[o], points[Players.Me] + Points[m]];
}

function getWinnerPointsPart1(o: SignsOpponent, m: SignsMe): [number, number] {
  const winner = getWinnerPart1(o, m);
  const points = getPointsForWinner(winner);

  return sumSignPoints(points, o, m);
}

function getSignOverride(winner: Players, o: SignsOpponent): SignsMe {
  switch (winner) {
    case Players.Draw:
      return SignsDraw[o];

    case Players.Opponent:
      return SignsOpponentWins[o];

    default:
      return SignsMeWins[o];
  }
}

/**
 * For the part 2 I need to take in consideration the opponent sign in order to define the winner
 */
function getWinnerPointsPart2(o: SignsOpponent, m: SignsMe): [number, number] {
  const winner = SignsGuide[m];
  const points = getPointsForWinner(winner);
  const override = getSignOverride(winner, o);

  return sumSignPoints(points, o, override);
}
