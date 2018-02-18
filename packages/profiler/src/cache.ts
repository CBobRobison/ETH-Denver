import * as fs from 'fs-extra';
import * as jsSHA3 from 'js-sha3';

export const cache = <T, U>(folder: string, f: (arg: T) => U) => {
    const cachedFAsync = async (arg: T) => {
        const stringifiedArg = JSON.stringify(arg);
        const argHash = jsSHA3.keccak256(stringifiedArg);
        const cachePath = `./${folder}/${argHash}.json`;
        const cached = await fs.pathExists(cachePath);
        if (cached) {
            const result = await fs.readJSON(cachePath);
            return result;
        } else {
            const result = f(arg);
            await fs.writeJSON(cachePath, result);
            return result;
        }
    };
    return cachedFAsync;
};
