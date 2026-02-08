import stylish from './stylish.js';
import plain from './plain.js';
import jsonFormatter from './json.js';

const format = (tree, formatName = 'stylish') => {
  switch (formatName) {
    case 'stylish':
      return stylish(tree);
    case 'plain':
      return plain(tree);
    case 'json':
      return jsonFormatter(tree);
    default:
      throw new Error(`Unknown format: ${formatName}`);
  }
};

export default format;