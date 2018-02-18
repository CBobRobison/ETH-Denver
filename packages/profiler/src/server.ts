import * as bodyParser from 'body-parser';
import * as express from 'express';
import * as _ from 'lodash';

import { etherscan } from './etherscan';
import { handleRequestAsync } from './handler';
import { trace } from './trace';

const app = express();
app.use(bodyParser.json()); // for parsing application/json
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

app.get('/profiler/:address', async (req: express.Request, res: express.Response) => {
    const address = req.params.address;
    const gasCostByLine = await handleRequestAsync(address);
    res.json(gasCostByLine);
});

const port = process.env.PORT || 3000;
app.listen(port);
