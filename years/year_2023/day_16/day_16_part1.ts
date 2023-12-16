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
export default function day16Part1(input: string): number {
  /** Holds the coord line,row of the lines with beans passing */
  const energized = new Set<string>();
  const directionCache = new Set<string>();

  const grid = input.split('\n').map((line) => line.split(''));
  move(0, 0, Direction.Right, grid, energized, directionCache);

  return energized.size;
}

// TODO make it async and each direction can flow in parallel
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
