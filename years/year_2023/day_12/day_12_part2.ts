/**
  * Unfold every line 5 times and count the number of arrangements
  - `???.### 1,1,3` - `1` arrangement
  - `.??..??...?##. 1,1,3` - `16384` arrangements
  - `?#?#?#?#?#?#?#? 1,3,1,6` - `1` arrangement
  - `????.#...#... 4,1,1` - `16` arrangements
  - `????.######..#####. 1,6,5` - `2500` arrangements
  - `?###???????? 3,2,1` - `506250` arrangements
 */
export default function day12Part2(lines: readonly string[]): number {
  const result = lines.reduce((total, lineContent, i) => {
    const memo = new Map<string, number>();
    const [originalLine, sequenceStr] = lineContent.split(' ');
    const sequence = new Array(5).fill(sequenceStr).join(',').split(',').map(Number);
    const line = new Array(5).fill(originalLine).join('?');
    let lineSum = countArrangements(line, sequence, memo);

    return total + lineSum;
  }, 0);

  return result;
}

export function countArrangements(
  line: string,
  sameInSequence: number[],
  memo: Map<string, number>,
): number {
  if (!line) {
    return sameInSequence.length === 0 ? 1 : 0;
  }

  if (sameInSequence.length === 0) {
    return line.includes('#') ? 0 : 1;
  }

  const key = `${line}-${sameInSequence.join(',')}`;

  let result = memo.get(key);

  if (result !== undefined) {
    return result;
  }

  result = 0;

  if ('.?'.includes(line[0])) {
    result += countArrangements(line.slice(1), sameInSequence, memo);
  }

  if ('#?'.includes(line[0])) {
    if (
      // TODO the slices here might be wrong
      sameInSequence[0] <= line.length &&
      !line.slice(0, sameInSequence[0]).includes('.') &&
      (sameInSequence[0] === line.length || line[sameInSequence[0]] !== '#')
    ) {
      result += countArrangements(line.slice(sameInSequence[0] + 1), sameInSequence.slice(1), memo);
    } else {
      result += 0;
    }
  }

  memo.set(key, result);
  return result;
}
