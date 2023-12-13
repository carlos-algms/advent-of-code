import assert from 'assert';

import { fileReader } from '../shared/fileReader';

import solution from './day_12_part2';

const day = '12';

function test1() {
  const input = ['???.### 1,1,3'];
  const response = solution(input);

  assert.equal(response, 1, 'the sum');

  console.log(`✅ Day ${day} - part 1 - test with 1 passed!`);
}

function test2() {
  const input = ['.??..??...?##. 1,1,3'];
  const response = solution(input);

  assert.equal(response, 16384, 'the sum');

  console.log(`✅ Day ${day} - part 1 - test 2 passed!`);
}

async function test1Input() {
  const input: string[] = `???.### 1,1,3
.??..??...?##. 1,1,3
?#?#?#?#?#?#?#? 1,3,1,6
????.#...#... 4,1,1
????.######..#####. 1,6,5
?###???????? 3,2,1`.split('\n');

  const response = solution(input);

  assert.equal(response, 525152, 'the sum');

  console.log(`✅ Day ${day} - part 1 - test 1 passed!`);
}

async function realInput() {
  const input = await fileReader(__dirname + `/day_${day}_input.txt`);

  const response = solution(input);

  assert.equal(response, 7506, 'the sum');

  console.log(`✅ Day ${day} - part 1 - real input passed!`);
}

(() => {
  test1();
  // test2();
  // test1Input();
  // realInput();
})();
