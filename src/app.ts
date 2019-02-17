import * as serverless from 'serverless-http';

import {Api} from '@src/api';

export const handler = serverless(new Api().app);
