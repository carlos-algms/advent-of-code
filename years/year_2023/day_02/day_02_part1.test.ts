import { fileReader } from '../shared/fileReader';

import { BagContent, day02Part1 } from './day_02_part1';

const load: BagContent = {
  red: 12,
  green: 13,
  blue: 14,
};

describe('Day 2 - Part 1', () => {
  it('Test input', async () => {
    const input = await fileReader(__dirname + '/day_02_input_1_test.txt');

    const { sum, ids } = day02Part1(input, load);

    const expectedSum = 8;
    const expectedIds = ['1', '2', '5'];

    expect(sum).toEqual(expectedSum);
    expect(ids).toEqual(expectedIds);
  });

  it('Input', async () => {
    const input = await fileReader(__dirname + '/day_02_input.txt');

    const { sum } = day02Part1(input, load);

    const expectedSum = 1734;

    expect(sum).toEqual(expectedSum);
  });
});
