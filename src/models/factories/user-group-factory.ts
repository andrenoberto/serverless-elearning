import * as DynamoDB from 'aws-sdk/clients/dynamodb';

import {IDynamoUserGroupItem} from '@db/interfaces/i-dynamo-user-group-item';
import {IUserGroup, IUserGroupScanResult} from '@models/interfaces/i-user-group';

export class UserGroupFactory {
  public static convertGetItemFromDynamoDB(getItemOutput: DynamoDB.Types.GetItemOutput): IUserGroup {
    let userGroup: IUserGroup = {};
    if (getItemOutput && getItemOutput.Item) {
      userGroup = {
        uuid: getItemOutput.Item.Uuid.S,
        name: getItemOutput.Item.Name.S,
        description: getItemOutput.Item.Description.S
      };
    }
    return userGroup;
  }

  public static convertScanFromDynamoDB(scanOutput: DynamoDB.Types.ScanOutput): IUserGroupScanResult {
    const userGroups: Array<IUserGroup> = [];
    scanOutput.Items.forEach((item: IDynamoUserGroupItem) => {
      userGroups.push({
        uuid: item.Uuid.S,
        name: item.Name.S,
        description: item.Description.S
      });
    });
    return {
      count: scanOutput.Count,
      scannedCount: scanOutput.ScannedCount,
      lastEvaluatedKey: scanOutput.LastEvaluatedKey,
      items: userGroups
    };
  }
}
