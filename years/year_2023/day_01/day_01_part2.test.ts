import assert from 'assert';

import { fileReader } from '../shared/fileReader';
import { day01Part2 } from './day_01_part2';

async function part2TestInput() {
  const testInput = await fileReader(__dirname + '/day_01_input_2_test.txt');
  const testExpectedSum = 281;

  const { calibrationNumbers, sum } = day01Part2(testInput);
  assert.deepEqual(calibrationNumbers, [29, 83, 13, 24, 42, 14, 76]);
  assert.equal(sum, testExpectedSum);
  console.log('✅ Test 2 input passed!');
}

async function part2ManualTest() {
  const input = ['fivezg8mjf6hrxnhgxxttwoneg', 'slhdsxngfxszspppxxfftmxlptzhtwovp1', 'fone2two'];
  // const expectedSum = 51;
  const { calibrationNumbers, sum } = day01Part2(input);
  assert.deepEqual(calibrationNumbers, [51, 21, 12]);
  // assert.equal(sum, expectedSum);
  console.log('✅ Test manual input passed!');
}

async function part2Input() {
  const input = await fileReader(__dirname + '/day_01_input.txt');
  const expectedSum = 54277;

  const { sum, calibrationNumbers } = day01Part2(input);
  console.log(`ℹ️ Part 2 answer: ${sum}`);

  assert.equal(calibrationNumbers.length, 1000);

  assert.equal(sum, expectedSum);
  console.log('✅ Part 2 input passed!');
}

(async () => {
  await part2TestInput();
  await part2ManualTest();
  await part2Input();
})();
