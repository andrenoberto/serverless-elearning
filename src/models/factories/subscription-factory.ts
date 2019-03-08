import * as DynamoDB from 'aws-sdk/clients/dynamodb';
import {oc} from 'ts-optchain';

import {IDynamoSubscriptionItem} from '@db/interfaces';
import {ISubscription, ISubscriptionScanResult} from '@models/interfaces/i-subscription';

export class SubscriptionFactory {
  public static convertGetItemFromDynamoDB(getItemOutput: DynamoDB.Types.GetItemOutput): ISubscription {
    return {
      uuid: oc(getItemOutput).Item.Uuid.S(''),
      active: oc(getItemOutput).Item.Active.BOOL() || false,
      name: oc(getItemOutput).Item.Name.S(''),
      description: oc(getItemOutput).Item.Description.S(''),
      days: parseInt(oc(getItemOutput).Item.Days.N(), 10) || 0,
      price: parseFloat(oc(getItemOutput).Item.Price.N()) || .0,
      userGroups: oc(getItemOutput).Item.UserGroups.SS() || []
    };
  }

  public static convertPutItemFromDynamoDB(putInput: DynamoDB.Types.PutItemInput): ISubscription {
    return {
      uuid: oc(putInput).Item.Uuid.S(''),
      active: oc(putInput).Item.Active.BOOL() || false,
      name: oc(putInput).Item.Name.S(''),
      description: oc(putInput).Item.Description.S(''),
      days: parseInt(oc(putInput).Item.Days.N(''), 10) || 0,
      price: parseFloat(oc(putInput).Item.Price.N('')) || .0,
      userGroups: oc(putInput).Item.UserGroups.SS() || []
    };
  }

  public static convertScanFromDynamoDB(scanOutput: DynamoDB.Types.ScanOutput): ISubscriptionScanResult {
    const subscriptions: Array<ISubscription> = [];
    scanOutput.Items.forEach((item: IDynamoSubscriptionItem) => {
      subscriptions.push({
        uuid: oc(item).Uuid.S(''),
        active: oc(item).Active.BOOL() || false,
        name: oc(item).Name.S(''),
        description: oc(item).Description.S(''),
        days: parseInt(oc(item).Days.N(''), 10) || 0,
        price: parseFloat(oc(item).Price.N('')) || .0,
        userGroups: oc(item).UserGroups.SS() || []
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
        uuid: oc(updateItemOutput).Attributes.Uuid.S(''),
        active: oc(updateItemOutput).Attributes.Active.BOOL() || false,
        name: oc(updateItemOutput).Attributes.Name.S(''),
        description: oc(updateItemOutput).Attributes.Description.S(''),
        days: parseInt(oc(updateItemOutput).Attributes.Days.N(), 10) || 0,
        price: parseFloat(oc(updateItemOutput).Attributes.Price.N()) || .0,
        userGroups: oc(updateItemOutput).Attributes.UserGroups.SS() || []
      };
    }
    return subscription;
  }
}
