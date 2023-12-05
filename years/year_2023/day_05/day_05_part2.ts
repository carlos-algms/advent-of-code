import cliProgress from 'cli-progress';

type Tuple = [
  sourceStart: number,
  sourceEnd: number,
  destinationStart: number,
  destinationEnd: number,
];

type Mapper = {
  'seed-to-soil': Tuple[];
  'soil-to-fertilizer': Tuple[];
  'fertilizer-to-water': Tuple[];
  'water-to-light': Tuple[];
  'light-to-temperature': Tuple[];
  'temperature-to-humidity': Tuple[];
  'humidity-to-location': Tuple[];
};

type Entry = {
  seed: number;
  soil: number;
  fertilizer: number;
  water: number;
  light: number;
  temperature: number;
  humidity: number;
  location: number;
};

type ReturnValue = {
  seeds: [seedStart: number, seedEnd: number][];
  entries: Entry[];
  lowestLocation: number | null;
};

/**
 * first line:
 * `seeds: 79 14 55 13`
 *
 * Then:
 * seed-to-soil map:
 * 50 98 2
 * ^  ^  ^ ---- Range length
 * |  | ------- Source range start
 * | ---------- Destination range start
 */
export function day05Part2(lines: string[]): ReturnValue {
  const [seedsLine, ...mapLines] = lines;
  const seeds = getSeeds(seedsLine);
  const map = buildMapper(mapLines);

  const result: ReturnValue = {
    seeds,
    entries: [],
    lowestLocation: null,
  };

  const bar = new cliProgress.SingleBar({}, cliProgress.Presets.shades_classic);
  const total = seeds.reduce((acc, seedRange) => acc + seedRange[1] + seedRange[0], 0);
  bar.start(total, 0);

  for (const seedRange of seeds) {
    for (let i = seedRange[0]; i <= seedRange[1]; i++) {
      bar.increment();
      const seed = i;
      const soil = findPosition(seed, map['seed-to-soil']);
      const fertilizer = findPosition(soil, map['soil-to-fertilizer']);
      const water = findPosition(fertilizer, map['fertilizer-to-water']);
      const light = findPosition(water, map['water-to-light']);
      const temperature = findPosition(light, map['light-to-temperature']);
      const humidity = findPosition(temperature, map['temperature-to-humidity']);
      const location = findPosition(humidity, map['humidity-to-location']);

      if (result.lowestLocation === null || location < result.lowestLocation) {
        result.lowestLocation = location;
      }
    }
  }

  bar.stop();

  return result;
}

function findPosition(source: number, tuples: Tuple[]): number {
  for (const tuple of tuples) {
    const [destinationStart, destinationEnd, sourceStart, sourceEnd] = tuple;

    if (sourceStart <= source && source <= sourceEnd) {
      const offset = source - sourceStart;
      const target = destinationStart + offset;

      if (target <= destinationEnd) {
        return target;
      }
    }
  }

  return source;
}

function getSeeds(line: string): ReturnValue['seeds'] {
  const seeds = line
    .split(' ')
    .map(Number)
    .filter((n) => !Number.isNaN(n));
  const seedsRanges: ReturnValue['seeds'] = [];

  for (let i = 0; i < seeds.length; i += 2) {
    const start = seeds[i];
    const end = start + seeds[i + 1] - 1; // it is inclusive
    seedsRanges.push([start, end]);
  }

  return seedsRanges;
}

function buildMapper(lines: string[]): Mapper {
  const map: Mapper = {
    'seed-to-soil': [],
    'soil-to-fertilizer': [],
    'fertilizer-to-water': [],
    'water-to-light': [],
    'light-to-temperature': [],
    'temperature-to-humidity': [],
    'humidity-to-location': [],
  };

  let key: keyof Mapper | null = null;
  for (const line of lines) {
    if (!line.length) {
      key = null;
      continue;
    }

    if (!key) {
      key = line.split(' ')[0] as keyof Mapper;
      continue;
    }

    const [source, destination, rangeLength] = line.split(' ').map(Number);
    const length = rangeLength - 1; // it is inclusive
    const tuple: Tuple = [source, source + length, destination, destination + length];
    map[key].push(tuple);
  }

  return map;
}
