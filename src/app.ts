import {API} from '@src/api';

const serverless = require('serverless-http');

/* tslint:disable-next-line no-any */
export const handler: Promise<any> = serverless(new API().expressApp);
