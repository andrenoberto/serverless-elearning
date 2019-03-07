import * as DynamoDB from 'aws-sdk/clients/dynamodb';
import {v4 as uuidv4} from 'uuid';

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
    this.deleteTable(this.tableName, callback);
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

  public put(userGroup: IUserGroup, callback): void {
    const params: DynamoDB.Types.PutItemInput = {
      Item: {
        'Uuid': {
          S: uuidv4()
        },
        'Name': {
          S: userGroup.name
        },
        'Description': {
          S: userGroup.description
        }
      },
      TableName: this.tableName
    };
    this.putItem(params, callback);
  }

  public up(callback, {
    readCapacityUnits: ReadCapacityUnits,
    writeCapacityUnits: WriteCapacityUnits
  }: IConfigDynamoDB = this.config.dynamoDB): void {
    const params: DynamoDB.Types.CreateTableInput = {
      AttributeDefinitions: [
        {
          AttributeName: 'Uuid',
          AttributeType: 'S'
        }
      ],
      ProvisionedThroughput: {
        ReadCapacityUnits,
        WriteCapacityUnits
      },
      KeySchema: [
        {
          AttributeName: 'Uuid',
          KeyType: 'HASH'
        }
      ],
      TableName: this.tableName
    };
    this.createTable(params, callback);
  }
}
