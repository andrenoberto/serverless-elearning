import { Api } from '@src/api';

const serverless = require('serverless-http');

export const handler = serverless(Api);
