import { parse } from './sourceMap';
import { GasCostByLine } from './types';
import { letIn, objectReduce } from './utils';

const aggregateByLine = srcmap => trace =>
    objectReduce(
        trace,
        (costs: GasCostByLine, pc, gasCost: number) =>
            letIn(srcmap[pc].source.lineStart, line => ({
                ...costs,
                [line]: gasCost + (costs[line] || 0),
            })),
        {},
    );

export const makeGasCostByPcToLines = (sourceMap, sourceCode, byteCode) =>
    aggregateByLine(parse(sourceMap, sourceCode, byteCode));
