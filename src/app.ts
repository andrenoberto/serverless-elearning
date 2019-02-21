import * as serverless from 'serverless-http';

import {Api} from '@src/api';

/* tslint:disable no-any */
export const handler: Promise<any> = serverless(new Api().app);
