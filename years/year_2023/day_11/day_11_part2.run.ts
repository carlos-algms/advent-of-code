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

  // it should be compatible with part1
  const response0 = solution(input, 2);
  assert.equal(response0.sum, 374, 'the sum part 1');

  const response1 = solution(input, 10);
  assert.equal(response1.sum, 1030, 'the sum 10x');

  const response2 = solution(input, 100);
  assert.equal(response2.sum, 8410, 'the sum 100x');

  console.log(`✅ Day ${day} - part 2 - test 1 passed!`);
}

async function realInput() {
  const input = await fileReader(__dirname + `/day_${day}_input.txt`);

  const response = solution(input, 1000000);

  assert.equal(response.sum, 840988812853);
  console.log(`✅ Day ${day} - part 2 - real input passed!`);
}

(async () => {
  await test1Input();
  await realInput();
})();
