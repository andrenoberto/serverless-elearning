import * as DynamoDB from 'aws-sdk/clients/dynamodb';

import {SubscriptionTable} from '@db/tables';
import {SubscriptionFactory} from '@models/factories/subscription-factory';
import {ISubscriptionGetItemResult, ISubscriptionScanResult} from '@models/interfaces/i-subscription';

export class SubscriptionController {
  constructor(private readonly subscriptionTable = new SubscriptionTable()) {}

  public get(req, res): void {
    this.subscriptionTable.get((err, data: DynamoDB.Types.ScanOutput) => {
      if (!err) {
        const result: ISubscriptionScanResult = SubscriptionFactory.convertScanFromDynamoDB(data);
        res.json(result);
      } else {
        console.error(err);
        res.status(err.statusCode).end();
      }
    });
  }

  public find(req, res): void {
    this.subscriptionTable.find(req.params.uuid, (err, data) => {
      if (!err) {
        if (data && Object.keys(data).length !== 0) {
          const result: ISubscriptionGetItemResult = SubscriptionFactory.convertGetItemFromDynamoDB(data);
          res.json(result.item);
        } else {
          res.status(404).end();
        }
      } else {
        console.error(err);
        res.status(err.statusCode).end();
      }
    });
  }
}
