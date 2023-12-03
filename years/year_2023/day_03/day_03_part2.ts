export function day03Part1(lines: string[]) {
  const capturedCoords: Record<number, number[]> = {};

  function wasCaptured(l: number, c: number) {
    if (!capturedCoords[l]) {
      capturedCoords[l] = [];
      return false;
    }

    return capturedCoords[l].includes(c);
  }

  function addCaptured(l: number, c: number) {
    if (!capturedCoords[l]) {
      capturedCoords[l] = [];
    }

    capturedCoords[l].push(c);
  }

  function getAdjacentNumbers(lineN: number, colN: number): number[] {
    const numbers: number[] = [];

    for (let l = lineN - 1, to = lineN + 1; l <= to; l++) {
      const line = lines[l];

      if (!line) {
        continue;
      }

      const left = getNumber(line, l, colN - 1);
      if (left) {
        numbers.push(left);
      }

      const middle = getNumber(line, l, colN);
      if (middle) {
        numbers.push(middle);
      }
      const right = getNumber(line, l, colN + 1);
      if (right) {
        numbers.push(right);
      }
    }

    return numbers;
  }

  function getNumber(line: string, lineN: number, colN: number): number | null {
    let numberStr = '';

    const char = line[colN];
    if (isDigit(char) && !wasCaptured(lineN, colN)) {
      numberStr = char;
      addCaptured(lineN, colN);

      for (let c = colN - 1; c >= 0; c--) {
        const char = line[c];

        if (!char || wasCaptured(lineN, c)) {
          continue;
        }

        if (isDigit(char)) {
          numberStr = char + numberStr;
          addCaptured(lineN, c);
        } else {
          break;
        }
      }

      for (let c = colN + 1; c < line.length; c++) {
        const char = line[c];

        if (!char || wasCaptured(lineN, c)) {
          continue;
        }

        if (isDigit(char)) {
          numberStr += char;
          addCaptured(lineN, c);
        } else {
          break;
        }
      }
    }

    if (numberStr) {
      return parseInt(numberStr);
    }

    return null;
  }

  const response = {
    sum: 0,
    numbers: [] as number[],
  };

  for (let l = 0; l < lines.length; l++) {
    const line = lines[l];

    for (let c = 0; c < line.length; c++) {
      const char = line[c];

      if (isSymbol(char)) {
        const numbers = getAdjacentNumbers(l, c);
        if (numbers.length) {
          response.numbers.push(...numbers);
        }
      }
    }
  }

  response.sum = response.numbers.reduce((acc, n) => acc + n, 0);

  return response;
}

const symbolRegex = /[^\d\.]/i;
function isSymbol(char: string) {
  return symbolRegex.test(char);
}

const digitRegex = /\d/i;
function isDigit(char: string) {
  return digitRegex.test(char);
}
