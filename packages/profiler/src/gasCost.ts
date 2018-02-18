import { sourceMap, sourceCode, bytecode, trace } from './exampleData';
import { parse } from './sourceMap';
import { lineNumbers, lineInfo } from './lineNumbers';
import { letIn, objectReduce, idLog } from './utils';

const aggregateByLine = srcmap => trace => 
    objectReduce(trace, (costs, pc, gasCost) =>
        letIn(pc in srcmap ? srcmap[pc].source.lineStart : 0, line => ({
            ...costs,
            [line]: gasCost + (costs[line] || 0)
        })),
    {});

export const makeGasCostByPcToLines = (contract) =>
    aggregateByLine(parse(contract))
