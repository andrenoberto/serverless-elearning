import * as DynamoDB from 'aws-sdk/clients/dynamodb';
import * as uuidv4 from 'uuid/v4';

import {Table} from '@db/tables/table';
import {IConfigDynamoDB, IMigration} from '@models/interfaces';
import {ISubscription} from '@models/interfaces/i-subscription';

export class SubscriptionTable extends Table implements IMigration {
  private readonly tableName: string;

  constructor({tableName} = {tableName: 'Subscriptions'}) {
    super();
    this.tableName = tableName;
  }

  public add(subscription: ISubscription, callback): void {
    const tableItem = {};
    tableItem[this.tableName] = [{
      PutRequest: {
        Item: {
          'Uuid': {
            S: uuidv4()
          },
          'Active': {
            BOOL: subscription.active
          },
          'Name': {
            S: subscription.name
          },
          'Description': {
            S: subscription.description
          },
          'Plans': {
            SS: subscription.plans
          },
          'AccessGroup': {
            SS: subscription.accessGroup
          }
        }
      }
    }];
    const params: DynamoDB.Types.BatchWriteItemInput = {
      RequestItems: {
        ...tableItem
      }
    };
    this.batchWriteItem(params, callback);
  }

  public get(callback): void {
    const params: DynamoDB.Types.ScanInput = {
      ExpressionAttributeNames: {
        '#id': 'Uuid',
        '#act': 'Active',
        '#name': 'Name',
        '#desc': 'Description',
        '#plan': 'Plans',
        '#aG': 'AccessGroup'
      },
      ProjectionExpression: '#id, #act, #name, #desc, #plan, #aG',
      Limit: this.config.dynamoDB.limit,
      TableName: this.tableName
    };
    this.scanTable(params, callback);
  }

  public down(): void {
    this.deleteTable(this.tableName);
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
          AttributeName: 'Plans',
          AttributeType: 'SS'
        },
        {
          AttributeName: 'AccessGroup',
          AttributeType: 'SS'
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
      TableName: this.tableName
    };
    this.createTable(params);
  }
}
