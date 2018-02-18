export interface GasCostByPc {
    [pc: number]: number;
}

export interface GasCostByPcBySignature {
    [signature: string]: GasCostByPc;
}

export interface TxCountBySignature {
    [signature: string]: number;
}

export interface GasCostByLine {
    [line: number]: number;
}

export interface Transaction {
    blockNumber: string;
    blockHash: string;
    timeStamp: string;
    hash: string;
    nonce: string;
    transactionIndex: string;
    from: string;
    to: string;
    value: string;
    gas: string;
    gasPrice: string;
    input: string;
    contractAddress: string;
    cumulativeGasUsed: string;
    txreceipt_status: string;
    gasUsed: string;
    confirmations: string;
    isError: string;
}
