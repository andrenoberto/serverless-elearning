import * as DynamoDB from 'aws-sdk/clients/dynamodb';

import {Config} from '@config/environment';
import {SubscriptionTable} from '@db/tables';
import {SubscriptionFactory} from '@models/factories/subscription-factory';
import {ISubscription, ISubscriptionScanResult} from '@models/interfaces/i-subscription';

export class SubscriptionController {
  constructor(private readonly subscriptionTable = new SubscriptionTable()) {
  }

  public add(req, res): void {
    this.subscriptionTable.add(req.body, (err, data: DynamoDB.Types.BatchWriteItemOutput) => {
      if (!err) {
        if (data && data.UnprocessedItems && Object.keys(data.UnprocessedItems).length > 0) {
          res.status(500).end();
        } else {
          res.status(200).end();
        }
      } else {
        console.error(err);
        const {message} = err;
        res.status(err.statusCode).json({message});
      }
    });
  }

  public down(req, res): void {
    if (SubscriptionController.validateMasterKey(req)) {
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
    } else {
      res.status(403).end();
    }
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
    });
  }

  public up(req, res): void {
    if (SubscriptionController.validateMasterKey(req)) {
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
    } else {
      res.status(403).end();
    }
  }

  public update(req, res): void {
    this.subscriptionTable.update(req.body, (err, data: DynamoDB.Types.UpdateItemOutput) => {
      if (!err) {
        const result = SubscriptionFactory.convertUpdateItemFromDynamoDB(data);
        res.json(result);
      } else {
        console.error(err);
        const {message} = err;
        res.status(err.statusCode).json({message});
      }
    });
  }

  private static validateMasterKey(req): boolean {
    const {master} = Config.factory();
    return req.body.key === master.key;
  }
}
