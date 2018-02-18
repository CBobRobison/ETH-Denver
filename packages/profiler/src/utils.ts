import * as fs from 'fs';

export const letIn = (x, f) => f(x);

export const idLog = <T>(x: T) => !console.log(x) && x;

export const objectReduce = (o, f, i) => Object.keys(o).reduce((a, k) => f(a, k, o[k]), i);

export const readTextFile = (fileName: string) => fs.readFileSync(fileName, 'utf8');

export const readHex = (str: string) => Uint8Array.from(Buffer.from(str, 'hex'));

export const readHexFile = (fileName: string) => readHex(readTextFile(fileName));

export const readJsonFile = (fileName: string) => JSON.parse(readTextFile(fileName));
