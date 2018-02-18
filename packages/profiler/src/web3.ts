import { Web3Wrapper } from '@0xproject/web3-wrapper';
import * as Web3 from 'web3';

const web3 = new Web3(new Web3.providers.HttpProvider('https://mainnet.0xproject.com'));
export const web3Wrapper = new Web3Wrapper(web3.currentProvider);
