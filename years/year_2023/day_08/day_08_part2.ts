const Index = {
  L: 0,
  R: 1,
};

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
export function day08Part1(lines: string[]) {
  const [directions, _, ...nodes] = lines;

  let i = 0;
  let stepsCount = 0;
  let current = buildLinkedList(nodes);

  do {
    const d = directions[i] as 'L' | 'R';
    const next = current[d];

    if (!next) {
      throw new Error(`Invalid node - current: ${current} - direction: ${d} - index: ${i}`);
    }

    current = next;
    stepsCount++;
    i = (i + 1) % directions.length;
  } while (current.key !== 'ZZZ');

  return stepsCount;
}

function buildLinkedList(nodes: string[]) {
  const map = new Map<string, LinkedList>();

  for (const node of nodes) {
    const [key, links] = node.split(' = ');
    const [left, right] = links.replace(/[)(]/g, '').split(', ');

    let next = getListItem(key, map);
    next.L = getListItem(left, map);
    next.R = getListItem(right, map);
  }

  return map.get('AAA')!;
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
