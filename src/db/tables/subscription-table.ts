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
    const params: DynamoDB.Types.BatchWriteItemInput = {
      RequestItems: {}
    };
    params.RequestItems[this.tableName] = [];
    items.forEach((item: string) => {
      params.RequestItems[this.tableName].push({
        DeleteRequest: {
          Key: {
            'Uuid': {
              S: item
            }
          }
        }
      });
    });
    this.batchWriteItem(params, callback);
  }

  public get(callback, exclusiveStartKey = null): void {
    const params: DynamoDB.Types.ScanInput = {
      ExpressionAttributeNames: {
        '#U': 'Uuid',
        '#A': 'Active',
        '#N': 'Name',
        '#D': 'Description',
        '#P': 'Plans',
        '#AG': 'AccessGroup'
      },
      ProjectionExpression: '#U, #A, #N, #D, #P, #AG',
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

  public delete(uuid: string, callback): void {
    const params: DynamoDB.Types.DeleteItemInput = {
      Key: {
        'Uuid': {
          S: uuid
        }
      },
      ReturnValues: 'ALL_OLD',
      TableName: this.tableName
    };
    this.deleteItem(params, callback);
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
        'Description': {
          S: subscription.description
        },
        'Plans': {
          SS: subscription.plans
        },
        'AccessGroup': {
          SS: subscription.accessGroup
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

  public update(subscription: ISubscription, callback): void {
    const params: DynamoDB.Types.UpdateItemInput = {
      ExpressionAttributeNames: {},
      ExpressionAttributeValues: {},
      Key: {
        'Uuid': {
          S: subscription.uuid
        }
      },
      ReturnValues: 'ALL_NEW',
      TableName: this.tableName,
      UpdateExpression: 'SET'
    };
    for (const [key, value] of Object.entries(subscription)) {
      if (key === 'uuid') {
        continue;
      }
      const attributeName = `#${key.toUpperCase()}`;
      const attributeValue = `:${key.toLowerCase()}`;
      params.ExpressionAttributeNames[attributeName] = toPascalCase(key);
      switch (typeof value) {
        case 'boolean':
          params.ExpressionAttributeValues[attributeValue] = {
            BOOL: value
          };
          break;
        case 'object':
          params.ExpressionAttributeValues[attributeValue] = {
            SS: value
          };
          break;
        case 'string':
          params.ExpressionAttributeValues[attributeValue] = {
            S: value
          };
          break;
      }
      if (params.UpdateExpression === 'SET') {
        params.UpdateExpression += ` ${attributeName} = ${attributeValue}`;
      } else {
        params.UpdateExpression += `, ${attributeName} = ${attributeValue}`;
      }
    }
    this.updateItem(params, callback);
  }
}
