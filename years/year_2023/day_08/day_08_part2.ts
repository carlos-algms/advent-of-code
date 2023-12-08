interface LinkedList {
  key: string;
  L: LinkedList | null;
  R: LinkedList | null;
}

/**
 * Line 1:
 * LLRRLLRR.....
 *
 * Then:
 * AAA = (BBB, CCC)
 * BBB = (DDD, EEE)
 * ....
 */
export function day08Part2(lines: string[]) {
  const [directions, _, ...nodes] = lines;

  let startingNodes = buildLinkedList(nodes);

  const totals = startingNodes.map((node) => {
    let i = 0;
    let current = node;
    let stepsCount = 0;

    do {
      const d = directions[i] as 'L' | 'R';
      const next = current[d];

      if (!next) {
        throw new Error(`Invalid node - current: ${current} - direction: ${d} - index: ${i}`);
      }

      current = next;
      stepsCount++;
      i = (i + 1) % directions.length;
    } while (!current.key.endsWith('Z'));

    return stepsCount;
  });

  const response = totals.reduce((acc, total) => lcm(acc, total), totals.shift()!);

  return response;
}

function lcm(a: number, b: number): number {
  const smallest = Math.min(a, b);
  const largest = Math.max(a, b);

  for (let i = largest; (i += largest); ) {
    if (i % smallest === 0) return i;
  }

  throw new Error('No LCM');
}

function buildLinkedList(nodes: string[]) {
  const map = new Map<string, LinkedList>();
  const startNodes: LinkedList[] = [];

  for (const node of nodes) {
    const [key, links] = node.split(' = ');
    const [left, right] = links.replace(/[)(]/g, '').split(', ');

    let next = getListItem(key, map);
    next.L = getListItem(left, map);
    next.R = getListItem(right, map);

    if (key.endsWith('A')) {
      startNodes.push(next);
    }
  }

  return startNodes;
}

function getListItem(key: string, list: Map<string, LinkedList>) {
  let node = list.get(key);

  if (!node) {
    node = {
      key,
      L: null,
      R: null,
    };
    list.set(key, node);
  }

  return node;
}
