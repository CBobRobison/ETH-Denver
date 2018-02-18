import 'isomorphic-fetch';
import * as queryString from 'query-string';
import { default as JSSoup } from 'jssoup';

import { ETHERSCAN_API_KEY } from './secrets';
import { Transaction } from './types';

import { readHex } from './utils';
import { decodeHTML } from 'entities';

export const etherscan = {
    async getTransactionsForAccountAsync(address: string): Promise<Transaction[]> {
        const startblock = 5102000;
        const params = {
            module: 'account',
            action: 'txlist',
            address,
            startblock,
            endblock: 100000000,
            apikey: ETHERSCAN_API_KEY,
        };
        const url = `http://api.etherscan.io/api?${queryString.stringify(params)}`;
        const result = await fetch(url);
        const jsonResponse = await result.json();
        const txs = jsonResponse.result;
        return txs;
    },
};


export const fetchContractInfo = async address => {
    const url = `https://etherscan.io/address/${address}`;
    console.log(`FETCH ${url}`);
    const response = await fetch(url);
    const body = await response.text();
    const soup = new JSSoup(body);
    const sourcecode = decodeHTML(soup
        .find('div', {id: 'dividcode'})
        .find('pre')
        .contents[0]
        .toString());
    const bytecodeHex = soup
        .find('div', {id: 'verifiedbytecode2'})
        .contents[0]
        .toString();
    const bytecode = readHex(bytecodeHex);
    const readTable = row => soup
        .find('div', {id: 'ContentPlaceHolder1_contractCodeDiv'})
        .findAll('td')[row * 2 + 1]
        .contents[0]
        .toString()
        .trim()
    const name = readTable(0);
    const solcVersion = readTable(1);
    const optimized = readTable(2) !== 'No';
    const optimizedRounds = parseInt(readTable(3));
    return {
        name, solcVersion, optimized, optimizedRounds, sourcecode, bytecode
    }
}
