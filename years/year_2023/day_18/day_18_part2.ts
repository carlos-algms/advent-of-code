const Directions: Record<string, [number, number]> = {
  3: [-1, 0],
  1: [1, 0],
  2: [0, -1],
  0: [0, 1],
} as const;

/**
 *
 */
export default function day18Part2(input: string): number {
  let result = 0;

  const points: [number, number][] = [[0, 0]];
  let boundaryPoints = 0;

  input.split('\n').map((line) => {
    const [, fullHex] = line.split('#');
    const direction = fullHex[5];
    const hex = fullHex.slice(0, 5);
    const steps = parseInt(hex, 16);

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

  return result;
}
