import { fileReader } from '../shared/fileReader';

import { day05Part1 } from './day_05_part1';

describe('Day 5 - Part 1', () => {
  it('Test input', async () => {
    const input = await fileReader(__dirname + '/day_05_input_1_test.txt');

    const response = day05Part1(input);
  });

  it('Input', async () => {
    const input = await fileReader(__dirname + '/day_05_input.txt');

    const response = day05Part1(input);
  });
});
