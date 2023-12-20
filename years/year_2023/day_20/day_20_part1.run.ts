import assert from 'node:assert';
import fs from 'node:fs/promises';

import solution from './day_20_part1';

const day = '20';
const part = '1';

async function test1Input() {
  const input: string = `broadcaster -> a, b, c
%a -> b
%b -> c
%c -> inv
&inv -> a`;

  const response = solution(input);

  assert.equal(response, 32000000, 'the sum');

  console.log(`✅ Day ${day} - part ${part} - test 1 passed!`);
}

async function test2Input() {
  const input: string = `broadcaster -> a
%a -> inv, con
&inv -> b
%b -> con
&con -> output`;

  const response = solution(input);

  assert.equal(response, 11687500, 'the sum');

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
