import { fileReader } from '../shared/fileReader';

import { day06Part2 } from './day_06_part2';

describe('Day 6 - Part 1', () => {
  it('Test input', async () => {
    const input = await fileReader(__dirname + '/day_06_input_1_test.txt');

    const response = day06Part2(input);

    expect(response.time).toEqual(71530);
    expect(response.distance).toEqual(940200);
    expect(response.possibilityOfWining).toEqual(71503);
  });

  it('Input', async () => {
    const input = await fileReader(__dirname + '/day_06_input.txt');

    const response = day06Part2(input);
    expect(response.possibilityOfWining).toEqual(0);
  });
});
