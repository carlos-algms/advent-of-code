import { fileReader } from '../shared/fileReader';

import { day08Part1 } from './day_08_part1';

const day = '08';

describe(`Day ${day} - Part 1`, () => {
  it('Test input', async () => {
    const input = await fileReader(__dirname + `/day_${day}_input_1_test.txt`);

    const response = day08Part1(input);

    expect(response).toBe(2);
  });

  it('Test input', async () => {
    const input = await fileReader(__dirname + `/day_${day}_input_2_test.txt`);

    const response = day08Part1(input);

    expect(response).toBe(6);
  });

  it.skip('Real input', async () => {
    const input = await fileReader(__dirname + `/day_${day}_input.txt`);

    const response = day08Part1(input);
    expect(response).toBe(0);
  });
});
