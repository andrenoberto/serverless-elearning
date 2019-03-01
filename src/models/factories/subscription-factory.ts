import * as DynamoDB from 'aws-sdk/clients/dynamodb';

import {IDynamoSubscriptionItem} from '@db/interfaces';
import {ISubscription, ISubscriptionScanResult} from '@models/interfaces/i-subscription';

export class SubscriptionFactory {
  public static convertGetItemFromDynamoDB(getItemOutput: DynamoDB.Types.GetItemOutput): ISubscription {
    let subscription: ISubscription = {};
    if (getItemOutput && getItemOutput.Item) {
      subscription = {
        uuid: getItemOutput.Item.Uuid.S,
        active: getItemOutput.Item.Active.BOOL,
        name: getItemOutput.Item.Name.S,
        description: getItemOutput.Item.Description.S,
        days: parseInt(getItemOutput.Item.Days.N, 10),
        price: parseFloat(getItemOutput.Item.Price.N),
        accessGroup: getItemOutput.Item.AccessGroup.SS
      };
    }
    return subscription;
  }

  public static convertPutItemFromDynamoDB(putInput: DynamoDB.Types.PutItemInput): ISubscription {
    let subscription: ISubscription = {};
    if (putInput && putInput.Item) {
      subscription = {
        uuid: putInput.Item.Uuid.S,
        active: putInput.Item.Active.BOOL,
        name: putInput.Item.Name.S,
        description: putInput.Item.Description.S,
        days: parseInt(putInput.Item.Days.N, 10),
        price: parseFloat(putInput.Item.Price.N),
        accessGroup: putInput.Item.AccessGroup.SS
      };
    }
    return subscription;
  }

  public static convertScanFromDynamoDB(scanOutput: DynamoDB.Types.ScanOutput): ISubscriptionScanResult {
    const subscriptions: Array<ISubscription> = [];
    scanOutput.Items.forEach((item: IDynamoSubscriptionItem) => {
      subscriptions.push({
        uuid: item.Uuid.S,
        active: item.Active.BOOL,
        name: item.Name.S,
        description: item.Description.S,
        days: parseInt(item.Days.N, 10),
        price: parseFloat(item.Price.N),
        accessGroup: item.AccessGroup.SS
      });
    });
    return {
      count: scanOutput.Count,
      scannedCount: scanOutput.ScannedCount,
      lastEvaluatedKey: scanOutput.LastEvaluatedKey,
      items: subscriptions
    };
  }

  public static convertUpdateItemFromDynamoDB(updateItemOutput: DynamoDB.Types.UpdateItemOutput): ISubscription {
    let subscription: ISubscription = {};
    if (updateItemOutput && updateItemOutput.Attributes) {
      subscription = {
        uuid: updateItemOutput.Attributes.Uuid.S,
        active: updateItemOutput.Attributes.Active.BOOL,
        name: updateItemOutput.Attributes.Name.S,
        description: updateItemOutput.Attributes.Description.S,
        days: parseInt(updateItemOutput.Attributes.Days.N, 10),
        price: parseFloat(updateItemOutput.Attributes.Price.N),
        accessGroup: updateItemOutput.Attributes.AccessGroup.SS
      };
    }
    return subscription;
  }
}
