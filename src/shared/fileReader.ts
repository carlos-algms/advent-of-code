import fs from 'fs';
import readline from 'readline';

export function fileReader(fsPath: string): Promise<string[]> {
  return new Promise((resolve, reject) => {
    const validLines: string[] = [];

    const inputStream = fs.createReadStream(fsPath);

    const rl = readline.createInterface({
      input: inputStream,
      terminal: false,
    });

    rl.on('line', (line) => {
      validLines.push(line);
    });

    rl.on('error', (error) => {
      reject(error);
    });

    rl.on('close', () => {
      resolve(validLines);
    });
  });
}
