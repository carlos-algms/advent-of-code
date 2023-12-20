/**
 *
 */
export default function day19Part1(input: string): number {
  const [instructionsRaw, piecesRaw] = input.split('\n\n');
  const pieces = buildPieces(piecesRaw);
  const instructions = buildInstructions(instructionsRaw);

  const sum = pieces.reduce((acc, piece) => {
    return acc + process('in', piece, instructions);
  }, 0);

  return sum;
}

function process(key: string, piece: Record<string, number>, instructions: Instructions): number {
  const comparisons = instructions.get(key);
  if (!comparisons) {
    throw new Error(`No instruction for key ${key}`);
  }

  for (const comparison of comparisons) {
    if (comparison === true) {
      return sumPieceTotal(piece);
    }

    if (comparison === false) {
      return 0;
    }

    if (typeof comparison === 'string') {
      return process(comparison, piece, instructions);
    }

    const nextKey = comparison(piece);

    if (typeof nextKey === 'string') {
      return process(nextKey, piece, instructions);
    }

    if (nextKey === true) {
      return sumPieceTotal(piece);
    }
  }

  return 0;
}

function buildPieces(piecesRaw: string): Record<string, number>[] {
  const pieces = piecesRaw.split('\n').map((piece) => {
    const json = piece.replaceAll('=', ':').replace(/([a-z])+/gi, '"$1"');
    return JSON.parse(json);
  });

  return pieces;
}

function sumPieceTotal(piece: Record<string, number>): number {
  return Object.values(piece).reduce((acc, v) => acc + v, 0);
}

/**
 * @returns `true` if the piece should be auto accepted, `string` is the next key to go to
 */
type Validator = (piece: Record<string, number>) => boolean | string;

type Comparisons = Validator | boolean | string;

type Instructions = Map<string, Comparisons[]>;

function buildInstructions(raw: string): Instructions {
  const instructions: Instructions = new Map();

  /*
   each instruction looks like this:
   px{a<2006:qkq,m>2090:A,rfg}
   pv{a>1716:R,A}
  */
  raw.split('\n').forEach((instruction) => {
    const [key, steps] = instruction.replace('}', '').split('{');

    const comparisons = steps.split(',').map<Comparisons>((step) => {
      let [comparison, to] = step.split(':');

      if (!to) {
        if (comparison === 'A') {
          return true;
        } else if (comparison === 'R') {
          return false;
        }
        // it is a goto with only a key
        return comparison;
      }

      const prop = comparison[0];
      const operator = comparison[1];
      const value = Number(comparison.slice(2));

      if (operator === '<') {
        return (piece) => {
          const v = piece[prop];
          if (v < value) {
            if (to === 'A') {
              return true;
            } else if (to === 'R') {
              return false;
            }
            return to;
          }
          return false;
        };
      }

      return (piece) => {
        const v = piece[prop];
        if (v > value) {
          if (to === 'A') {
            return true;
          } else if (to === 'R') {
            return false;
          }
          return to;
        }
        return false;
      };
    });

    instructions.set(key, comparisons);
  });

  return instructions;
}
