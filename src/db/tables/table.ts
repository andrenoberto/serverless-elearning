import * as AWS from 'aws-sdk';

import {Config} from '@config/environment';
import {toPascalCase} from '@libs/utils';
import {IConfig} from '@models/interfaces';

export class Table {
  protected readonly config: IConfig;
  private dynamoDB: AWS.DynamoDB;

  constructor() {
    this.config = Config.factory();
    this.dynamoDB = new AWS.DynamoDB({
      ...this.config.aws
    });
  }

  protected batchDeleteItem(items: Array<string>, tableName: string, callback): void {
    const params: AWS.DynamoDB.Types.BatchWriteItemInput = {
      RequestItems: {}
    };
    params.RequestItems[tableName] = [];
    items.forEach((item: string) => {
      params.RequestItems[tableName].push({
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

  protected batchWriteItem(params: AWS.DynamoDB.Types.BatchWriteItemInput, callback): void {
    this.dynamoDB.batchWriteItem(params, callback);
  }

  protected createTable(params: AWS.DynamoDB.Types.CreateTableInput, callback): void {
    this.dynamoDB.createTable(params, callback);
  }

  protected deleteItem(uuid: string, tableName: string, callback): void {
    const params: AWS.DynamoDB.Types.DeleteItemInput = {
      Key: {
        'Uuid': {
          S: uuid
        }
      },
      ReturnValues: 'ALL_OLD',
      TableName: tableName
    };
    this.dynamoDB.deleteItem(params, callback);
  }

  protected deleteTable(tableName: string, callback): void {
    this.dynamoDB.deleteTable({
      TableName: tableName
    }, callback);
  }

  protected getItem(params: AWS.DynamoDB.Types.GetItemInput, callback): void {
    this.dynamoDB.getItem(params, callback);
  }

  protected putItem(params: AWS.DynamoDB.Types.PutItemInput, callback): void {
    this.dynamoDB.putItem(params, (err, data) => callback(err, data, params));
  }

  protected scanTable(params: AWS.DynamoDB.Types.ScanInput, callback): void {
    this.dynamoDB.scan(params, callback);
  }

  protected updateItem(item, tableName: string, callback): void {
    const params = {
      ExpressionAttributeNames: {},
      ExpressionAttributeValues: {},
      Key: {
        'Uuid': {
          S: item.uuid
        }
      },
      ReturnValues: 'ALL_NEW',
      TableName: tableName,
      UpdateExpression: 'SET'
    };
    for (const [key, value] of Object.entries(item)) {
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
        case 'number':
          params.ExpressionAttributeValues[attributeValue] = {
            N: value.toString()
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
    this.dynamoDB.updateItem(params, callback);
  }
}
