import {API} from '@src/api';

const serverless = require('serverless-http');

/* tslint:disable no-any */
export const handler: Promise<any> = serverless(new API().expressApp);
