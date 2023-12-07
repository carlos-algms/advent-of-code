import { fileReader } from '../shared/fileReader';

import { day07Part1 } from './day_07_part1';

const day = '07';

describe(`Day ${day} - Part 1`, () => {
  it('Test input', async () => {
    const input = await fileReader(__dirname + `/day_${day}_input_1_test.txt`);

    const response = day07Part1(input);
  });

  it('Real input', async () => {
    const input = await fileReader(__dirname + `/day_${day}_input.txt`);

    const response = day07Part1(input);
  });
});
