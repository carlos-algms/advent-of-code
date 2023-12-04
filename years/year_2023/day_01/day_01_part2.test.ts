import { fileReader } from '../shared/fileReader';
import { day01Part2 } from './day_01_part2';

describe('Day 1 - Part 2', () => {
  it('test input', async () => {
    const testInput = await fileReader(__dirname + '/day_01_input_2_test.txt');
    const expectedSum = 281;

    const { calibrationNumbers, sum } = day01Part2(testInput);

    expect(calibrationNumbers).toEqual([
      29, //
      83,
      13,
      24,
      42,
      14,
      76,
    ]);

    expect(sum).toEqual(expectedSum);
  });

  it('manual input', async () => {
    const input = [
      'fivezg8mjf6hrxnhgxxttwoneg', //
      'slhdsxngfxszspppxxfftmxlptzhtwovp1',
      'fone2two',
    ];

    const { calibrationNumbers } = day01Part2(input);
    expect(calibrationNumbers).toEqual([
      51, //
      21,
      12,
    ]);
  });

  it('Real Input', async () => {
    const input = await fileReader(__dirname + '/day_01_input.txt');
    const expectedSum = 54277;

    const { sum, calibrationNumbers } = day01Part2(input);

    expect(calibrationNumbers).toHaveLength(1000);
    expect(sum).toEqual(expectedSum);
  });
});
