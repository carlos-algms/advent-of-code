import fs from 'fs';
import assert from 'assert';

async function app() {
  //   const input = `    [D]
  // [N] [C]
  // [Z] [M] [P]
  //  1   2   3

  // move 1 from 2 to 1
  // move 3 from 1 to 3
  // move 2 from 2 to 1
  // move 1 from 1 to 2`;
  const input = await readInputFile();

  const [state, moves] = splitTheStateFromTheMoves(input);
  const state2: string[][] = JSON.parse(JSON.stringify(state));

  runMovesPart1(state, moves);
  runMovesPart2(state2, moves);

  const lastLetters = state.flatMap((r) => r.at(-1)).join('');
  const lastLetters2 = state2.flatMap((r) => r.at(-1)).join('');

  console.log(`
  # Solution part 1:
    Prase: "${lastLetters}"
  `);

  console.log(`
  # Solution part 2:
    Prase: "${lastLetters2}"
  `);
}

type Move = {
  /** the number of items to move */
  x: number;
  from: number;
  to: number;
};

function runMovesPart1(state: string[][], moves: Move[]) {
  for (const move of moves) {
    const { x } = move;
    const from = move.from - 1;
    const to = move.to - 1;

    for (let i = 0; i < x; i++) {
      const item = state[from].pop();
      if (item) {
        state[to].push(item);
      }
    }
  }
}

function runMovesPart2(state: string[][], moves: Move[]) {
  for (const move of moves) {
    const { x } = move;
    const from = move.from - 1;
    const to = move.to - 1;

    // use splice to remove items [from] and just push them [to]
    const batch = state[from].splice(-x, x);
    state[to].push(...batch);
  }
}

function splitTheStateFromTheMoves(input: string): [string[][], Move[]] {
  const [stateInput, movesInput] = input.split('\n\n');
  assert.ok(stateInput);
  assert.ok(movesInput);

  return [convertStateInputToArray(stateInput), convertMovesInputToArray(movesInput)];
}

function convertStateInputToArray(stateInput: string): string[][] {
  const rows = stateInput.split('\n');
  // remove the last line, as it only contains the index numbers
  const lastRow = rows.pop();

  const state: string[][] = Array(Math.ceil(lastRow!.length / 4))
    .fill('')
    .map(() => []);
  const positionMatcher = /(.{3,3}) ?/g;

  for (let row of rows) {
    const matches = row.match(positionMatcher);
    assert.ok(matches);
    matches.forEach((match, i) => {
      const letter = match[1];
      if (letter && letter !== ' ') {
        if (!state[i]) {
          state[i] = [];
        }

        state[i].unshift(letter);
      }
    });
  }

  return state;
}

function convertMovesInputToArray(movesInput: string): Move[] {
  const regex = /move (\d+) from (\d+) to (\d+)/;
  const moves = movesInput.split('\n').map((m) => {
    const matches = m.match(regex);
    assert.ok(matches);

    const move: Move = {
      x: parseInt(matches[1], 10),
      from: parseInt(matches[2], 10),
      to: parseInt(matches[3], 10),
    };

    return move;
  });

  return moves;
}

function readInputFile(): Promise<string> {
  const inputPath = __dirname + '/input.txt';

  return new Promise<string>((resolve, reject) => {
    fs.readFile(inputPath, 'utf8', (err, data) => {
      if (err) {
        reject(err);
        return;
      }

      resolve(data);
    });
  });
}

////////////////////////////////////////////////////////////////////////////////////////////////

app();
