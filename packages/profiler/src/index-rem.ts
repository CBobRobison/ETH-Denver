import { bytecode, sourceCode, sourceMap, trace } from './exampleData';
import { makeGasCostByPcToLines } from './gasCost';
import { lineInfo } from './lineNumbers';

const gasCostByPcToLines = makeGasCostByPcToLines(sourceMap, sourceCode, bytecode);

const data = gasCostByPcToLines(trace);
const lines = lineInfo(sourceCode);

lines.map((line, index) => {
    console.log(`${data[index] || 0}\t ${line.line}`);
});
