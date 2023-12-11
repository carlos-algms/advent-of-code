import assert from 'assert';

import { fileReader } from '../shared/fileReader';

import solution from './day_11_part2';

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

  const response = solution(input);

  assert.equal(response.sum, 0, 'the sum');

  console.log(`✅ Day ${day} - part 2 - test 1 passed!`);
}

async function realInput() {
  const input = await fileReader(__dirname + `/day_${day}_input.txt`);

  const response = solution(input);

  assert.equal(response.sum, 0);
  console.log(`✅ Day ${day} - part 2 - real input passed!`);
}

(async () => {
  await test1Input();
  await realInput();
})();
