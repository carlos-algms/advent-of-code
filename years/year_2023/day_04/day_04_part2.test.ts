import { fileReader } from '../shared/fileReader';

import { day04Part2 } from './day_04_part2';

describe('Day 4 - Part 2', () => {
  it('Test input', async () => {
    const input = await fileReader(__dirname + '/day_04_input_1_test.txt');

    const response = day04Part2(input);
    const expectedResponse = 30;
    expect(response).toEqual(expectedResponse);
  });

  it('Input', async () => {
    const input = await fileReader(__dirname + '/day_04_input.txt');

    const response = day04Part2(input);
    const expectedResponse = 8805731;

    expect(response).toEqual(expectedResponse);
  });
});
