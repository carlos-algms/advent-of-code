const Line = 0;
const Column = 1;

type Coords = [line: number, column: number];

export default function day11Part2(lines: readonly string[], expansionSize: number) {
  const itemsCoords = findCoords(lines);
  const expandedCoords = expandCoords(lines, itemsCoords, expansionSize - 1);

  const distances = calculateDistances(expandedCoords);

  const sum = distances.reduce((sum, distance) => sum + distance, 0);

  return {
    sum,
  };
}

function calculateDistances(coords: Coords[]) {
  const distances: number[] = [];

  for (let i = 0; i < coords.length; i++) {
    for (let j = i + 1; j < coords.length; j++) {
      const [x1, y1] = coords[i];
      const [x2, y2] = coords[j];

      const distance = Math.abs(x1 - x2) + Math.abs(y1 - y2);
      distances.push(distance);
    }
  }

  return distances;
}

function findCoords(universe: readonly string[]) {
  return universe.reduce((coords, line, l) => {
    for (let c = 0; c < line.length; c++) {
      if (line[c] === '#') {
        coords.push([l, c]);
      }
    }
    return coords;
  }, [] as Coords[]);
}

function expandCoords(universe: readonly string[], coords: Coords[], by: number): Coords[] {
  for (let l = universe.length - 1; l >= 0; l--) {
    if (!universe[l].includes('#')) {
      for (const coord of coords) {
        if (coord[Line] > l) {
          coord[Line] += by;
        }
      }
    }
  }

  return expandCols(universe, coords, by);
}

function expandCols(universe: readonly string[], coords: Coords[], by: number): Coords[] {
  for (let c = universe[0].length - 1; c >= 0; c--) {
    if (!columnHasItem(universe, c)) {
      for (const coord of coords) {
        if (coord[Column] > c) {
          coord[Column] += by;
        }
      }
    }
  }

  return coords;
}

function columnHasItem(universe: readonly string[], column: number) {
  return universe.some((line) => line[column] === '#');
}
