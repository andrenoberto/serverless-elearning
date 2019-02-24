import * as DynamoDB from 'aws-sdk/clients/dynamodb';

import {Table} from '@db/tables/table';
import {IConfigDynamoDB, IMigration} from '@models/interfaces';

export class PlanTable extends Table implements IMigration {
  private readonly tableName: string;

  constructor({tableName} = {tableName: 'Plans'}) {
    super();
    this.tableName = tableName;
  }

  public down(): void {
    this.deleteTable(this.tableName);
  }

  public up({
              readCapacityUnits: ReadCapacityUnits,
              writeCapacityUnits: WriteCapacityUnits
            }: IConfigDynamoDB = this.config.dynamoDB): void {
    const params: DynamoDB.Types.CreateTableInput = {
      AttributeDefinitions: [
        {
          AttributeName: 'Uuid',
          AttributeType: 'S'
        },
        {
          AttributeName: 'Active',
          AttributeType: 'BOOL'
        },
        {
          AttributeName: 'Name',
          AttributeType: 'S'
        },
        {
          AttributeName: 'Description',
          AttributeType: 'S'
        },
        {
          AttributeName: 'Price',
          AttributeType: 'N'
        },
        {
          AttributeName: 'Days',
          AttributeType: 'N'
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
        },
        {
          AttributeName: 'Name',
          KeyType: 'RANGE'
        }
      ],
      TableName: 'Plans'
    };
    this.createTable(params);
  }
}
