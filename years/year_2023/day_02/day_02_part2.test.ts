import { fileReader } from '../shared/fileReader';
import { day02Part2 } from './day_02_part2';

describe('Day 2 - Part 2', () => {
  it('Test input', async () => {
    const input = await fileReader(__dirname + '/day_02_input_1_test.txt');

    const { sum, sums } = day02Part2(input);

    const expectedSum = 2286;
    const expectedSums = [48, 12, 1560, 630, 36];

    expect(sums).toEqual(expectedSums);
    expect(sum).toEqual(expectedSum);
  });

  it('Input', async () => {
    const input = await fileReader(__dirname + '/day_02_input.txt');

    const { sum } = day02Part2(input);

    const expectedSum = 70387;
    expect(sum).toEqual(expectedSum);
  });
});
