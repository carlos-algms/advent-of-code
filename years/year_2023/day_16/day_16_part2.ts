const enum Direction {
  Up = 'U',
  Down = 'D',
  Left = 'L',
  Right = 'R',
}

type Grid = string[][];

/**
 *
 */
export default function day16Part2(input: string): number {
  const grid = input.split('\n').map((line) => line.split(''));

  let max = -Infinity;
  const maxLines = grid.length - 1;
  const maxColumns = grid[0].length - 1;

  for (let line = 0; line <= maxLines; line++) {
    const fromLeft = countMoves(line, 0, Direction.Right, grid);
    const fromRight = countMoves(line, maxColumns, Direction.Left, grid);
    max = Math.max(max, fromLeft, fromRight);
  }

  for (let column = 0; column <= maxColumns; column++) {
    const fromTop = countMoves(0, column, Direction.Down, grid);
    const fromBottom = countMoves(maxLines, column, Direction.Up, grid);
    max = Math.max(max, fromTop, fromBottom);
  }

  return max;
}

function countMoves(l: number, c: number, d: Direction, grid: Grid): number {
  const energized = new Set<string>();
  const directionCache = new Set<string>();

  move(l, c, d, grid, energized, directionCache);
  return energized.size;
}

function move(
  line: number,
  column: number,
  direction: Direction,
  grid: Grid,
  coordCounter: Set<string>,
  directionCache: Set<string>,
) {
  const current = grid[line]?.[column];
  if (!current) {
    return;
  }

  const key = `${line},${column},${direction}`;

  if (directionCache.has(key)) {
    return;
  }

  directionCache.add(key);
  coordCounter.add(`${line},${column}`);

  switch (direction) {
    case Direction.Up:
      if ('.|'.includes(current)) {
        move(line - 1, column, Direction.Up, grid, coordCounter, directionCache);
      } else if ('/' === current) {
        move(line, column + 1, Direction.Right, grid, coordCounter, directionCache);
      } else if ('\\' === current) {
        move(line, column - 1, Direction.Left, grid, coordCounter, directionCache);
      } else if ('-' === current) {
        move(line, column - 1, Direction.Left, grid, coordCounter, directionCache);
        move(line, column + 1, Direction.Right, grid, coordCounter, directionCache);
      }
      break;
    case Direction.Down:
      if ('.|'.includes(current)) {
        move(line + 1, column, Direction.Down, grid, coordCounter, directionCache);
      } else if ('/' === current) {
        move(line, column - 1, Direction.Left, grid, coordCounter, directionCache);
      } else if ('\\' === current) {
        move(line, column + 1, Direction.Right, grid, coordCounter, directionCache);
      } else if ('-' === current) {
        move(line, column - 1, Direction.Left, grid, coordCounter, directionCache);
        move(line, column + 1, Direction.Right, grid, coordCounter, directionCache);
      }
      break;
    case Direction.Left:
      if ('.-'.includes(current)) {
        move(line, column - 1, Direction.Left, grid, coordCounter, directionCache);
      } else if ('/' === current) {
        move(line + 1, column, Direction.Down, grid, coordCounter, directionCache);
      } else if ('\\' === current) {
        move(line - 1, column, Direction.Up, grid, coordCounter, directionCache);
      } else if ('|' === current) {
        move(line - 1, column, Direction.Up, grid, coordCounter, directionCache);
        move(line + 1, column, Direction.Down, grid, coordCounter, directionCache);
      }
      break;
    case Direction.Right:
      if ('.-'.includes(current)) {
        move(line, column + 1, Direction.Right, grid, coordCounter, directionCache);
      } else if ('/' === current) {
        move(line - 1, column, Direction.Up, grid, coordCounter, directionCache);
      } else if ('\\' === current) {
        move(line + 1, column, Direction.Down, grid, coordCounter, directionCache);
      } else if ('|' === current) {
        move(line - 1, column, Direction.Up, grid, coordCounter, directionCache);
        move(line + 1, column, Direction.Down, grid, coordCounter, directionCache);
      }
      break;
  }
}
