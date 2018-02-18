import { readTextFile, readHex, readJsonFile } from './utils';

// Wrapped ETH 9:
// Contract Name: 	WETH9
// Compiler Version: 	v0.4.19+commit.c4cbbb05
// Optimization Enabled: 	No
// Runs (Optimiser):  	200 

export const address = '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2';

// solc ./WETH.sol --combined-json bin-runtime,srcmap-runtime > ./WETH.jsonexport
const compiledJson = readJsonFile('WETH.json').contracts["./WETH.sol:WETH9"];

export const bytecode = readHex(compiledJson["bin-runtime"]);

export const sourceMap = compiledJson["srcmap-runtime"];

export const sourcecode = readTextFile("WETH.sol");

export const trace = readJsonFile('aggregate.json');
