import * as bodyParser from 'body-parser';
import * as express from 'express';
import * as _ from 'lodash';

import { etherscan } from './etherscan';
import { sourceMapper } from './sourcemapper';
import { trace } from './trace';
import { GasCostByPc } from './types';

const app = express();
app.use(bodyParser.json()); // for parsing application/json
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

app.get('/profiler/:address', async (req: express.Request, res: express.Response) => {
    const address = req.params.address;
    const cacheOnly = true;
    const transactions = await etherscan.getTransactionsForAccountAsync(address);
    console.log(`Fetched ${transactions.length} transactions`);
    let gasCostByPc: GasCostByPc = {};
    for (const transaction of transactions) {
        console.log(`Processing https://etherscan.io/tx/${transaction.hash}`);
        const conciseTxTrace = await trace.getTransactionConciseTraceAsync(transaction.hash, cacheOnly);
        const txGasCostByPc = trace.getGasCostByPcFromConciseTxTrace(conciseTxTrace);
        gasCostByPc = trace.combineGasCostByPc(gasCostByPc, txGasCostByPc);
    }
    const gasCostByLine = sourceMapper.getGasCostByPcToGasCostByLine(gasCostByPc);
    res.json(gasCostByLine);
});

const port = process.env.PORT || 3000;
app.listen(port);
