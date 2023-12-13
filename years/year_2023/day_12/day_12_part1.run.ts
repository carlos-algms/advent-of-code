import assert from 'assert';

import { fileReader } from '../shared/fileReader';

import solution, { countArrangements, removeExtraDots } from './day_12_part1';

const day = '12';

function testSpecificArrangement() {
  const arrangement = removeExtraDots('.##..#....###.');
  const sequence = [1, 1, 3];
  const memo = new Map<string, number>();
  const result = countArrangements(arrangement.split(''), sequence, memo);
  assert.equal(result, 1, 'the sum');
  console.log(`✅ Day ${day} - part 1 - specific 1 passed!`);
}

function testWith1Arrangement() {
  const input = ['???.### 1,1,3'];
  const response = solution(input);

  assert.equal(response, 1, 'the sum');

  console.log(`✅ Day ${day} - part 1 - test with 1 passed!`);
}

function testWith4Arrangements() {
  const input = ['.??..??...?##. 1,1,3'];
  const response = solution(input);

  assert.equal(response, 4, 'the sum');

  console.log(`✅ Day ${day} - part 1 - test with 4 passed!`);
}

function testWith10Arrangements() {
  const input = ['?###???????? 3,2,1'];
  const response = solution(input);

  assert.equal(response, 10, 'the sum');

  console.log(`✅ Day ${day} - part 1 - test with 10 passed!`);
}

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
  // testSpecificArrangement();
  // testWith1Arrangement();
  // testWith4Arrangements();
  testWith10Arrangements();
  // await test1Input();
  // await realInput();
})();
