import { fileReader } from '../shared/fileReader';

import { day08Part2 } from './day_08_part2';

const day = '08';

describe(`Day ${day} - Part 2`, () => {
  it('Test input', async () => {
    const input = await fileReader(__dirname + `/day_${day}_input_1_test.txt`);

    const response = day08Part2(input);

    expect(response).toBe(0);
  });

  it('Real input', async () => {
    const input = await fileReader(__dirname + `/day_${day}_input.txt`);

    const response = day08Part2(input);

    expect(response).toBe(0);
  });
});
