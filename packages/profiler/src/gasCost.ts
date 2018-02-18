import { lineInfo, lineNumbers } from './lineNumbers';
import { parse } from './sourceMap';
import { idLog, letIn, objectReduce } from './utils';

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

export const makeGasCostByPcToLines = (sourceMap, sourceCode, byteCode) =>
    aggregateByLine(parse(sourceMap, sourceCode, byteCode));
