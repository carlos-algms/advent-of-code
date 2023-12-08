import assert from 'assert';

import { fileReader } from '../shared/fileReader';

import { day08Part2 } from './day_08_part2';

const day = '08';

async function test1Input() {
  const input = await fileReader(__dirname + `/day_${day}_part2_input_1_test.txt`);

  const response = day08Part2(input);

  assert.equal(response, 6);
  console.log(`✅ Day ${day} part 2 Test 1 passed!`);
}

async function realInput() {
  const input = await fileReader(__dirname + `/day_${day}_input.txt`);

  const response = day08Part2(input);

  assert.equal(response, 23977527174353);
  console.log(`✅ Day ${day} part 2 real input passed!`);
}

(async () => {
  await test1Input();
  await realInput();
})();
