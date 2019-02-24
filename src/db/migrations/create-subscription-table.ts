import {CreateTable} from '@db/migrations/create-table';
import {IConfigDynamoDB, IMigration} from '@models/interfaces';

export class CreateSubscriptionTable extends CreateTable implements IMigration {
  private readonly tableName: string;

  constructor({tableName} = {tableName: 'Subscriptions'}) {
    super();
    this.tableName = tableName;
  }

  public up({
              readCapacityUnits: ReadCapacityUnits,
              writeCapacityUnits: WriteCapacityUnits
            }: IConfigDynamoDB = this.config.dynamoDB): void {
    const params = {
      AttributeDefinitions: [
        {
          AttributeName: 'uuid',
          AttributeType: 'S'
        },
        {
          AttributeName: 'active',
          AttributeType: 'BOOL'
        },
        {
          AttributeName: 'name',
          AttributeType: 'S'
        },
        {
          AttributeName: 'description',
          AttributeType: 'S'
        },
        {
          AttributeName: 'plans',
          AttributeType: 'SS'
        },
        {
          AttributeName: 'accessGroup',
          AttributeType: 'SS'
        }
      ],
      ProvisionedThroughput: {
        ReadCapacityUnits,
        WriteCapacityUnits
      },
      KeySchema: [
        {
          AttributeName: 'uuid',
          KeyType: 'HASH'
        },
        {
          AttributeName: 'name',
          KeyType: 'RANGE'
        }
      ],
      TableName: this.tableName
    };
    this.createTable(params);
  }

  public down(): void {
    this.deleteTable(this.tableName);
  }
}
