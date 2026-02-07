import stylish from './stylish.js';

export default (data, format = 'stylish') => {
  switch (format) {
    case 'stylish':
      return stylish(data);
    default:
      throw new Error(`Unknown format: ${format}`);
  }
};
