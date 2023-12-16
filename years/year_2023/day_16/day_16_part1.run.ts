import assert from 'node:assert';
import fs from 'node:fs/promises';

import solution from './day_16_part1';

const day = '16';
const part = '1';

async function test1Input() {
  const input: string = ``;

  const response = solution(input);

  assert.equal(response, 46, 'the sum');

  console.log(`✅ Day ${day} - part ${part} - test 1 passed!`);
}

async function realInput() {
  const input = await fs.readFile(__dirname + `/day_${day}_input.txt`, 'utf8');

  const response = solution(input);
  assert.equal(response, 0, 'the sum');

  console.log(`✅ Day ${day} - part ${part} - real input passed!`);
}

(async () => {
  await test1Input();
  // await realInput();
})();
