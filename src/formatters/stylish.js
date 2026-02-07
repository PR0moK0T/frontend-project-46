const indentSize = 4;

const stringify = (value, depth) => {
  if (typeof value !== 'object' || value === null) {
    return String(value);
  }

  const indent = ' '.repeat(depth * indentSize);
  const bracketIndent = ' '.repeat((depth - 1) * indentSize);

  const lines = Object.entries(value)
    .map(([key, val]) => `${indent}${key}: ${stringify(val, depth + 1)}`);

  return ['{', ...lines, `${bracketIndent}}`].join('\n');
};

const formatStylish = (tree, depth = 1) => {
  const indent = ' '.repeat(depth * indentSize - 2);
  const bracketIndent = ' '.repeat((depth - 1) * indentSize);

  const lines = tree.flatMap((node) => {
    switch (node.type) {
      case 'nested':
        return `${indent}  ${node.key}: ${formatStylish(node.children, depth + 1)}`;

      case 'added':
        return `${indent}+ ${node.key}: ${stringify(node.value, depth + 1)}`;

      case 'removed':
        return `${indent}- ${node.key}: ${stringify(node.value, depth + 1)}`;

      case 'unchanged':
        return `${indent}  ${node.key}: ${stringify(node.value, depth + 1)}`;

      case 'changed':
        return [
          `${indent}- ${node.key}: ${stringify(node.oldValue, depth + 1)}`,
          `${indent}+ ${node.key}: ${stringify(node.newValue, depth + 1)}`,
        ];
    }
  });

  return ['{', ...lines, `${bracketIndent}}`].join('\n');
};

export default formatStylish;
