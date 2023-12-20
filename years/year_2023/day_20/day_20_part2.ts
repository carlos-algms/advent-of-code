/**
 *
 */
export default function day20Part2(input: string, times = 1000): number {
  const map = buildMap(input);
  const queue: [from: string, to: string, value: boolean][][] = [];

  let countHigh = 0;
  let countLow = 0;

  const broadcaster = map.get('broadcaster')!;

  for (let i = 0; i < times; i++) {
    const pulses = broadcaster.emit(true, broadcaster.name);
    queue.push(pulses);
    countLow++;

    do {
      const step = queue.shift()!;

      for (const pulse of step) {
        const [from, to, value] = pulse;

        if (value) {
          countHigh++;
        } else {
          countLow++;
        }

        const emitter = map.get(to)!;

        if (!emitter) {
          continue;
        }

        const pulses = emitter.emit(value, from);
        queue.push(pulses);
      }
    } while (queue.length);
  }

  const result = countHigh * countLow;
  return result;
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
