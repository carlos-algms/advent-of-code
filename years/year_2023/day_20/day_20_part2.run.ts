import assert from 'node:assert';
import fs from 'node:fs/promises';

import solution from './day_20_part2';

const day = '20';
const part = '2';

async function realInput() {
  const input = await fs.readFile(__dirname + `/day_${day}_input.txt`, 'utf8');

  const response = solution(input);
  assert.equal(response, 0, 'the sum');

  console.log(`✅ Day ${day} - part ${part} - real input passed!`);
}

(async () => {
  await realInput();
})();
