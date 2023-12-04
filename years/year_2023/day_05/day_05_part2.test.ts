import { fileReader } from '../shared/fileReader';

import { day05Part2 } from './day_05_part2';

describe('Day 5 - Part 2', () => {
  it('Test input', async () => {
    const input = await fileReader(__dirname + '/day_05_input_1_test.txt');

    const response = day05Part2(input);
  });

  it('Input', async () => {
    const input = await fileReader(__dirname + '/day_05_input.txt');

    const response = day05Part2(input);
  });
});
