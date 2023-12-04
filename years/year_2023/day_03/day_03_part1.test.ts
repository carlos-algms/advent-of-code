import { fileReader } from '../shared/fileReader';

import { day03Part1 } from './day_03_part1';

describe('Day 3 - Part 1', () => {
  it('Test input', async () => {
    const input = await fileReader(__dirname + '/day_03_input_1_test.txt');

    const { sum, numbers } = day03Part1(input);

    const expectedSum = 4361;
    const expectedNumbers = [467, 35, 633, 617, 592, 664, 755, 598];

    expect(sum).toEqual(expectedSum);
    expect(numbers).toEqual(expectedNumbers);
  });

  it('Input', async () => {
    const input = await fileReader(__dirname + '/day_03_input.txt');

    const { sum } = day03Part1(input);

    const expectedSum = 532428;

    expect(sum).toEqual(expectedSum);
  });
});
