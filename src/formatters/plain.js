const isObject = (value) => value !== null && typeof value === 'object';

const formatValue = (value) => {
  if (isObject(value)) return '[complex value]';
  if (typeof value === 'string') return `'${value}'`;
  if (value === null) return 'null';
  return String(value);
};

const buildPlain = (tree, parent = '') => {
  const lines = tree.flatMap((node) => {
    const property = parent ? `${parent}.${node.key}` : node.key;

    switch (node.type) {
      case 'added':
        return `Property '${property}' was added with value: ${formatValue(node.value)}`;

      case 'removed':
        return `Property '${property}' was removed`;

      case 'changed':
        return `Property '${property}' was updated. From ${formatValue(node.oldValue)} to ${formatValue(node.newValue)}`;

      case 'nested':
        return buildPlain(node.children, property);

      case 'unchanged':
        return [];

      default:
        throw new Error(`Unknown type: ${node.type}`);
    }
  });

  return lines.join('\n');
};

export default buildPlain;
