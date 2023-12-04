import { fileReader } from '../shared/fileReader';

import { day03Part2 } from './day_03_part2';

async function part1Input() {
  console.log('✅ Day 03 Part 2 input passed!');
}

describe('Day 3 - Part 2', () => {
  it('Test input', async () => {
    const input = await fileReader(__dirname + '/day_03_input_1_test.txt');

    const { sum, numbers } = day03Part2(input);

    const expectedSum = 467835;
    const expectedNumbers = [467, 35, 755, 598];

    expect(sum).toEqual(expectedSum);
    expect(numbers).toEqual(expectedNumbers);
  });

  it('Input', async () => {
    const input = await fileReader(__dirname + '/day_03_input.txt');

    const { sum } = day03Part2(input);

    const expectedSum = 84051670;

    expect(sum).toEqual(expectedSum);
  });
});
