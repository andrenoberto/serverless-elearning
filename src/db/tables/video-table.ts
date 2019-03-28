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
        '#IFN': 'InputFileName',
        '#IS': 'InputSource',
        '#OD': 'OutputDetails',
        '#OS': 'OutputSource',
        '#SZ': 'Size',
        '#S': 'Status',
        '#T': 'Type',
      },
      ProjectionExpression: '#U, #IFN, #IS, #OD, #OS, #SZ, #S, #T',
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
