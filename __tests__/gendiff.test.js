import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs';
import genDiff from '../src/index.js';
import parse from '../src/parsing.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

test('genDiff flat JSON', () => {
  const content1 = fs.readFileSync(getFixturePath('file1.json'), 'utf-8');
  const content2 = fs.readFileSync(getFixturePath('file2.json'), 'utf-8');
  
  const data1 = parse(content1, 'json');
  const data2 = parse(content2, 'json');

  const result = genDiff(data1, data2);
  const expected = fs.readFileSync(getFixturePath('expected.txt'), 'utf-8');

  const normalize = (str) => str.trim().replace(/\r\n/g, '\n');

  expect(normalize(result)).toBe(normalize(expected));
});
