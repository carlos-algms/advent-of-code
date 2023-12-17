/**
 * Starting from top left corner of a 2D array, move to the bottom right corner.
 * Find the smallest sum of a path without moving 3 consecutive times in the same direction,
 * without counting the first value and without moving diagonally.
 */
export default function day17Part1(input: string): number {
  const originalGrid = input.split('\n').map((line) => line.split('').map(Number));

  const seenSet = new Set<string>();
  const queue = new PriorityQueue<Path>();
  queue.push(new Path(originalGrid));

  while (queue.length > 0) {
    const path = queue.pop()!;
    const { l, c, grid, direction, sameDirectionCount, sum } = path;

    if (path.isBottomRightBlock()) {
      return sum;
    }

    const seemKey = `${l}-${c}-${direction}-${sameDirectionCount}`;
    if (seenSet.has(seemKey)) {
      continue;
    }

    seenSet.add(seemKey);

    if (sameDirectionCount < 3 && direction !== Direction.Start) {
      const nextPath = new Path(grid, path);
      if (!nextPath.isOutOfBounds()) {
        nextPath.sum += path.sum + grid[nextPath.l][nextPath.c];
        queue.push(nextPath);
      }
    }

    for (const nextDirection of possibleSteps) {
      if (nextDirection !== direction && !path.isReverseDirection(nextDirection)) {
        const nextPath = new Path(grid, path, nextDirection);
        if (!nextPath.isOutOfBounds()) {
          nextPath.sum += path.sum + grid[nextPath.l][nextPath.c];
          queue.push(nextPath);
        }
      }
    }
  }

  throw new Error('Couldn’t find a path');
}

const enum Direction {
  Up = 'Up',
  Down = 'Down',
  Left = 'Left',
  Right = 'Right',
  Start = 'Start',
}

const possibleSteps = [Direction.Up, Direction.Right, Direction.Down, Direction.Left];

class Path {
  sum = 0;
  stepsCount = 0;

  direction: Direction = Direction.Start;
  /** No more than 3, after that we MUST change the direction */
  sameDirectionCount = 0;

  l = 0;
  c = 0;

  constructor(public readonly grid: number[][], previous?: Path, newDirection?: Direction) {
    if (previous) {
      this.stepsCount = previous.stepsCount + 1;
      this.direction = newDirection ?? previous.direction;
      this.sameDirectionCount = newDirection ? 1 : previous.sameDirectionCount + 1;

      if (this.direction === Direction.Up) {
        this.l = previous.l - 1;
        this.c = previous.c;
      } else if (this.direction === Direction.Down) {
        this.l = previous.l + 1;
        this.c = previous.c;
      } else if (this.direction === Direction.Left) {
        this.l = previous.l;
        this.c = previous.c - 1;
      } else if (this.direction === Direction.Right) {
        this.l = previous.l;
        this.c = previous.c + 1;
      }
    }
  }

  isBottomRightBlock(): boolean {
    const { l, c, grid } = this;
    return l === grid.length - 1 && c === grid[0].length - 1;
  }

  isOutOfBounds(): boolean {
    const { l, c, grid } = this;
    return l < 0 || l >= grid.length || c < 0 || c >= grid[0].length;
  }

  isReverseDirection(to: Direction): boolean {
    const { direction } = this;
    return (
      (direction === Direction.Up && to === Direction.Down) ||
      (direction === Direction.Down && to === Direction.Up) ||
      (direction === Direction.Left && to === Direction.Right) ||
      (direction === Direction.Right && to === Direction.Left)
    );
  }
}

class PriorityQueue<T extends { sum: number }> {
  private queue: T[] = [];

  push(item: T) {
    this.queue.push(item);
    this.queue.sort((a, b) => a.sum - b.sum);
  }

  pop(): T | undefined {
    return this.queue.shift();
  }

  get length(): number {
    return this.queue.length;
  }
}
