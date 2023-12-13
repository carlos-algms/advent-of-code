import assert from 'node:assert';
import fs from 'node:fs/promises';

import solution from './day_13_part2';

const day = '13';
const part = '2';

function testManual1() {
  const input: string = `#.##..##.
..#.##.#.
##......#
##......#
..#.##.#.
..##..##.
#.#.##.#.`;

  const response = solution(input);

  assert.equal(response, 300, 'the sum');

  console.log(`✅ Day ${day} - part ${part} - manual 1 passed!`);
}

function testManual2() {
  const input: string = `#...##..#
#....#..#
..##..###
#####.##.
#####.##.
..##..###
#....#..#`;

  const response = solution(input);

  assert.equal(response, 100, 'the sum');

  console.log(`✅ Day ${day} - part ${part} - manual 2 passed!`);
}

async function test1Input() {
  const input: string = `#.##..##.
..#.##.#.
##......#
##......#
..#.##.#.
..##..##.
#.#.##.#.

#...##..#
#....#..#
..##..###
#####.##.
#####.##.
..##..###
#....#..#`;

  const response = solution(input);

  assert.equal(response, 400, 'the sum');

  console.log(`✅ Day ${day} - part ${part} - test 1 passed!`);
}

async function realInput() {
  const input = await fs.readFile(__dirname + `/day_${day}_input.txt`, 'utf8');

  const response = solution(input);
  assert.equal(response, 42996, 'the sum');

  console.log(`✅ Day ${day} - part ${part} - real input passed!`);
}

(async () => {
  testManual1();
  testManual2();
  await test1Input();
  await realInput();
})();
