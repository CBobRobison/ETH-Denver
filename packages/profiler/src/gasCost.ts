import { cache } from './cache';
import { parse } from './sourceMap';
import { GasCostByLine } from './types';
import { letIn, objectReduce } from './utils';

const aggregateByLine = srcmap => trace =>
    objectReduce(
        trace,
        (costs: GasCostByLine, pc, gasCost: number) =>
            letIn(pc in srcmap ? srcmap[pc].source.lineStart : 0, line => ({
                ...costs,
                [line]: gasCost + (costs[line] || 0),
            })),
        {},
    );

export const makeGasCostByPcToLinesAsync = async contract =>
    aggregateByLine(await cache('parsed_contract_cache', parse)(contract));
