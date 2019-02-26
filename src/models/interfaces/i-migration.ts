import {IConfigDynamoDB} from '@models/interfaces/i-config';

export interface IMigration {
  up(callback, params: IConfigDynamoDB): void;
  down(callback): void;
}
