import { fileReader } from '../shared/fileReader';

import { day06Part1 } from './day_06_part1';

describe('Day 6 - Part 1', () => {
  it('Test input', async () => {
    const input = await fileReader(__dirname + '/day_06_input_1_test.txt');

    const response = day06Part1(input);

    expect(response.times).toEqual([7, 15, 30]);
    expect(response.distances).toEqual([9, 40, 200]);
    expect(response.possibilityOfWining).toEqual([4, 8, 9]);
    expect(response.result).toEqual(288);
  });

  it('Input', async () => {
    const input = await fileReader(__dirname + '/day_06_input.txt');

    const response = day06Part1(input);
    expect(response.result).toEqual(140220);
  });
});
