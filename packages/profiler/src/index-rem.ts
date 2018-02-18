import { sourceMap, sourceCode, bytecode, trace } from './exampleData';
import { lineInfo } from './lineNumbers';
import { makeGasCostByPcToLines } from './gasCost';

const gasCostByPcToLines = makeGasCostByPcToLines(sourceMap, sourceCode, bytecode);

const data = gasCostByPcToLines(trace);
const lines = lineInfo(sourceCode);

lines.map((line, index) => {
    console.log(`${data[index] || 0}\t ${line.line}`);
})
