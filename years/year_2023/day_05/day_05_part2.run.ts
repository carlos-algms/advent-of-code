import assert from 'assert';

import { fileReader } from '../shared/fileReader';

import { day05Part2 } from './day_05_part2';

async function day05Part2TestInput() {
  const input = await fileReader(__dirname + '/day_05_input_1_test.txt');

  const response = day05Part2(input);

  assert.equal(response.lowestLocation, 46);

  console.log('✅ Test input passed!');
}

async function day05Part2RealInput() {
  const input = await fileReader(__dirname + '/day_05_input.txt');

  const response = day05Part2(input);

  assert.equal(response.lowestLocation, 27992443);

  console.log('✅ Real input passed!');
}

(async () => {
  await day05Part2TestInput();
  await day05Part2RealInput();
})();
