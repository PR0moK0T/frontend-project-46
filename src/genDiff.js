import fs from 'fs';
import path from 'path';
import parse from './parsing.js';
import buildDiff from './buildDiff.js';
import format from './formatters/index.js';

const getFormat = (filepath) => path.extname(filepath).slice(1);

const readFile = (filepath) =>
  fs.readFileSync(filepath, 'utf-8');

const genDiff = (filepath1, filepath2, formatter = 'stylish') => {
  const data1 = parse(readFile(filepath1), getFormat(filepath1));
  const data2 = parse(readFile(filepath2), getFormat(filepath2));

  const diffTree = buildDiff(data1, data2);

  return format(diffTree, formatter);
};

export default genDiff;
