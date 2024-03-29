import assert from 'assert';

import { fileReader } from '../shared/fileReader';

import solution from './day_09_part1';

const day = '09';

async function test1Input() {
  const input = await fileReader(__dirname + `/day_${day}_input_1_test.txt`);

  const response = solution(input);

  assert.equal(response, 114);
  console.log(`✅ Day ${day} - test 1 passed!`);
}

async function realInput() {
  const input = await fileReader(__dirname + `/day_${day}_input.txt`);

  const response = solution(input);

  assert.equal(response, 1584748274);
  console.log(`✅ Day ${day} - real input passed!`);
}

(async () => {
  await test1Input();
  await realInput();
})();
