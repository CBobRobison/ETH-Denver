import { idLog } from './utils';

// NOTE: Line numbers start at one

export const lineNumbers = (str: string) =>
    str
        .split('')
        .reduce((a, v, i) => [...a, a[i] + (v === '\n' ? 1 : 0)], [1])
        .slice(1);

export const toLines = (str: string) => ['', ...str.split('\n')];

export const getLineInfo = (sourceCode: string) =>
    toLines(sourceCode).map(line => ({
        line,
        isContract: /\bcontract\b/.test(line),
        isFunction: /\bfunction\b/.test(line),
    }));
