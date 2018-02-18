import * as bodyParser from 'body-parser';
import * as express from 'express';
import * as jsSHA3 from 'js-sha3';
import * as _ from 'lodash';
import * as Web3 from 'web3';

import { addSourceMapAsync } from './compiler';
import { etherscan } from './etherscan';
import { bytecode, sourceCode, sourceMap } from './exampleData';
import { makeGasCostByPcToLines } from './gasCost';
import { trace } from './trace';
import { GasCostByPcBySignature, TxCountBySignature } from './types';

interface SignatureByHash {
    [sigHash: string]: string;
}

export const handleRequestAsync = async (address: string) => {
    const cacheOnly = false;
    console.log('Requesting the list of transactions');
    const transactions = (await etherscan.getTransactionsForAccountAsync(address)).slice(0, 10);
    const abis = await etherscan.getContractABIAsync(address);
    const functionAbis = _.filter(abis, (abi: Web3.AbiDefinition) => abi.type === 'function');
    const signatureByHash: SignatureByHash = {};
    _.map(functionAbis, (methodAbi: Web3.MethodAbi) => {
        const signature = `${methodAbi.name}(${_.map(
            methodAbi.inputs,
            (input: Web3.FunctionParameter) => input.type,
        ).join(',')})`;
        const sigHash = `0x${jsSHA3.keccak256(signature).substr(0, 8)}`;
        signatureByHash[sigHash] = signature;
    });
    console.log(`Fetched ${transactions.length} transactions`);
    const gasCostByPcBySignature: GasCostByPcBySignature = {};
    const txCountBySignature: TxCountBySignature = {};
    for (const transaction of transactions) {
        const sigHash = transaction.input.substr(0, 10);
        const signature = signatureByHash[sigHash];
        console.log(`Processing https://etherscan.io/tx/${transaction.hash}`);
        const conciseTxTrace = await trace.getTransactionConciseTraceAsync(transaction.hash, cacheOnly);
        const txGasCostByPc = trace.getGasCostByPcFromConciseTxTrace(conciseTxTrace);
        gasCostByPcBySignature['*'] = trace.combineGasCostByPc(gasCostByPcBySignature['*'], txGasCostByPc);
        txCountBySignature['*'] = (txCountBySignature['*'] || 0) + 1;
        gasCostByPcBySignature[signature] = trace.combineGasCostByPc(gasCostByPcBySignature[signature], txGasCostByPc);
        txCountBySignature[signature] = (txCountBySignature[signature] || 0) + 1;
    }
    const contractMetadata = await addSourceMapAsync(await etherscan.getContractInfoAsync(address));
    const gasCostByPcToLines = makeGasCostByPcToLines(contractMetadata);
    const gasCostByLineBySignature = _.mapValues(gasCostByPcBySignature, gasCostByPcToLines);
    const contractMetadataToReturn = contractMetadata;
    delete contractMetadataToReturn.bytecode;
    delete contractMetadataToReturn.sourcemap;
    const responseData = {
        ...contractMetadataToReturn,
        txCountBySignature,
        gasCostByLineBySignature,
    };
    return responseData;
};
