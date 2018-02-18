import { idLog } from './utils';

// NOTE: Line numbers start at one

export const lineNumbers = string =>
    string
        .split('')
        .reduce((a, v, i) => [...a, a[i] + (v == '\n' ? 1 : 0)], [1])
        .slice(1);

export const toLines = string => ['', ...string.split('\n')];

export const lineInfo = string =>
    toLines(string).map(line => ({
        line,
        isContract: /\bcontract\b/.test(line),
        isFunction: /\bfunction\b/.test(line),
    }));
