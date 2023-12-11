import assert from 'assert';

import { fileReader } from '../shared/fileReader';

import solution from './day_10_part2';

const day = '10';
const part = '2';

async function test1Input() {
  const input = `...........
.S-------7.
.|F-----7|.
.||.....||.
.||.....||.
.|L-7.F-J|.
.|..|.|..|.
.L--J.L--J.
...........`.split('\n');

  const response = solution(input);
  assert.equal(response, 4);

  console.log(`✅ Day ${day} - part ${part} - test 1 passed!`);
}

async function test2Input() {
  const input = `FF7FSF7F7F7F7F7F---7
L|LJ||||||||||||F--J
FL-7LJLJ||||||LJL-77
F--JF--7||LJLJIF7FJ-
L---JF-JLJIIIIFJLJJ7
|F|F-JF---7IIIL7L|7|
|FFJF7L7F-JF7IIL---7
7-L-JL7||F7|L7F-7F7|
L.L7LFJ|||||FJL7||LJ
L7JLJL-JLJLJL--JLJ.L`.split('\n');

  const response = solution(input);
  assert.equal(response, 10);

  console.log(`✅ Day ${day} - part ${part} - test 2 passed!`);
}

async function realInput() {
  const input = await fileReader(__dirname + `/day_${day}_input.txt`);

  const response = solution(input);

  assert.equal(response, 0);
  console.log(`✅ Day ${day} - part ${part} - real input passed!`);
}

(async () => {
  await test1Input();
  // await test2Input();
  // await realInput();
})();
