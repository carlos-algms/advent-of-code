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
 * |  | ------- Source range start (seed)
 * | ---------- Destination range start (soil)
 */
export function day05Part2(lines: string[]): ReturnValue {
  const [seedsLine, ...mapLines] = lines;
  const seeds = getSeeds(seedsLine);
  const map = buildMapper(mapLines);

  const result: ReturnValue = {
    seeds,
    lowestLocation: null,
  };

  const total = map['humidity-to-location'].reduce((acc, [s, e]) => acc + (e - s), 0);
  const bar = new cliProgress.SingleBar(
    {
      format: '{bar} {percentage}% | {duration_formatted} | ETA: {eta}s | {value}/{total}',
    },
    cliProgress.Presets.shades_classic,
  );
  bar.start(total, 0);

  for (let i = 0; i <= total; i++) {
    bar.increment();
    const location = i;
    const humidity = findPositionReverse(location, map['humidity-to-location']);
    const temperature = findPositionReverse(humidity, map['temperature-to-humidity']);
    const light = findPositionReverse(temperature, map['light-to-temperature']);
    const water = findPositionReverse(light, map['water-to-light']);
    const fertilizer = findPositionReverse(water, map['fertilizer-to-water']);
    const soil = findPositionReverse(fertilizer, map['soil-to-fertilizer']);
    const seed = findPositionReverse(soil, map['seed-to-soil']);

    for (const seedRange of seeds) {
      if (seedRange[0] <= seed && seed <= seedRange[1]) {
        result.lowestLocation = location;
        bar.stop();
        return result;
      }
    }
  }

  bar.stop();
  return result;
}

function findPositionReverse(destination: number, tuples: Tuple[]) {
  for (const tuple of tuples) {
    const [destinationStart, destinationEnd, sourceStart, sourceEnd] = tuple;

    if (destinationStart <= destination && destination <= destinationEnd) {
      const offset = destination - destinationStart;
      const target = sourceStart + offset;

      if (target <= sourceEnd) {
        return target;
      }
    }
  }

  return destination;
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

    const [destination, source, rangeLength] = line.split(' ').map(Number);
    const length = rangeLength - 1; // it is inclusive
    const tuple: Tuple = [destination, destination + length, source, source + length];
    map[key].push(tuple);
  }

  return map;
}
