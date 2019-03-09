import * as DynamoDB from 'aws-sdk/clients/dynamodb';
import {v4 as uuidv4} from 'uuid';

import {Table} from '@db/tables/table';
import {toPascalCase} from '@libs/utils';
import {IConfigDynamoDB, IMigration} from '@models/interfaces';
import {ISubscription} from '@models/interfaces/i-subscription';

export class SubscriptionTable extends Table implements IMigration {
  private readonly tableName: string;

  constructor({tableName} = {tableName: 'Subscriptions'}) {
    super();
    this.tableName = tableName;
  }

  public batchDelete(items: Array<string>, callback): void {
    this.batchDeleteItem(items, this.tableName, callback);
  }

  public delete(uuid: string, callback): void {
    this.deleteItem(uuid, this.tableName, callback);
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

  public get(callback, exclusiveStartKey: string = null): void {
    const params: DynamoDB.Types.ScanInput = {
      ExpressionAttributeNames: {
        '#U': 'Uuid',
        '#A': 'Active',
        '#N': 'Name',
        '#D': 'Description',
        '#DS': 'Days',
        '#P': 'Price',
        '#UG': 'UserGroups'
      },
      ProjectionExpression: '#U, #A, #N, #D, #DS, #P, #UG',
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

  public put(subscription: ISubscription, callback): void {
    const params: DynamoDB.Types.PutItemInput = {
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
        'Days': {
          N: subscription.days.toString()
        },
        'Price': {
          N: subscription.price.toString()
        },
        'UserGroups': {
          SS: subscription.userGroups
        }
      },
      TableName: this.tableName
    };
    if (subscription.description) {
      params.Item['Description'] = {S: subscription.description};
    }
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

  public update(subscription: ISubscription, callback): void {
    this.updateItem(subscription, this.tableName, callback);
  }
}
