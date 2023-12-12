import assert from 'assert';

import { fileReader } from '../shared/fileReader';

import solution from './day_12_part1';

const day = '12';

async function test1Input() {
  const input: string[] = `???.### 1,1,3
.??..??...?##. 1,1,3
?#?#?#?#?#?#?#? 1,3,1,6
????.#...#... 4,1,1
????.######..#####. 1,6,5
?###???????? 3,2,1`.split('\n');

  const response = solution(input);

  assert.equal(response, 21, 'the sum');

  console.log(`✅ Day ${day} - part 1 - test 1 passed!`);
}

async function realInput() {
  const input = await fileReader(__dirname + `/day_${day}_input.txt`);

  const response = solution(input);

  assert.equal(response, 0, 'the sum');

  console.log(`✅ Day ${day} - part 1 - real input passed!`);
}

(async () => {
  await test1Input();
  // await realInput();
})();
