import assert from 'assert';

import { fileReader } from '../shared/fileReader';

import solution from './day_09_part1';

const day = '09';

async function test1Input() {
  const input = await fileReader(__dirname + `/day_${day}_input_1_test.txt`);

  const response = solution(input);

  assert.equal(response, 114);
}

async function realInput() {
  const input = await fileReader(__dirname + `/day_${day}_input.txt`);

  const response = solution(input);

  assert.equal(response, 0);
}

(async () => {
  await test1Input();
  // await realInput();
})();
