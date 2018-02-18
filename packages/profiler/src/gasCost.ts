import { sourceMap, sourceCode, bytecode, trace } from './exampleData';
import { parse } from './sourceMap';
import { lineNumbers, lineInfo } from './lineNumbers';
import { letIn, objectReduce, idLog } from './utils';

const aggregateByLine = srcmap => trace =>
    objectReduce(
        trace,
        (costs, pc, gasCost) =>
            letIn(srcmap[pc].source.lineStart, line => ({
                ...costs,
                [line]: gasCost + (costs[line] || 0),
            })),
        {},
    );

export const makeGasCostByPcToLines = (...parseArgs) => aggregateByLine(parse(...parseArgs));
