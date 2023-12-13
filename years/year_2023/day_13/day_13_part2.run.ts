import assert from 'node:assert';
import fs from 'node:fs/promises';

import solution from './day_13_part1';

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

  assert.equal(response, 100, 'the sum');

  console.log(`✅ Day ${day} - part ${part} - horizontal passed!`);
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

  assert.equal(response, 300, 'the sum');

  console.log(`✅ Day ${day} - part ${part} - rows passed!`);
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
  assert(response > 27418, 'first pass was too low');
  assert.equal(response, 0, 'the sum');

  console.log(`✅ Day ${day} - part ${part} - real input passed!`);
}

(async () => {
  testManual1();
  testManual2();
  // await test1Input();
  // await realInput();
})();
