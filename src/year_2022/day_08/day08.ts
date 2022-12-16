import fs from 'fs';
import assert from 'assert';

async function app() {
  const [inputTest, input] = await Promise.all([
    readInputFile('input_example.txt'),
    readInputFile('input.txt'),
  ]);

  const solutionTest1 = runPart1(inputTest);
  assert.equal(solutionTest1, 21, 'Solution 1 test input');
  const solutionPart1 = runPart1(input);
  assert.equal(solutionPart1, 1840, 'Solution 1 real input');

  const solutionTest2 = runPart2(inputTest);
  assert.equal(solutionTest2, 8, 'Solution 2 test input');
  const solutionPart2 = runPart2(input);
  assert.equal(solutionPart2, 2000, 'Solution 2 real input');
}

function runPart2(matrix: number[][]): number {
  const size = matrix.length;
  let bestScenicScore = 0;
  let bestItem = 0;
  let coords = [0, 0];

  for (let iRow = 0; iRow < size; iRow++) {
    const row = matrix[iRow];

    for (let iCol = 0; iCol < size; iCol++) {
      if (checkIsAtTheEdge(matrix, iRow, iCol)) {
        continue;
      }

      const item = matrix[iRow][iCol];
      const visibleToTheRight = getVisibleToTheRight(row, iCol, item);
      const visibleToTheLeft = getVisibleToTheLeft(row, iCol, item);
      const visibleToTheTop = getVisibleToTheTop(matrix, iRow, iCol);
      const visibleToTheBottom = getVisibleToTheBottom(matrix, iRow, iCol);
      const scenicScore =
        visibleToTheRight * visibleToTheLeft * visibleToTheTop * visibleToTheBottom;

      if (scenicScore > bestScenicScore) {
        bestScenicScore = scenicScore;
        bestItem = item;
        coords = [iRow, iCol];
      }
    }
  }

  return bestScenicScore;
}

function getVisibleToTheRight(row: number[], currentColumn: number, item: number): number {
  let visible = 0;

  for (let i = currentColumn + 1; i < row.length; i++) {
    visible++;
    const next = row[i];
    if (next >= item) {
      break;
    }
  }

  return visible || 1;
}

function getVisibleToTheLeft(row: number[], currentColumn: number, item: number): number {
  if (currentColumn === 0) {
    return 1;
  }

  let visible = 0;

  for (let i = currentColumn - 1; i >= 0; i--) {
    visible++;
    const next = row[i];
    if (next >= item) {
      break;
    }
  }

  return visible || 1;
}

function getVisibleToTheTop(matrix: number[][], currentRow: number, currentColumn: number): number {
  if (currentRow === 0) {
    return 1;
  }

  let visible = 0;
  const item = matrix[currentRow][currentColumn];

  for (let i = currentRow - 1; i >= 0; i--) {
    visible++;
    const next = matrix[i][currentColumn];
    if (next >= item) {
      break;
    }
  }

  return visible || 1;
}

function getVisibleToTheBottom(
  matrix: number[][],
  currentRow: number,
  currentColumn: number,
): number {
  if (currentColumn === matrix.length - 1) {
    return 1;
  }

  let visible = 0;
  const item = matrix[currentRow][currentColumn];

  for (let i = currentRow + 1; i < matrix.length; i++) {
    visible++;

    const next = matrix[i][currentColumn];
    if (next >= item) {
      break;
    }
  }

  return visible || 1;
}

///////////////////////////////////////

function runPart1(matrix: number[][]): number {
  // I'm assuming it is a square matrix
  const size = matrix.length;
  let totalVisible = 0;

  for (let iRow = 0; iRow < size; iRow++) {
    for (let iCol = 0; iCol < size; iCol++) {
      if (checkIsVisible(matrix, iRow, iCol)) {
        totalVisible++;
      }
    }
  }

  return totalVisible;
}

function checkIsAtTheEdge(matrix: number[][], r: number, c: number) {
  if (r === 0 || r === matrix.length - 1) {
    return true;
  }

  if (c === 0 || c === matrix.length - 1) {
    return true;
  }

  return false;
}

function checkIsVisible(matrix: number[][], r: number, c: number): boolean {
  if (checkIsAtTheEdge(matrix, r, c)) {
    return true;
  }

  const item = matrix[r][c];
  return isVisibleInRow(item, matrix[r], c) || isVisibleInColumn(item, matrix, r, c);
}

function isVisibleInRow(item: number, row: number[], currentColumn: number): boolean {
  let isVisible = true;

  for (let i = currentColumn - 1; i >= 0; i--) {
    const next = row[i];
    if (next >= item) {
      isVisible = false;
    }
  }

  if (!isVisible) {
    for (let i = currentColumn + 1; i < row.length; i++) {
      const next = row[i];
      if (next >= item) {
        return false;
      }
    }
  }

  return true;
}

function isVisibleInColumn(
  item: number,
  matrix: number[][],
  currentRow: number,
  currentColumn: number,
): boolean {
  let isVisible = true;

  for (let i = currentRow - 1; i >= 0; i--) {
    const next = matrix[i][currentColumn];
    if (next >= item) {
      isVisible = false;
    }
  }

  if (!isVisible) {
    for (let i = currentRow + 1; i < matrix.length; i++) {
      const next = matrix[i][currentColumn];
      if (next >= item) {
        return false;
      }
    }
  }

  return true;
}

////////////////////////////////////////////////////////////////////////////////////////////////

function readInputFile(file: string): Promise<number[][]> {
  const inputPath = __dirname + '/' + file;

  return new Promise<number[][]>((resolve, reject) => {
    fs.readFile(inputPath, 'utf8', (err, data) => {
      if (err) {
        reject(err);
        return;
      }

      const parsed = data.split('\n').reduce<number[][]>((acc, line) => {
        acc.push(line.split('').map((n) => parseInt(n, 10)));
        return acc;
      }, []);

      resolve(parsed);
    });
  });
}

app();
