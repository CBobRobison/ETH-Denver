import * as fs from 'fs';

export const letIn = (x, f) => f(x);

export const idLog = x => !console.log(x) && x;

export const objectReduce = (o, f, i) => Object.keys(o).reduce((a, k) => f(a, k, o[k]), i);

export const readTextFile = fileName => fs.readFileSync(fileName, 'utf8');

export const readHex = string => Uint8Array.from(Buffer.from(string, 'hex'));

export const readHexFile = fileName => readHex(readTextFile(fileName));

export const readJsonFile = fileName => JSON.parse(readTextFile(fileName));
