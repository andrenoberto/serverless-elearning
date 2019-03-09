import * as DynamoDB from 'aws-sdk/clients/dynamodb';
import {oc} from 'ts-optchain';

import {IDynamoUserGroupItem} from '@db/interfaces/i-dynamo-user-group-item';
import {IUserGroup, IUserGroupScanResult} from '@models/interfaces/i-user-group';

export class UserGroupFactory {
  public static convertGetItemFromDynamoDB(getItemOutput: DynamoDB.Types.GetItemOutput): IUserGroup {
    return {
      uuid: oc(getItemOutput).Item.Uuid.S(''),
      name: oc(getItemOutput).Item.Name.S(''),
      description: oc(getItemOutput).Item.Description.S('')
    };
  }

  public static convertPutItemFromDynamoDB(putItemInput: DynamoDB.Types.PutItemInput): IUserGroup {
    return {
      uuid: oc(putItemInput).Item.Uuid.S(''),
      name: oc(putItemInput).Item.Name.S(''),
      description: oc(putItemInput).Item.Description.S('')
    };
  }

  public static convertScanFromDynamoDB(scanOutput: DynamoDB.Types.ScanOutput): IUserGroupScanResult {
    const userGroups: Array<IUserGroup> = [];
    scanOutput.Items.forEach((item: IDynamoUserGroupItem) => {
      userGroups.push({
        uuid: oc(item).Uuid.S(''),
        name: oc(item).Name.S(''),
        description: oc(item).Description.S('')
      });
    });
    return {
      count: scanOutput.Count,
      scannedCount: scanOutput.ScannedCount,
      lastEvaluatedKey: scanOutput.LastEvaluatedKey,
      items: userGroups
    };
  }

  public static convertUpdateItemFromDynamoDB(updateItemOutput: DynamoDB.Types.UpdateItemOutput): IUserGroup {
    return {
      uuid: oc(updateItemOutput).Attributes.Uuid.S(''),
      name: oc(updateItemOutput).Attributes.Name.S(''),
      description: oc(updateItemOutput).Attributes.Description.S('')
    };
  }
}
