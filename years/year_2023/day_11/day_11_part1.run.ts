import assert from 'assert';

import { fileReader } from '../shared/fileReader';

import solution from './day_11_part1';

const day = '11';

async function test1Input() {
  const input: string[] = `...#......
.......#..
#.........
..........
......#...
.#........
.........#
..........
.......#..
#...#.....`.split('\n');

  const expectedExpanded = `....#........
.........#...
#............
.............
.............
........#....
.#...........
............#
.............
.............
.........#...
#....#.......`;

  const response = solution(input);

  assert.equal(response.expanded.length, 12, 'number of lines');
  assert.equal(response.expanded[0].length, 13, 'number of columns');
  assert.equal(response.expanded.join('\n'), expectedExpanded, 'the actual expanded');
  assert.equal(response.sum, 374, 'the sum');

  console.log(`✅ Day ${day} - part 1 - test 1 passed!`);
}

async function realInput() {
  const input = await fileReader(__dirname + `/day_${day}_input.txt`);

  const response = solution(input);

  assert.equal(response.sum, 10494813);
  console.log(`✅ Day ${day} - part 1 - real input passed!`);
}

(async () => {
  await test1Input();
  await realInput();
})();
