import { fileReader } from '../shared/fileReader';

import { day04Part1 } from './day_04_part1';

describe('Day 4 - Part 1', () => {
  it('Test input', async () => {
    const input = await fileReader(__dirname + '/day_04_input_1_test.txt');

    const response = day04Part1(input);

    const expectedSum = 13;
    const expectedMatches = [
      ['83', '86', '17', '48'], //
      ['61', '32'],
      ['21', '1'],
      ['84'],
    ];

    expect(response.sum).toEqual(expectedSum);
    expect(response.matches).toEqual(expectedMatches);
  });

  it('Input', async () => {
    const input = await fileReader(__dirname + '/day_04_input.txt');

    const response = day04Part1(input);
    const expectedSum = 25571;

    // pass1 was too hig
    const pass1 = 25708;
    expect(response.sum).toBeLessThan(pass1);

    expect(response.sum).toEqual(expectedSum);
  });
});
