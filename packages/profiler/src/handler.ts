import * as bodyParser from 'body-parser';
import * as express from 'express';
import * as _ from 'lodash';

import { etherscan } from './etherscan';
import { bytecode, sourceCode, sourceMap } from './exampleData';
import { makeGasCostByPcToLines } from './gasCost';
import { trace } from './trace';
import { GasCostByPc } from './types';

export const handleRequestAsync = async (address: string) => {
    const cacheOnly = true;
    const transactions = await etherscan.getTransactionsForAccountAsync(address);
    console.log(`Fetched ${transactions.length} transactions`);
    let gasCostByPc: GasCostByPc = {};
    for (const transaction of transactions) {
        console.log(`Processing https://etherscan.io/tx/${transaction.hash}`);
        const conciseTxTrace = await trace.getTransactionConciseTraceAsync(transaction.hash, cacheOnly);
        const txGasCostByPc = trace.getGasCostByPcFromConciseTxTrace(conciseTxTrace);
        gasCostByPc = trace.combineGasCostByPc(gasCostByPc, txGasCostByPc);
    }
    const gasCostByPcToLines = makeGasCostByPcToLines(sourceMap, sourceCode, bytecode);
    const gasCostByLine = gasCostByPcToLines(gasCostByPc);
    const responseData = {
        sourceCode,
        gasCostByLine,
    };
    return responseData;
};
