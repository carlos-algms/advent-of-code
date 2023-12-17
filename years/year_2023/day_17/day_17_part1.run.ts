import assert from 'node:assert';
import fs from 'node:fs/promises';

import solution from './day_17_part1';

const day = '17';
const part = '1';

async function test1Input() {
  const input: string = `2413432311323
3215453535623
3255245654254
3446585845452
4546657867536
1438598798454
4457876987766
3637877979653
4654967986887
4564679986453
1224686865563
2546548887735
4322674655533`;

  const response = solution(input);

  assert.equal(response, 102, 'the sum');

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
  await realInput();
})();
