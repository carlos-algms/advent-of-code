const Directions: Record<string, [number, number]> = {
  U: [-1, 0],
  D: [1, 0],
  L: [0, -1],
  R: [0, 1],
} as const;

/**
 *
 */
export default function day18Part2(input: string): number {
  let result = 0;

  const points: [number, number][] = [[0, 0]];
  let boundaryPoints = 0;

  input.split('\n').map((line) => {
    const [direction, steps] = line.split(' ');
    const [dr, dc] = Directions[direction];
    const n = Number(steps);
    boundaryPoints += n;
    const [r, c] = points.at(-1)!;
    points.push([r + dr * n, c + dc * n]);
  });

  const shoeLaceSum = points.reduce((acc, point, i) => {
    const [, pc] = points.at(i - 1)!;
    const [r] = point;
    const [, nc] = points[i + 1] || points[0];
    const sum = r * (pc - nc);
    return acc + sum;
  }, 0);

  const area = Math.abs(shoeLaceSum) / 2;
  const interior = area - boundaryPoints / 2 + 1;
  result = interior + boundaryPoints;

  console.log({
    area,
    interior,
    boundaryPoints,
    shoeLaceSum,
    result,
  });

  return result;
}
