import { sourceMap, sourceCode, bytecode, trace } from './exampleData';
import { parse } from './sourceMap';
import { lineNumbers } from './lineNumbers';

const srcmap = parse(sourceMap, sourceCode, bytecode);

const result = trace
    .map(t => ({
        gasCost: t.gasCost,
        ...srcmap[t.pc]
    }))

console.log(result);
