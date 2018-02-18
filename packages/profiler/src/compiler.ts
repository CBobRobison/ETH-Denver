import * as solc from 'solc';

import { ContractInfo } from './types';
import { readHex } from './utils';

export const addSourceMap = (contractInfo: ContractInfo) => {
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
    const result = JSON.parse(solcInstance.compileStandardWrapper(JSON.stringify(input)));
    const runtime = result.contracts.contract[name].evm.deployedBytecode;

    // TODO: Verify bytecode (Someday)
    // assert(bytecode == readHex(runtime.object));

    return {
        ...contractInfo,
        bytecode: readHex(runtime.object),
        sourcemap: runtime.sourceMap,
    };
};
