import { fileReader } from '../shared/fileReader';

import { day07Part2 } from './day_07_part2';

const day = '07';

describe(`Day ${day} - Part 2`, () => {
  it('Test input', async () => {
    const input = await fileReader(__dirname + `/day_${day}_input_1_test.txt`);

    const response = day07Part2(input);

    expect(response).toBe(5905);
  });

  it('Real input', async () => {
    const input = await fileReader(__dirname + `/day_${day}_input.txt`);

    const response = day07Part2(input);

    // first pass was too low
    expect(response).toBeGreaterThan(241980563);

    // second pass was too high
    expect(response).toBeLessThan(243139618);

    expect(response).toBe(243101568);
  });
});
