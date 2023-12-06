export function day06Part1([timeLine, distanceLine]: string[]) {
  const [, ...times] = timeLine.split(/\s+/g).map(Number);
  const [, ...distances] = distanceLine.split(/\s+/g).map(Number);

  let result: null | number = null;
  const possibilityOfWining: number[] = [];

  for (let i = 0; i < times.length; i++) {
    const time = times[i];
    const distance = distances[i];

    let winCount = 0;

    for (let t = 1; t <= time; t++) {
      const traveledDistance = t * (time - t);

      if (traveledDistance > distance) {
        winCount++;
      }
    }

    possibilityOfWining.push(winCount);
    result = result === null ? winCount : result * winCount;
  }

  return {
    times,
    distances,
    result,
    possibilityOfWining,
  };
}
