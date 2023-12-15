const matcher = /^(?<label>[^=\-]+)(?<operation>[=\-])(?<value>\d*)/i;

const Add = '=';

type Box = Record<string, number>;
type Boxes = Record<number, Box>;

export default function day15Part2(input: string): number {
  const steps = input.split(',');
  const boxes: Boxes = {};

  steps.forEach((step) => {
    const match = matcher.exec(step);
    const { label, operation, value } = match?.groups ?? {};
    const boxIndex = sumChars(label);

    const box = boxes[boxIndex] || (boxes[boxIndex] = {});

    if (operation === Add) {
      box[label] = parseInt(value, 10);
    } else {
      delete box[label];
    }
  }, 0);

  const sum = Object.entries(boxes).reduce((acc, [key, lenses]) => {
    const i = parseInt(key, 10) + 1;
    const power = Object.values(lenses).reduce((acc, lens, x) => acc + i * (x + 1) * lens, 0);
    return acc + power;
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
