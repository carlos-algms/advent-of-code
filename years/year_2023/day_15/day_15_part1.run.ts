import assert from 'node:assert';
import fs from 'node:fs/promises';

import solution from './day_15_part1';

const day = '15';
const part = '1';

function testTheWordHASH() {
  const input = 'HASH';

  const response = solution(input);

  assert.equal(response, 52, 'the sum');

  console.log(`✅ Day ${day} - part ${part} - HASH word passed!`);
}

async function test1Input() {
  const input = `rn=1,cm-,qp=3,cm=2,qp-,pc=4,ot=9,ab=5,pc-,pc=6,ot=7`;

  const response = solution(input);

  assert.equal(response, 1320, 'the sum');

  console.log(`✅ Day ${day} - part ${part} - test 1 passed!`);
}

async function realInput() {
  const input = await fs.readFile(__dirname + `/day_${day}_input.txt`, 'utf8');

  const response = solution(input);
  assert.equal(response, 495972, 'the sum');

  console.log(`✅ Day ${day} - part ${part} - real input passed!`);
}

(async () => {
  testTheWordHASH();
  await test1Input();
  await realInput();
})();
