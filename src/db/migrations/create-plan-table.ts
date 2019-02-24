import {CreateTable} from '@db/migrations/create-table';
import {IConfigDynamoDB, IMigration} from '@models/interfaces';

export class CreatePlanTable extends CreateTable implements IMigration {
  private readonly tableName: string;

  constructor({tableName} = {tableName: 'Plans'}) {
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
          AttributeName: 'price',
          AttributeType: 'N'
        },
        {
          AttributeName: 'days',
          AttributeType: 'N'
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
      TableName: 'Plans'
    };
    this.createTable(params);
  }

  public down(): void {
    this.deleteTable(this.tableName);
  }
}
