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

export const decomposer = (parent, path = '', result = [], stack = []) => {
  /* Is DOM element */
  if (parent instanceof Element || parent instanceof Document) {
    parent = parent.childNodes;
  }

  Object.entries(parent).forEach(([key, value]) => {
    path = path ? `${path}.${key}` : key;
    if (typeof value === 'object' && value !== null) {
      // Предотвращение переходов по циклическим ссылкам
      const seenObject = stack.find((item) => item.value === value);
      if (seenObject) {
        value = `[Circular ${seenObject.path}]`;
      } else {
        stack.push({ value, path });
        decomposer(value, path, result, stack);
      }
    }

    result.push({ parent, key, value, path });
  });

  return result;
};

const gg = { a: 1, b: {}, bar: 3 };
gg.a = gg.b;
const o = {};
gg.c = o;
gg.b.d = o;
let dec = decompose(gg);
console.log(dec);
