import * as fs from 'fs-extra';
import * as jsSHA3 from 'js-sha3';
import * as solc from 'solc';

import { ContractInfo } from './types';
import { readHex } from './utils';

const compileAsync = async (solcInstance: any, compilerOptions: any) => {
    const stringifiedCompilerOptions = JSON.stringify(compilerOptions);
    const compilerOptionsHash = jsSHA3.keccak256(stringifiedCompilerOptions);
    const cachePath = `./compiled_contract_cache/${compilerOptionsHash}.json`;
    const cached = await fs.pathExists(cachePath);
    if (cached) {
        const compilationResult = await fs.readJSON(cachePath);
        return compilationResult;
    } else {
        const compilationResult = JSON.parse(solcInstance.compileStandardWrapper(stringifiedCompilerOptions));
        await fs.writeJSON(cachePath, compilationResult);
        return compilationResult;
    }
};

export const addSourceMapAsync = async (contractInfo: ContractInfo) => {
    const { name, sourcecode, bytecode, solcVersion, optimized, optimizedRounds } = contractInfo;

    const solcBinPath = `../../deployer/src/solc/solc_bin/soljson-${solcVersion}.js`;
    const solcBin = require(solcBinPath);
    const solcInstance = solc.setupMethods(solcBin);

    const input = {
        language: 'Solidity',
        sources: {
            contract: {
                content: sourcecode,
            },
        },
        settings: {
            metadata: {
                useLiteralContent: true,
            },
            libraries: {},
            optimizer: {
                enabled: optimized,
                runs: optimized ? optimizedRounds : undefined,
            },
            outputSelection: {
                contract: {
                    [name]: ['evm.deployedBytecode.object', 'evm.deployedBytecode.sourceMap'],
                },
            },
        },
    };
    const result = await compileAsync(solcInstance, input);
    const runtime = result.contracts.contract[name].evm.deployedBytecode;

    // TODO: Verify bytecode (Someday)
    // assert(bytecode == readHex(runtime.object));

    return {
        ...contractInfo,
        bytecode: readHex(runtime.object),
        sourcemap: runtime.sourceMap,
    };
};
