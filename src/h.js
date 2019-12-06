// text to t9 graph
export const keysDict = [
  '',
  'абвг', // 2
  'деёжз', // 3
  'ийкл', // 4
  'мноп', // 5
  'рсту', // 6
  'фхцч', // 7
  'шщъы', // 8
  'ьэюя', // 9
  '', // *
  ' ', // 0
  '' // #
];

export const keysHash = keysDict.reduce((memo, str, num) => {
  str.split('').forEach(item => {
    memo[item] = num;
  });
  return memo;
}, {});

/* vertex:
  {
    letter,
    number,
    index,
  }
 */
export const wordToGraphData = (str, initialGraph = {}) =>
  Object.entries(str).map(([index, letter]) => ({
    letter,
    number: keysHash[letter],
    index: Number(index),
  }));

export const decomposer = (obj, _path = '', _result = {}) => {
  Object.entries(obj).forEach(async ([key, value]) => {
    const path = _path + '.' + key;
    _result[path] = {
      parent: obj,
      key,
      value,
      path
    };

    const isObj = typeof value === 'object' && value !== null;
    if (isObj) {
      decomposer(value, path, _result);
    }
  });
  return _result;
};
