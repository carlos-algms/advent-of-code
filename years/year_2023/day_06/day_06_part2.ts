export function day06Part2([timeLine, distanceLine]: string[]) {
  const time = Number(timeLine.replace('Time: ', '').replace(/\s+/g, ''));
  const distance = Number(distanceLine.replace('Distance: ', '').replace(/\s+/g, ''));

  let possibilityOfWining = 0;

  for (let t = 1; t <= time; t++) {
    const traveledDistance = t * (time - t);

    if (traveledDistance > distance) {
      possibilityOfWining++;
    }
  }

  return {
    time,
    distance,
    possibilityOfWining,
  };
}
