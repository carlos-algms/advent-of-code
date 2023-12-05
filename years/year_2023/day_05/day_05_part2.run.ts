import { fileReader } from '../shared/fileReader';

import { day05Part2 } from './day_05_part2';

async function day05Part2RealInput() {
  const input = await fileReader(__dirname + '/day_05_input.txt');

  const response = day05Part2(input);

  expect(response.lowestLocation).toEqual(0);
}

(async () => {
  await day05Part2RealInput();
})();
