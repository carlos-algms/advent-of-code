/**
 *
    ???.### 1,1,3             - 1 arrangement
    .??..??...?##. 1,1,3      - 4 arrangements
    ?#?#?#?#?#?#?#? 1,3,1,6   - 1 arrangement
    ????.#...#... 4,1,1       - 1 arrangement
    ????.######..#####. 1,6,5 - 4 arrangements
    ?###???????? 3,2,1        - 10 arrangements

 */
export default function day12Part1(lines: readonly string[]): number {
  const result = lines.reduce((sum, lineContent, i) => {
    const [line, sequence] = lineContent.split(' ');
    const uniqueLinesSet = new Set<string>();
    buildUniqueLines(line.split(''), uniqueLinesSet);

    let lineSum = 0;
    const lineMemo = new Map<string, number>();

    uniqueLinesSet.forEach((uniqueLine) => {
      const cleanLine = removeExtraDots(uniqueLine);
      const uniqueSum = countArrangements(
        cleanLine.split(''),
        sequence.split(',').map(Number),
        lineMemo,
      );
      lineSum += uniqueSum;
    });

    return sum + lineSum;
  }, 0);

  return result;
}

export function countArrangements(
  line: string[],
  sameInSequence: number[],
  memo: Map<string, number>,
) {
  const sequenceLength = sameInSequence.length;
  const maxPositionToMatch = line.length - sequenceLength;
  let sum = 0;

  for (let x1 = 0; x1 <= maxPositionToMatch; x1++) {
    let s = 0;
    let wantedChar = '#';
    let sequence = '';
    let fullSequence = '';

    for (let x2 = x1; x2 < line.length; x2++) {
      const char = line[x2];

      if (char !== wantedChar) {
        break;
      }

      fullSequence += char;

      if (char === '.') {
        wantedChar = '#';
        continue;
      }

      sequence += char;

      if (sequence.length === sameInSequence[s]) {
        s++;
        wantedChar = '.';
        sequence = '';
      }

      if (s === sequenceLength) {
        sum++;
        break;
      }
    }

    fullSequence;
  }

  return sum;
}

export function removeExtraDots(line: string) {
  return line.replace(/^\.+|\.+$/g, '').replace(/\.{2,}/g, '.');
}

const Joker = '?';
const PossibleChars = ['#', '.'];

function buildUniqueLines(line: string[], uniques: Set<string>) {
  for (let c = 0; c < line.length; c++) {
    const char = line[c];

    if (char === Joker) {
      for (const possibleChar of PossibleChars) {
        const newLine = [...line];
        newLine[c] = possibleChar;
        if (!newLine.includes(Joker)) {
          uniques.add(newLine.join(''));
        } else {
          buildUniqueLines(newLine, uniques);
        }
      }
    }
  }
}
