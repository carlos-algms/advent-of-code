import assert from 'assert';

import { fileReader } from '../shared/fileReader';

import { day04Part2 } from './day_04_part2';

async function part1TestInput() {
  const input = await fileReader(__dirname + '/day_04_input_1_test.txt');

  const response = day04Part2(input);
  const expectedResponse = 30;
  assert.strictEqual(response, expectedResponse);

  console.log('✅ Day 04 part 2 Test input passed!');
}

async function part1Input() {
  const input = await fileReader(__dirname + '/day_04_input.txt');

  const response = day04Part2(input);
  const expectedResponse = 8805731;

  assert.equal(response, expectedResponse);

  console.log('✅ Day 04 Part 2 input passed!');
}

(async () => {
  await part1TestInput();
  await part1Input();
})();
