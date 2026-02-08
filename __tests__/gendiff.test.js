import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs';
import genDiff from '../src/genDiff.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFixturePath = (filename) =>
  path.join(__dirname, '..', '__fixtures__', filename);

const readFixture = (filename) =>
  fs.readFileSync(getFixturePath(filename), 'utf-8');

const normalize = (str) => str.trim().replace(/\r\n/g, '\n');

const json1 = getFixturePath('file1.json');
const json2 = getFixturePath('file2.json');

const yaml1 = getFixturePath('filepath1.yml');
const yaml2 = getFixturePath('filepath2.yml');

describe('gendiff stylish format', () => {
  test('JSON stylish', () => {
    const result = genDiff(json1, json2, 'stylish');
    const expected = readFixture('expected.txt');

    expect(normalize(result)).toBe(normalize(expected));
  });

  test('YAML stylish', () => {
    const result = genDiff(yaml1, yaml2, 'stylish');
    const expected = readFixture('expected.txt');

    expect(normalize(result)).toBe(normalize(expected));
  });
});

describe('gendiff plain format', () => {
  test('JSON plain', () => {
    const result = genDiff(json1, json2, 'plain');
    const expected = readFixture('expected_plain.txt');

    expect(normalize(result)).toBe(normalize(expected));
  });

  test('YAML plain', () => {
    const result = genDiff(yaml1, yaml2, 'plain');
    const expected = readFixture('expected_plain.txt');

    expect(normalize(result)).toBe(normalize(expected));
  });
});
