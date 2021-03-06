import * as DynamoDB from 'aws-sdk/clients/dynamodb';

import {SubscriptionTable} from '@db/tables';
import {validateMasterKey} from '@libs/utils';
import {SubscriptionFactory} from '@models/factories';
import {ISubscription, ISubscriptionScanResult} from '@models/interfaces';

export class SubscriptionController {
  constructor(private readonly subscriptionTable = new SubscriptionTable()) {
  }

  public batchDelete(req, res): void {
    this.subscriptionTable.batchDelete(req.body.uuids, (err, data: DynamoDB.Types.BatchWriteItemOutput) => {
      if (!err) {
        res.json(data);
      } else {
        console.log(err);
        const {message} = err;
        res.status(err.statusCode).json({message});
      }
    });
  }

  public delete(req, res): void {
    this.subscriptionTable.delete(req.params.uuid, (err, data: DynamoDB.Types.DeleteItemOutput) => {
      if (!err) {
        if (Object.keys(data).length > 0) {
          res.status(200).end();
        } else {
          res.status(204).end();
        }
      } else {
        console.error(err);
        const {message} = err;
        res.status(err.statusCode).json({message});
      }
    });
  }

  public down(req, res): void {
    this.subscriptionTable.down((err, data: DynamoDB.Types.DeleteTableOutput) => {
      if (!err) {
        const {TableName: tableName, TableStatus: status} = data.TableDescription;
        res.json({tableName, status});
      } else {
        console.error(err);
        const {message} = err;
        res.status(err.statusCode).json({message});
      }
    });
  }

  public find(req, res): void {
    this.subscriptionTable.find(req.params.uuid, (err, data) => {
      if (!err) {
        if (data && Object.keys(data).length > 0) {
          const result: ISubscription = SubscriptionFactory.convertGetItemFromDynamoDB(data);
          res.json(result);
        } else {
          res.status(404).end();
        }
      } else {
        console.error(err);
        const {message} = err;
        res.status(err.statusCode).json({message});
      }
    });
  }

  public get(req, res): void {
    this.subscriptionTable.get((err, data: DynamoDB.Types.ScanOutput) => {
      if (!err) {
        const result: ISubscriptionScanResult = SubscriptionFactory.convertScanFromDynamoDB(data);
        res.json(result);
      } else {
        console.error(err);
        const {message} = err;
        res.status(err.statusCode).json({message});
      }
    }, req.params.exclusiveStartKey || null);
  }

  public put(req, res): void {
    this.subscriptionTable.put(req.body,
      (err, data: DynamoDB.Types.PutItemOutput, putInput: DynamoDB.Types.PutItemInput) => {
        if (!err && data) {
          const result: ISubscription = SubscriptionFactory.convertPutItemFromDynamoDB(putInput);
          res.json(result);
        } else {
          console.error(err);
          const {message} = err;
          res.status(err.statusCode).json({message});
        }
      });
  }

  public up(req, res): void {
    this.subscriptionTable.up((err, data: DynamoDB.Types.CreateTableOutput) => {
      if (!err) {
        const {TableName: tableName, TableStatus: status} = data.TableDescription;
        res.json({tableName, status});
      } else {
        console.error(err);
        const {message} = err;
        res.status(err.statusCode).json({message});
      }
    });
  }

  public update(req, res): void {
    this.subscriptionTable.update(req.body, (err, data: DynamoDB.Types.UpdateItemOutput) => {
      if (!err) {
        const result: ISubscription = SubscriptionFactory.convertUpdateItemFromDynamoDB(data);
        res.json(result);
      } else {
        console.error(err);
        const {message} = err;
        res.status(err.statusCode).json({message});
      }
    });
  }
}
