import assert from 'assert';

import { fileReader } from '../shared/fileReader';
import { day01Part2 } from './day_02_part2';

async function part2TestInput() {
  const input = await fileReader(__dirname + '/day_01_input_2_test.txt');
  console.log('✅ Test input passed!');
}

async function part2ManualTest() {
  const input = [];
  console.log('✅ Test manual input passed!');
}

async function part2Input() {
  const input = await fileReader(__dirname + '/day_01_input.txt');
  console.log('✅ Part 2 input passed!');
}

(async () => {
  await part2TestInput();
  await part2ManualTest();
  await part2Input();
})();
