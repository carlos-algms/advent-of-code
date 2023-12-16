import assert from 'node:assert';
import fs from 'node:fs/promises';

import solution from './day_16_part1';

const day = '16';
const part = '1';

async function test1Input() {
  const input = await fs.readFile(__dirname + `/day_${day}_input_test.txt`, 'utf8');

  console.time('test 1');
  const response = solution(input);
  console.timeEnd('test 1');

  assert.equal(response, 46, 'the sum');

  console.log(`✅ Day ${day} - part ${part} - test 1 passed!`);
}

async function realInput() {
  const input = await fs.readFile(__dirname + `/day_${day}_input.txt`, 'utf8');

  console.time('real input');
  const response = solution(input);
  console.timeEnd('real input');

  assert.equal(response, 0, 'the sum');

  console.log(`✅ Day ${day} - part ${part} - real input passed!`);
}

(async () => {
  await test1Input();
  await realInput();
})();
