export const zip = (word = '', tree = Object.create(null)) => {
  let cur = tree;
  Array.from(word).forEach((letter, index) => {
    if (cur[letter]) {
      cur = cur[letter];
      return;
    }

    cur = cur[letter] = Object.create(null);

    if (word.length === index + 1) {
      cur.terminator = true;
    }
  });

  return tree;
};

export const unzip = (
  { terminator, ...tree },
  _data = {
    results: [],
    word: ''
  }
) => {
  if (terminator) {
    _data.results.push(_data.word);
  }
  const { word } = _data;
  Object.entries(tree).forEach(([letter, item]) => {
    _data.word = word + letter;
    unzip(item, _data);
  });

  return _data.results;
};