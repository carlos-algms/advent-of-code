import { fileReader } from '../shared/fileReader';

import { day01Part1 } from './day_01_part1';

describe('Day 1 part 1', () => {
  it('Test input', async () => {
    const testInput = await fileReader(__dirname + '/day_01_input_1_test.txt');
    const expectedSum = 142;

    const { calibrationNumbers, sum } = day01Part1(testInput);

    expect(sum).toEqual(expectedSum);
    expect(calibrationNumbers).toEqual([12, 38, 15, 77]);
  });

  it('Real Input', async () => {
    const input = await fileReader(__dirname + '/day_01_input.txt');
    const expectedSum = 54390;

    const { sum } = day01Part1(input);

    expect(sum).toEqual(expectedSum);
  });
});
