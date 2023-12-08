import assert from 'assert';

import { fileReader } from '../shared/fileReader';

import { day08Part1 } from './day_08_part1';

const day = '08';

async function test1Input() {
  const input = await fileReader(__dirname + `/day_${day}_part2_input_1_test.txt`);

  const response = day08Part1(input);

  assert.equal(response, 6);
}

async function realInput() {
  const input = await fileReader(__dirname + `/day_${day}_input.txt`);

  const response = day08Part1(input);

  assert.equal(response, 0);
}

(async () => {
  await test1Input();
  // await realInput();
})();
