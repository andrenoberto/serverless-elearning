import * as DynamoDB from 'aws-sdk/clients/dynamodb';

import {Table} from '@db/tables/table';
import {IConfigDynamoDB, IMigration} from '@models/interfaces';

export class PlanTable extends Table implements IMigration {
  private readonly tableName: string;

  constructor({tableName} = {tableName: 'Plans'}) {
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
      TableName: 'Plans'
    };
    this.createTable(params, callback);
  }
}
