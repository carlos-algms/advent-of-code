import { fileReader } from '../shared/fileReader';

import { day06Part1 } from './day_06_part1';

describe('Day 6 - Part 1', () => {
  it('Test input', async () => {
    const input = await fileReader(__dirname + '/day_06_input_1_test.txt');

    const response = day06Part1(input);
  });

  it('Input', async () => {
    const input = await fileReader(__dirname + '/day_06_input.txt');

    const response = day06Part1(input);
  });
});
