import { Web3Wrapper } from '@0xproject/web3-wrapper';
import * as Web3 from 'web3';

const web3 = new Web3(new Web3.providers.HttpProvider('http://node.web3api.com:8545'));
export const web3Wrapper = new Web3Wrapper(web3.currentProvider);
