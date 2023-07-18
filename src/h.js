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

const decompose = (obj, path = "", result = [], stack = []) => {
  Object.entries(obj).forEach(([key, value]) => {
    const fullPath = path ? `${path}.${key}` : key;
    if (typeof value === "object" && value !== null) {
      // Передотвращение переходов по циклическим ссылкам
      const seenObject = stack.find((item) => item.value === value);
      if (seenObject) {
        value = `[Circular ${seenObject.fullPath}]`;
      } else {
        stack.push({ value, fullPath });
        decompose(value, fullPath, result, stack);
      }
    }

    result.push({
      parent: obj,
      key,
      value,
      path: fullPath,
    });
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
