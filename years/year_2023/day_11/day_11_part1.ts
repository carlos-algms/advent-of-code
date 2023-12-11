export default function day11Part1(lines: readonly string[]) {
  const expanded = expand(lines);
  const itemsCoords = findCoords(expanded);

  const distances = calculateDistances(itemsCoords);

  const sum = distances.reduce((sum, distance) => sum + distance, 0);

  return {
    expanded,
    sum,
  };
}

function calculateDistances(coords: [number, number][]) {
  const calculated = new Set<string>();
  const distances: number[] = [];

  for (let i = 0; i < coords.length; i++) {
    for (let j = i + 1; j < coords.length; j++) {
      const key = `${i}-${j}`;
      if (calculated.has(key)) {
        continue;
      }

      const [x1, y1] = coords[i];
      const [x2, y2] = coords[j];

      const distance = Math.abs(x1 - x2) + Math.abs(y1 - y2);
      distances.push(distance);

      calculated.add(key);
    }
  }

  return distances;
}

function findCoords(expanded: string[]) {
  return expanded.reduce((coords, line, l) => {
    for (let c = 0; c < line.length; c++) {
      if (line[c] === '#') {
        coords.push([l, c]);
      }
    }
    return coords;
  }, [] as [number, number][]);
}

function expand(lines: readonly string[]): string[] {
  const colsWithItems = new Set<number>();

  const expanded = lines.flatMap((line, l) => {
    let hasItems = false;

    for (let c = 0; c < line.length; c++) {
      if (line[c] === '#') {
        hasItems = true;
        colsWithItems.add(c);
      }
    }
    return hasItems ? line : [line, line];
  });

  return expandCols(expanded, colsWithItems);
}

function expandCols(expanded: string[], colsWithItems: Set<number>): string[] {
  let c = 0;
  let added = 0;

  do {
    if (colsWithItems.has(c - added)) {
      continue;
    }

    for (let l = 0; l < expanded.length; l++) {
      const line = expanded[l].split('');
      line.splice(c, 0, '.');
      expanded[l] = line.join('');
    }

    // I need to go +2, to skip the newly added column
    added++;
    c++;
  } while (expanded[++c] !== undefined);

  return expanded;
}
