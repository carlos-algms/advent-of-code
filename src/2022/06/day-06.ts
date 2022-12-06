import fs from 'fs';
import assert from 'assert';

const START_OF_PACKET = 4;
const START_OF_MESSAGE = 14;

async function app() {
  const inputsTest = [
    `bvwbjplbgvbhsrlpgdmjqwftvncz`,
    `nppdvjthqldpwncqszvftbrmjlhg`,
    `nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg`,
    `zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw`,
    `mjqjpqmgbljsphdztnvjfqwrcgsmlb`,
  ];

  const input = await readInputFile();

  assert.equal(findStartOfPacketIndex(inputsTest[0]), 5);
  assert.equal(findStartOfPacketIndex(inputsTest[1]), 6);
  assert.equal(findStartOfPacketIndex(inputsTest[2]), 10);
  assert.equal(findStartOfPacketIndex(inputsTest[3]), 11);

  const indexPart1 = findStartOfPacketIndex(input);
  assert.equal(indexPart1, 1953);

  assert.equal(findStartOfMessageIndex(inputsTest[4]), 19);
  assert.equal(findStartOfMessageIndex(inputsTest[0]), 23);
  assert.equal(findStartOfMessageIndex(inputsTest[1]), 23);
  assert.equal(findStartOfMessageIndex(inputsTest[2]), 29);
  assert.equal(findStartOfMessageIndex(inputsTest[3]), 26);

  const indexPart2 = findStartOfMessageIndex(input);
  assert.equal(indexPart2, 2301);

  console.log(`
  # Solution part 1:
    How many characters need to be processed before the first start-of-packet marker is detected?
    R: ${indexPart1}
  `);

  console.log(`
  # Solution part 2:
    How many characters need to be processed before the first start-of-message marker is detected?
    R: ${indexPart2}
  `);
}

function findStartOfPacketIndex(code: string): number {
  return findMarkerIndex(code, START_OF_PACKET);
}

function findStartOfMessageIndex(code: string): number {
  return findMarkerIndex(code, START_OF_MESSAGE);
}

function findMarkerIndex(code: string, distinctChars: number): number {
  let group: string[] = [];

  return (
    code.split('').findIndex((letter) => {
      const foundAt = group.indexOf(letter);

      if (foundAt >= 0) {
        const newGroup = group.slice(foundAt + 1);
        group = newGroup;
      }

      group.push(letter);

      if (group.length === distinctChars) {
        return true;
      }

      return false;
    }) + 1
  );
}

////////////////////////////////////////////////////////////////////////////////////////////////

function readInputFile(): Promise<string> {
  const inputPath = __dirname + '/input.txt';

  return new Promise<string>((resolve, reject) => {
    fs.readFile(inputPath, 'utf8', (err, data) => {
      if (err) {
        reject(err);
        return;
      }

      resolve(data);
    });
  });
}

app();
