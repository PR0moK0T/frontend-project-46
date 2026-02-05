import _ from 'lodash';

const genDiff = (data1, data2) => {
  const keys = _.sortBy(_.union(Object.keys(data1), Object.keys(data2)));

  const lines = keys.map((key) => {
    const value1 = data1[key];
    const value2 = data2[key];

    if (!_.has(data1, key)) {
      return `  + ${key}: ${value2}`;
    }
    if (!_.has(data2, key)) {
      return `  - ${key}: ${value1}`;
    }
    if (value1 !== value2) {
      return `  - ${key}: ${value1}\n  + ${key}: ${value2}`;
    }

    return `    ${key}: ${value1}`;
  });

  return `{\n${lines.join('\n')}\n}`;
};

export default genDiff;
