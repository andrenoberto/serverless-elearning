import * as DynamoDB from 'aws-sdk/clients/dynamodb';

import {Table} from '@db/tables/table';
import {IConfigDynamoDB, IMigration} from '@models/interfaces';
import {IUserGroup} from '@models/interfaces/i-user-group';

export class UserGroupTable extends Table implements IMigration {
  public readonly tableName: string;

  constructor({tableName} = {tableName: 'UserGroups'}) {
    super();
    this.tableName = tableName;
  }

  public down(callback): void {
    // TODO: purge user groups table
  }

  public find(uuid: string, callback): void {
    const params: DynamoDB.Types.GetItemInput = {
      Key: {
        'Uuid': {
          S: uuid
        }
      },
      TableName: this.tableName
    };
    this.getItem(params, callback);
  }

  public get(callback, exclusiveStartKey = null): void {
    const params: DynamoDB.Types.ScanInput = {
      ExpressionAttributeNames: {
        '#U': 'Uuid',
        '#N': 'Name',
        '#D': 'Description'
      },
      ProjectionExpression: '#U, #N, #D',
      Limit: this.config.dynamoDB.limit,
      TableName: this.tableName
    };
    if (exclusiveStartKey) {
      params.ExclusiveStartKey = {
        'Uuid': {
          S: exclusiveStartKey
        }
      };
    }
    this.scanTable(params, callback);
  }

  public up(callback, params: IConfigDynamoDB): void {
    // TODO: create user groups table
  }
}
