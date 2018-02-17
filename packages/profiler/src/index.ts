import { sourceMap, sourceCode, bytecode, trace } from './exampleData';
import { parse } from './sourceMap';
import { lineNumbers, lineInfo } from './lineNumbers';
import { letIn } from './utils';

const srcmap = parse(sourceMap, sourceCode, bytecode);

const result = trace
    .map(t => ({
        gasCost: t.gasCost,
        ...srcmap[t.pc]
    }))

const aggregateByLine = trace => trace
    .reduce((costs, {pc, gasCost}) =>
        letIn(srcmap[pc].source.lineStart, line => ({
            ...costs,
            [line]: gasCost + (costs[line] || 0)
        })),
    {});

const data = aggregateByLine(trace);
const lines = lineInfo(sourceCode);

lines.map((line, index) => {
    console.log(`${data[index] || 0}\t ${line.line}`);
})


console.log(aggregateByLine(trace));
