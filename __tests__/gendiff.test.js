import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs';
import genDiff from '../src/genDiff.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFixturePath = (filename) =>
  path.join(__dirname, '..', '__fixtures__', filename);

test('genDiff JSON', () => {
  const filepath1 = getFixturePath('file1.json');
  const filepath2 = getFixturePath('file2.json');

  const result = genDiff(filepath1, filepath2);
  const expected = fs.readFileSync(getFixturePath('expected.txt'), 'utf-8');

  const normalize = (str) => str.trim().replace(/\r\n/g, '\n');

  expect(normalize(result)).toBe(normalize(expected));
});

test('genDiff YAML', () => {
  const filepath1 = getFixturePath('filepath1.yml');
  const filepath2 = getFixturePath('filepath2.yml');

  const result = genDiff(filepath1, filepath2);
  const expected = fs.readFileSync(getFixturePath('expected.txt'), 'utf-8');

  const normalize = (str) => str.trim().replace(/\r\n/g, '\n');

  expect(normalize(result)).toBe(normalize(expected));
});
