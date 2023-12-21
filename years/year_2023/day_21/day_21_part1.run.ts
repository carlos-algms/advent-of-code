import assert from 'node:assert';
import fs from 'node:fs/promises';

import solution from './day_21_part1';

const day = '21';
const part = '1';

async function test1Input() {
  const input: string = `...........
.....###.#.
.###.##..#.
..#.#...#..
....#.#....
.##..S####.
.##..#...#.
.......##..
.##.#.####.
.##..##.##.
...........`;

  const response = solution(input, 12);

  assert.equal(response, 16, 'the sum');

  console.log(`✅ Day ${day} - part ${part} - test 1 passed!`);
}

async function realInput() {
  const input = await fs.readFile(__dirname + `/day_${day}_input.txt`, 'utf8');

  const response = solution(input, 64);
  assert.equal(response, 0, 'the sum');

  console.log(`✅ Day ${day} - part ${part} - real input passed!`);
}

(async () => {
  await test1Input();
  await realInput();
})();
