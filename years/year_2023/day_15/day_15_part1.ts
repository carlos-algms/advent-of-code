/**
 *
 */
export default function day15Part1(input: string): number {
  const memo = new Map<string, number>();
  const steps = input.split(',');

  const sum = steps.reduce((acc, step) => {
    if (memo.has(step)) {
      return memo.get(step)! + acc;
    }

    const sum = sumChars(step);
    memo.set(step, sum);
    return acc + sum;
  }, 0);

  return sum;
}

function sumChars(chars: string): number {
  let sum = 0;

  for (let i = 0; i < chars.length; i++) {
    sum += chars.charCodeAt(i);
    sum *= 17;
    sum %= 256;
  }

  return sum;
}
