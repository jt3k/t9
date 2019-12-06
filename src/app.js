import * as h from './h.js';
import { zip, unzip } from './tree.js';
import dict from './data/dict.js';
import onegin from './data/onegin.js';
import poemsEmerson from './data/poemsEmerson.js';

const data = dict.toLowerCase().split(/[\s\r\n]+/g);
const v = data.map(h.wordToGraphData).flat();
console.log({ data, v });

const keys = h.keysDict.join('').split('');
keys.forEach(key => {});

console.log('-==-=--=-=-==-=-=-=-');
const tree = data.reduce((memo, word) => {
	return zip(word, memo);
}, {});
console.log(tree);

const unzipped = unzip(tree);
console.log({ unzipped });

console.log('-==-=--=-=-==-=-=-=-');
const data1 = onegin.toLowerCase().split(/[\s\r\n]+/g);
const tree1 = data1.reduce((memo, word) => {
	return zip(word, memo);
}, {});
console.log(tree1);

const unzipped1 = unzip(tree1);
console.log({ unzipped1 });

console.log('-==-=--=-=-==-=-=-=-');
const data2 = poemsEmerson.toLowerCase().split(/[\s\r\n]+/g);
const tree2 = data2.reduce((memo, word) => {
	return zip(word, memo);
}, {});
console.log(tree2);

const unzipped2 = unzip(tree2);
console.log({ unzipped2 });
