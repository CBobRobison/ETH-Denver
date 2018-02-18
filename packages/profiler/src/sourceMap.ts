import { programCounters } from './instructions';
import { getLineInfo, lineNumbers } from './lineNumbers';
import { idLog, letIn } from './utils';

// Takes a sourcemap string
// The solidity sourcemap format is documented here: [docs][doc].
//  [doc]: https://github.com/ethereum/solidity/blob/develop/docs/miscellaneous.rst#source-mappings
const baseParse = srcmap =>
    srcmap
        .split(';')
        .map(l => l.split(':'))
        .map(([s, l, f, j]) => ({ s: s === '' ? undefined : s, l, f, j }))
        .reduce(
            ([last, ...list], { s, l, f, j }) => [
                {
                    s: parseInt(s || last.s, 10),
                    l: parseInt(l || last.l, 10),
                    f: parseInt(f || last.f, 10),
                    j: j || last.j,
                },
                last,
                ...list,
            ],
            [{}],
        )
        .reverse()
        .slice(1)
        .map(({ s, l, f, j }, index) => ({
            instruction: {
                index,
                jumpType: j === 'i' ? 'call' : j === 'o' ? 'return' : j === '-' ? 'regular' : undefined,
            },
            source: {
                fileIndex: f,
                offset: s,
                length: l,
                end: s + l,
            },
        }));

const addLineNumbers = sourceCode => sourceMap =>
    letIn(lineNumbers(sourceCode), lines =>
        sourceMap.map(v => ({
            ...v,
            source: {
                ...v.source,
                lineStart: lines[v.source.offset],
                lineEnd: lines[v.source.end],
            },
        })),
    );

const addLine = sourceCode => sourceMap =>
    letIn(getLineInfo(sourceCode), lineInfo =>
        sourceMap.map(v => ({
            ...v,
            line: lineInfo[v.source.lineStart],
        })),
    );

const addProgramCounters = bytecode => sourceMap =>
    letIn(programCounters(bytecode), pcs =>
        sourceMap.map(v => ({
            ...v,
            instruction: {
                ...v.instruction,
                ...pcs[v.instruction.index],
            },
        })),
    );

const indexByProgramCounters = sourceMap =>
    sourceMap.reduce(
        (a, v) => ({
            ...a,
            [v.instruction.programCounter]: v,
        }),
        {},
    );

export const parse = (sourceMap, sourceCode, bytecode) =>
    [
        _ => baseParse(sourceMap),
        addLineNumbers(sourceCode),
        addLine(sourceCode),
        addProgramCounters(bytecode),
        indexByProgramCounters,
    ].reduce((v, f) => f(v), undefined);
