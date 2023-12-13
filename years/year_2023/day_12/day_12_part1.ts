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
  const result = lines.reduce((total, lineContent, i) => {
    const [line, sequenceStr] = lineContent.split(' ');
    const sequence = sequenceStr.split(',').map(Number);

    let lineSum = countArrangements(line, sequence);

    return total + lineSum;
  }, 0);

  return result;
}

export function countArrangements(line: string, sameInSequence: number[]): number {
  if (!line) {
    return sameInSequence.length === 0 ? 1 : 0;
  }

  if (sameInSequence.length === 0) {
    return line.includes('#') ? 0 : 1;
  }

  let result = 0;

  if ('.?'.includes(line[0])) {
    result += countArrangements(line.slice(1), sameInSequence);
  }

  if ('#?'.includes(line[0])) {
    if (
      // TODO the slices here might be wrong
      sameInSequence[0] <= line.length &&
      !line.slice(0, sameInSequence[0]).includes('.') &&
      (sameInSequence[0] === line.length || line[sameInSequence[0]] !== '#')
    ) {
      result += countArrangements(line.slice(sameInSequence[0] + 1), sameInSequence.slice(1));
    } else {
      result += 0;
    }
  }

  return result;
}
