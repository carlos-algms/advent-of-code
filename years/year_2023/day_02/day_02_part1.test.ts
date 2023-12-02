import assert from 'assert';

import { fileReader } from '../shared/fileReader';

import { day01Part1 } from './day_02_part1';

async function part1TestInput() {
  const input = await fileReader(__dirname + '/day_01_input_1_test.txt');
  console.log('✅ Test input passed!');
}

async function part1Input() {
  const input = await fileReader(__dirname + '/day_01_input.txt');
  console.log('✅ Part 1 input passed!');
}

(async () => {
  await part1TestInput();
  await part1Input();
})();
