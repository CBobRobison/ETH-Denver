import { sourceMap, sourceCode, bytecode, trace } from './exampleData';
import { parse } from './sourceMap';
import { lineNumbers, lineInfo } from './lineNumbers';
import { letIn, objectReduce, idLog } from './utils';

const srcmap = parse(sourceMap, sourceCode, bytecode);

objectReduce(trace, (cost, pc, gasCost) => idLog('ASD: ' + pc + ' ' + srcmap[pc]));

// objectReduce(trace, (cost, pc, gasCost) => idLog(srcmap[pc]));


const aggregateByLine = trace => 
    objectReduce(trace, (costs, pc, gasCost) =>
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
