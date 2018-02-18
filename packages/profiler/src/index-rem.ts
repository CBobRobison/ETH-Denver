import { trace } from './exampleData';
import { fetchContractInfo } from './etherscan';
import { addSourceMap } from './compiler'
import { makeGasCostByPcToLines } from './gasCost'

(async () => {
    
    const address = '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2';

    const contract = addSourceMap(await fetchContractInfo(address));

    const gasCostByPcToLines = makeGasCostByPcToLines(contract);

    const gasCost = gasCostByPcToLines(trace);
    
    ['', ...contract.sourcecode.split('\n')].map((line, index) =>
        console.log(`${gasCost[index]||0}\t${line}`))
    
})();
