import assert from 'assert';

type CompassItem = Partial<{
  toLeft: boolean;
  toRight: boolean;
  toTop: boolean;
  toBottom: boolean;
  fromLeft: boolean;
  fromRight: boolean;
  fromTop: boolean;
  fromBottom: boolean;
}> & { key: string };

type Coord = {
  x: number;
  y: number;
};

const Compass: Record<string, CompassItem> = {
  '|': { key: '|', toTop: true, toBottom: true, fromBottom: true, fromTop: true },
  '-': { key: '-', toLeft: true, toRight: true, fromLeft: true, fromRight: true },
  L: { key: 'L', toRight: true, toTop: true, fromRight: true, fromTop: true },
  J: { key: 'J', toLeft: true, toTop: true, fromLeft: true, fromTop: true },
  7: { key: '7', toLeft: true, toBottom: true, fromLeft: true, fromBottom: true },
  F: { key: 'F', toRight: true, toBottom: true, fromRight: true, fromBottom: true },
  S: {
    key: 'S',
    toRight: true,
    toLeft: true,
    toBottom: true,
    toTop: true,
    fromRight: true,
    fromLeft: true,
    fromBottom: true,
    fromTop: true,
  },
};

export default function day10Part1(lines: string[]) {
  const [startLine, startColumn] = findStartCoords(lines);

  let steps = 0;

  let cords: Coord = {
    x: startColumn,
    y: startLine,
  };
  let cross = Compass[lines[cords.y][cords.x]];
  const seen = new Set<string>();

  do {
    steps++;
    seen.add(`${cords.y},${cords.x}`);

    const line = lines[cords.y];

    if (cross.toRight) {
      const targetCoord: Coord = {
        x: cords.x + 1,
        y: cords.y,
      };
      const targetCross = Compass[line[targetCoord.x]];

      if (targetCross?.fromLeft) {
        cords = targetCoord;
        cross = {
          ...targetCross,
          toLeft: false,
        };
        continue;
      }
    }

    if (cross.toLeft) {
      const targetCoord: Coord = {
        x: cords.x - 1,
        y: cords.y,
      };
      const targetCross = Compass[line[targetCoord.x]];

      if (targetCross?.fromRight) {
        cords = targetCoord;
        cross = {
          ...targetCross,
          toRight: false,
        };
        continue;
      }
    }

    if (cross.toTop) {
      const targetCoord: Coord = {
        x: cords.x,
        y: cords.y - 1,
      };
      const targetCross = Compass[lines[targetCoord.y][targetCoord.x]];

      if (targetCross?.fromBottom) {
        cords = targetCoord;
        cross = {
          ...targetCross,
          toBottom: false,
        };
        continue;
      }
    }

    if (cross.toBottom) {
      const targetCoord: Coord = {
        x: cords.x,
        y: cords.y + 1,
      };
      const targetCross = Compass[lines[targetCoord.y][targetCoord.x]];

      if (targetCross?.fromTop) {
        cords = targetCoord;
        cross = {
          ...targetCross,
          toTop: false,
        };
        continue;
      }
    }

    throw new Error(`No path found at: ${JSON.stringify(cords, null, 2)}}`);
  } while (startLine !== cords.y || startColumn !== cords.x);

  // clean the grid;

  const grid = lines.map((line, i) => {
    const chars = line.split('');
    for (let c = 0; c < chars.length; c++) {
      if (seen.has(`${i},${c}`)) {
        continue;
      }
      chars[c] = '.';
    }

    return chars.join('');
  });

  console.log(grid.map((line, i) => `${line}    ${lines[i]}`).join('\n'));

  let outside = new Set<string>();

  for (let l = 0; l < grid.length; l++) {
    const line = grid[l];
    let isUp = false;
    let isWithin = false;

    for (let c = 0; c < line.length; c++) {
      const char = line[c];

      if ('.S'.includes(char)) {
        continue;
      }

      if (char === '|') {
        assert.equal(isUp, false);
        isWithin = !isWithin;
      } else if ('LF'.includes(char)) {
        assert.equal(isUp, false);
        isUp = char === 'L';
      } else if ('7J'.includes(char)) {
        const compare = isUp ? 'J' : '7';
        if (char !== compare) {
          isWithin = !isWithin;
        }
        isUp = false;
      } else if ('-'.includes(char)) {
        // do nothing
      } else {
        throw new Error(`Unknown char: ${char}`);
      }

      if (!isWithin) {
        outside.add(`${l},${c}`);
      }
    }
  }

  for (let l = 0; l < grid.length; l++) {
    const line = grid[l];
    console.log(
      line
        .split('')
        .map((char, i) => (outside.has(`${i},${l}`) ? '#' : '.'))
        .join(''),
    );
  }
  console.log('');

  let result = grid.length * grid[0].length - (seen.size + outside.size);

  return result;
}

function findStartCoords(lines: string[]) {
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const start = line.indexOf('S');
    if (start !== -1) {
      return [i, start];
    }
  }

  throw new Error('Start not found');
}

function intersection(a: string[], b: string[]) {
  return a.filter((c) => b.includes(c));
}
