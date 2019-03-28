import {Table} from '@db/tables/table';

import {IConfigDynamoDB, IMigration} from '@models/interfaces';
import DynamoDB = require('aws-sdk/clients/dynamodb');

export class VideoTable extends Table implements IMigration {
  private readonly tableName: string;

  constructor({tableName} = {tableName: 'Videos'}) {
    super();
    this.tableName = tableName;
  }

  public down(callback): void {
    this.deleteTable(this.tableName, callback);
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
