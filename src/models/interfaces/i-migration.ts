import {IConfigDynamoDB} from '@models/interfaces/i-config';

export interface IMigration {
  up(params: IConfigDynamoDB): void;
  down(): void;
}
