import assert from 'assert';

import { fileReader } from '../shared/fileReader';
import { day02Part2 } from './day_02_part2';

async function part2TestInput() {
  const input = await fileReader(__dirname + '/day_02_input_1_test.txt');

  const { sum, sums } = day02Part2(input);

  const expectedSum = 2286;
  const expectedIds = [48, 12, 1560, 630, 36];

  assert.deepEqual(sums, expectedIds);
  assert.strictEqual(sum, expectedSum);

  console.log('✅ Test input passed!');
}

async function part2Input() {
  const input = await fileReader(__dirname + '/day_02_input.txt');

  const { sum } = day02Part2(input);

  const expectedSum = 70387;

  assert.strictEqual(sum, expectedSum);

  console.log('✅ Part 2 input passed!');
}

(async () => {
  await part2TestInput();
  await part2Input();
})();
