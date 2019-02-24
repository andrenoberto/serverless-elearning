import * as AWS from 'aws-sdk';

import {IConfig, IConfigDynamoDB} from '@models/interfaces/i-config';

export interface IMigration {
  up(params: IConfigDynamoDB): void;
  down(): void;
}
