export default function day09Part1(lines: string[]) {
  let result = 0;

  for (const line of lines) {
    const numbers = line.split(' ').map(Number);
    const stack = calculateDiffs(numbers);

    result = stack.reduceRight((sum, currentTuple, i, stack) => {
      const nextTuple = stack[i - 1];
      const currentLast = currentTuple[currentTuple.length - 1];

      if (nextTuple === undefined) {
        return sum + currentLast;
      }

      const nextLast = nextTuple[nextTuple.length - 1];
      const next = nextLast + currentLast;
      nextTuple.push(next);

      return sum;
    }, result);
  }

  return result;
}

function calculateDiffs(numbers: number[], stack: number[][] = [numbers]): number[][] {
  const diffs: number[] = [];
  let isAllZeros = true;

  for (let x = 0; x < numbers.length - 1; x++) {
    const diff = numbers[x + 1] - numbers[x];
    diffs.push(diff);
    if (diff !== 0) {
      isAllZeros = false;
    }
  }

  stack.push(diffs);

  if (!isAllZeros) {
    return calculateDiffs(diffs, stack);
  }

  diffs.push(0);
  return stack;
}
