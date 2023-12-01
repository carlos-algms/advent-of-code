import { fileReader } from '../shared/fileReader';

async function app() {
  // const input = ['2-4,6-8', '2-3,4-5', '5-7,7-9', '2-8,3-7', '6-6,4-6', '2-6,4-8'];
  const input = await fileReader(__dirname + '/input.txt');

  // In how many assignment pairs does one range fully contain the other?
  let fullyOverlappingCount = 0;

  // In how many assignment pairs do the ranges overlap?
  let anyOverlappingCount = 0;

  input.forEach((row) => {
    const [sectionA, sectionB] = row
      .split(',')
      .map((s) => s.split('-').map((n) => parseInt(n, 10)));

    if (isFullyOverlapping(sectionA, sectionB) || isFullyOverlapping(sectionB, sectionA)) {
      fullyOverlappingCount++;
    }

    if (
      isAnySectionOverlapping(sectionA, sectionB) ||
      isAnySectionOverlapping(sectionB, sectionA)
    ) {
      anyOverlappingCount++;
    }
  });

  console.log(`
  # Solution part 1:
    In how many assignment pairs does one range fully contain the other?
    ${fullyOverlappingCount}
  `);

  console.log(`
  # Solution part 2:
    In how many assignment pairs does one range fully contain the other?
    ${anyOverlappingCount}
  `);
}

/**
 * Checks if A is fully overlapping with B
 * 2-6 is overlapping/included in 1-7
 */
function isFullyOverlapping(a: number[], b: number[]): boolean {
  return Boolean(a[0] <= b[0] && a[1] >= b[1]);
}

function isAnySectionOverlapping(a: number[], b: number[]): boolean {
  return Boolean((a[0] <= b[0] && a[1] >= b[0]) || (a[0] <= b[1] && a[1] >= b[1]));
}

////////////////////////////////////////////////////////////////////////////////////////////////

app();
