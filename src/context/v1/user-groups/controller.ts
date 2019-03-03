import * as DynamoDB from 'aws-sdk/clients/dynamodb';

import {Config} from '@config/environment';
import {UserGroupTable} from '@db/tables/user-group-table';
import {UserGroupFactory} from '@models/factories/user-group-factory';
import {IUserGroup, IUserGroupScanResult} from '@models/interfaces/i-user-group';

export class UserGroupController {
  constructor(private readonly userGroupTable = new UserGroupTable()) {
  }

  public find(req, res): void {
    this.userGroupTable.find(req.params.uuid, (err, data: DynamoDB.Types.GetItemOutput) => {
      if (!err) {
        if (data && Object.keys(data).length > 0) {
          const result: IUserGroup = UserGroupFactory.convertGetItemFromDynamoDB(data);
          res.json(result);
        } else {
          res.status(403).end();
        }
      } else {
        console.error(err);
        const {message} = err;
        res.status(err.statusCode).json({message});
      }
    });
  }

  public get(req, res): void {
    this.userGroupTable.get((err, data: DynamoDB.Types.ScanOutput) => {
      if (!err) {
        const result: IUserGroupScanResult = UserGroupFactory.convertScanFromDynamoDB(data);
        res.json(result);
      } else {
        console.error(err);
        const {message} = err;
        res.status(err.statusCode).json({message});
      }
    }, req.params.exclusiveStartKey || null);
  }
}
