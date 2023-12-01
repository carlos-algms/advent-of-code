const numbersSpelled = Object.entries({
  one: 1,
  two: 2,
  three: 3,
  four: 4,
  five: 5,
  six: 6,
  seven: 7,
  eight: 8,
  nine: 9,
});

export function day01Part2(input: string[]) {
  const calibrationNumbers = input.map((line, lineX) => {
    const digits: number[] = [];

    for (let i = 0; i < line.length; i++) {
      const chars = line.substring(i);
      const char = chars[0];

      if (char.match(/[0-9]/)) {
        digits.push(parseInt(char));
        continue;
      }

      for (const [numberSpelled, number] of numbersSpelled) {
        if (chars.startsWith(numberSpelled)) {
          digits.push(number);
          break;
        }
      }
    }

    const first = digits[0];
    const last = digits[digits.length - 1] ?? first;
    const number = parseInt(`${first}${last}`);

    return number;
  });

  return {
    calibrationNumbers,
    sum: calibrationNumbers.reduce((acc, curr) => acc + curr, 0),
  };
}
