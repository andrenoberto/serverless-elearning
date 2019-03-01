import * as AWS from 'aws-sdk';

import {Config} from '@config/environment';
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

  protected batchWriteItem(params: AWS.DynamoDB.Types.BatchWriteItemInput, callback): void {
    this.dynamoDB.batchWriteItem(params, callback);
  }

  protected createTable(params: AWS.DynamoDB.Types.CreateTableInput, callback): void {
    this.dynamoDB.createTable(params, callback);
  }

  protected deleteItem(params: AWS.DynamoDB.Types.DeleteItemInput, callback): void {
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

  protected updateItem(params: AWS.DynamoDB.Types.UpdateItemInput, callback): void {
    this.dynamoDB.updateItem(params, callback);
  }
}
