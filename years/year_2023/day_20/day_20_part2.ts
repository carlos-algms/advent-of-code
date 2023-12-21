/**
 *
 */
export default function day20Part2(input: string): number {
  const map = buildMap(input);
  const queue: [from: string, to: string, value: boolean][][] = [];

  let buttonPresses = 0;
  let foundTarget = false;
  const target = 'rx';

  const broadcaster = map.get('broadcaster')!;
  let feed: string = '';

  // first find which emitter feeds into the target
  map.forEach((emitter) => {
    if (emitter.to.includes(target)) {
      if (feed) {
        throw new Error(`More than one emitter feeds into ${target}`);
      }

      feed = emitter.name;
    }
  });
  const seen: Record<string, number> = {};

  // then find who feeds to the feed
  map.forEach((emitter, key) => {
    if (emitter.to.includes(feed)) {
      seen[key] = 0;
    }
  });

  const cycleLengths: Record<string, number> = {};

  while (!foundTarget) {
    buttonPresses++;

    const pulses = broadcaster.emit(true, broadcaster.name);
    queue.push(pulses);

    do {
      const step = queue.shift()!;

      for (const pulse of step) {
        const [from, to, value] = pulse;
        const emitter = map.get(to)!;

        if (!emitter) {
          continue;
        }

        if (emitter.name === feed && value === true) {
          seen[from]++;

          if (!cycleLengths[from]) {
            cycleLengths[from] = buttonPresses;
          } else {
            if (buttonPresses === seen[from] * cycleLengths[from])
              throw new Error(`Duplicated Cycle detected for ${from}`);
          }

          if (Object.values(seen).every(Boolean)) {
            let x = Object.values(cycleLengths).reduce((a, b) => (a * b) / Math.ceil(gcd(a, b)), 1);
            return x;
          }
        }

        const pulses = emitter.emit(value, from);
        queue.push(pulses);
      }
    } while (queue.length && !foundTarget);
  }

  return 0;
}

// greatest common divisor
function gcd(a: number, b: number) {
  if (!b) {
    return a;
  }

  return gcd(b, a % b);
}

/**
 * ```text
 * broadcaster -> a, b, c
%a -> b
%b -> c
%c -> inv
&inv -> a
```
*/
function buildMap(input: string) {
  const lines = input.split('\n');

  const map: Map<string, Emitter> = new Map();
  const conjunctions: Map<string, Emitter> = new Map();

  for (const line of lines) {
    const [key, to] = line.split(' -> ');

    if (key[0] === '%') {
      const emitter: Emitter = {
        name: key.slice(1),
        value: false,
        to: to.split(', '),
        from: {},
        emit(pulseReceived: boolean) {
          if (pulseReceived) {
            return [];
          }
          this.value = !this.value;
          const { value, name } = this;
          return this.to.map((to) => [name, to, value]);
        },
      };
      map.set(emitter.name, emitter);
    } else if (key[0] === '&') {
      const emitter: Emitter = {
        name: key.slice(1),
        value: false,
        to: to.split(', '),
        from: {},
        emit(pulseReceived: boolean, from: string) {
          this.from[from] = pulseReceived;
          const received = Object.values(this.from);
          // high pulses for all inputs, it sends a low pulse; otherwise, it sends a high pulse.
          const value = !received.length ? true : !received.every((v) => v);
          const { name } = this;
          return this.to.map((to) => [name, to, value]);
        },
      };
      map.set(emitter.name, emitter);
      conjunctions.set(emitter.name, emitter);
    } else if (key === 'broadcaster') {
      const emitter: Emitter = {
        name: 'broadcaster',
        value: false,
        to: to.split(', '),
        from: {},
        emit() {
          const { name } = this;
          return this.to.map((to) => [name, to, false]);
        },
      };
      map.set(emitter.name, emitter);
    } else {
      throw new Error(`Unknown key: ${line}`);
    }
  }

  map.forEach((emitter, key) => {
    if (!conjunctions.has(key)) {
      if (!conjunctions.has(key)) {
        emitter.to.forEach((to) => {
          const c = conjunctions.get(to);
          if (c) {
            c.from[key] = false;
          }
        });
      }
    }
  });

  return map;
}

type Emitter = {
  name: string;
  value: boolean;
  to: string[];
  from: Record<string, boolean>;
  emit(received: boolean, from: string): [from: string, to: string, value: boolean][];
};
