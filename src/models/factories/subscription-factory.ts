import * as DynamoDB from 'aws-sdk/clients/dynamodb';

import {IDynamoSubscriptionItem} from '@db/interfaces';
import {ISubscription, ISubscriptionGetItemResult, ISubscriptionScanResult} from '@models/interfaces/i-subscription';

export class SubscriptionFactory {
  public static convertGetItemFromDynamoDB(getItemOutput: DynamoDB.Types.GetItemOutput): ISubscriptionGetItemResult {
    let subscription: ISubscription = {};
    if (getItemOutput && getItemOutput.Item) {
      subscription = {
        uuid: getItemOutput.Item.Uuid.S,
          active: getItemOutput.Item.Active.BOOL,
        name: getItemOutput.Item.Name.S,
        description: getItemOutput.Item.Description.S,
        plans: getItemOutput.Item.Plans.SS,
        accessGroup: getItemOutput.Item.AccessGroup.SS
      };
    }
    return {
      item: subscription
    };
  }
  public static convertScanFromDynamoDB(scanOutput: DynamoDB.Types.ScanOutput): ISubscriptionScanResult {
    const subscriptions: Array<ISubscription> = [];
    scanOutput.Items.forEach((item: IDynamoSubscriptionItem) => {
      subscriptions.push({
        uuid: item.Uuid.S,
        active: item.Active.BOOL,
        name: item.Name.S,
        description: item.Description.S,
        plans: item.Plans.SS,
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
}
