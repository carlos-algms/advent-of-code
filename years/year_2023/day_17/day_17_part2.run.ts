import assert from 'node:assert';
import fs from 'node:fs/promises';

import solution from './day_17_part2';

const day = '17';
const part = '2';

function testSmaller() {
  const input = `111111111111
999999999991
999999999991
999999999991
999999999991`;

  const response = solution(input);

  assert.equal(response, 71, 'the sum');

  console.log(`✅ Day ${day} - part ${part} - smaller test passed!`);
}

function test1Input() {
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

  assert.equal(response, 94, 'the sum');

  console.log(`✅ Day ${day} - part ${part} - test 1 passed!`);
}

async function realInput() {
  const input = await fs.readFile(__dirname + `/day_${day}_input.txt`, 'utf8');

  const response = solution(input);
  assert.equal(response, 1128, 'the sum');

  console.log(`✅ Day ${day} - part ${part} - real input passed!`);
}

(async () => {
  testSmaller();
  // await test1Input();
  // await realInput();
})();
