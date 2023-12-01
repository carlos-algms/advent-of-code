export function day01Part1(input: string[]) {
  const calibrationNumbers = input.map((line) => {
    const numbers = line.replace(/[a-z]*/gi, '');
    const first = numbers[0];
    const last = numbers[numbers.length - 1] ?? first;
    return parseInt(`${first}${last}`);
  });

  return {
    calibrationNumbers,
    sum: calibrationNumbers.reduce((acc, curr) => acc + curr, 0),
  };
}
