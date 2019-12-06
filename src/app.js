import * as h from './h.js';
import dict from './dict.js';

const data = dict.toLowerCase().split(/(\n|\s|\r)+/g).map(h.wordToGraphData).flat()


console.log({h});
console.log(data);

const keys = h.keysDict.join('').split('');

keys.forEach(key => {})