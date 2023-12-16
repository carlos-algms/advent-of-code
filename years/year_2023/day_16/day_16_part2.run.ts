import assert from 'node:assert';
import fs from 'node:fs/promises';

import solution from './day_16_part2';

const day = '16';
const part = '2';

async function test1Input() {
  const input = await fs.readFile(__dirname + `/day_${day}_input_test.txt`, 'utf8');

  console.time('test 2');
  const response = solution(input);
  console.timeEnd('test 2');

  assert.equal(response, 51, 'the sum');

  console.log(`✅ Day ${day} - part ${part} - test 1 passed!`);
}

async function realInput() {
  const input = await fs.readFile(__dirname + `/day_${day}_input.txt`, 'utf8');

  console.time('real input');
  const response = solution(input);
  console.timeEnd('real input');

  assert.equal(response, -Infinity, 'the sum');

  console.log(`✅ Day ${day} - part ${part} - real input passed!`);
}

(async () => {
  await test1Input();
  // await realInput();
})();
