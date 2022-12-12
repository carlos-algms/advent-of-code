import fs from 'fs';
import assert from 'assert';

const MAX_DIR_SIZE = 100000;
const DISK_SIZE = 70000000;
const UPDATE_SIZE = 30000000;

async function app() {
  const [inputsTest, input] = await Promise.all([
    readInputFile('input_example.txt'),
    readInputFile('input.txt'),
  ]);

  const demoTree = runPart1(inputsTest, 95437, 'Demo Input');
  const tree = runPart1(input, 1297683, 'Real input');

  runPart2(demoTree, 24933642, 'Test Input');
  runPart2(tree, 5756764, 'Real Input');
}

function runPart1(input: string, expectedSum: number, message = ''): Dir[] {
  const tree = calculateDirSizes(input);
  const filteredDirs = findDirsWithMaxSize(tree, MAX_DIR_SIZE);
  const sum = sumDirSizes(filteredDirs);

  assert.equal(sum, expectedSum);

  console.log(`
  # Solution part 1:
    ${message}
    R: ${sum}
  `);

  return tree;
}

function runPart2(tree: Dir[], expectedSum: number, message = '') {
  const root = [...tree].shift()!;
  const availableDiskSize = DISK_SIZE - root.size;
  const requiredSize = UPDATE_SIZE - availableDiskSize;

  const dir = tree.reduce((prev, cur) => {
    if (cur.size >= requiredSize && cur.size < prev.size) {
      return cur;
    }

    return prev;
  }, root);

  assert.ok(dir);
  assert.notStrictEqual(root, dir);
  assert.equal(dir.size, expectedSum);

  console.log(`
  # Solution part 2:
    ${message}
    R: ${dir.size}
    dir name: ${dir.name}
  `);
}

function calculateDirSizes(input: string): Dir[] {
  const tree: Dir[] = [
    {
      name: '/',
      parent: null,
      size: 0,
      children: new Set<string>(),
    },
  ];
  let currentDir = tree[0];

  input.split('\n').forEach((line) => {
    if (line === '$ ls') {
      return;
    }

    if (line.startsWith('$ cd')) {
      const dirName = line.substring(5);

      if (dirName === '..') {
        // it is impossible to go higher than the '/' directory
        currentDir = currentDir.parent || currentDir;
      } else {
        // checking for parent, as we might have dupes in different levels
        let nextDir = tree.find((d) => d.name === dirName && d.parent === currentDir);
        if (!nextDir) {
          nextDir = {
            name: dirName,
            parent: currentDir,
            size: 0,
            children: new Set<string>(),
          };

          tree.push(nextDir);
        }

        currentDir = nextDir;
      }

      return;
    }

    const [sizeOrType, name] = line.split(' ');

    if (sizeOrType === 'dir') {
      currentDir.children.add(name);
      return;
    }

    if (!currentDir.children.has(name)) {
      currentDir.children.add(name);
      const size = parseInt(sizeOrType, 10);
      addSizeRecursively(currentDir, size);
      return;
    }

    console.log('Line not processed: ', line);
  });

  return tree;
}

/**
 * Adds a file size to the current dir and all its parents
 */
function addSizeRecursively(dir: Dir | null, size: number) {
  assert.ok(dir);

  do {
    dir.size += size;
  } while ((dir = dir.parent));
}

function findDirsWithMaxSize(dirs: Dir[], maxSize: number): Dir[] {
  return dirs.slice(1).reduce<Dir[]>((acc, dir) => {
    if (dir.size <= maxSize) {
      acc.push(dir);
    }
    return acc;
  }, []);
}

function sumDirSizes(dirs: Dir[]): number {
  return dirs.reduce((acc, dir) => acc + dir.size, 0);
}

type Dir = {
  name: string;
  parent: Dir | null;
  size: number;
  children: Set<string>;
};

////////////////////////////////////////////////////////////////////////////////////////////////

function readInputFile(file: string): Promise<string> {
  const inputPath = __dirname + '/' + file;

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
