import * as DynamoDB from 'aws-sdk/clients/dynamodb';

import {UserGroupTable} from '@db/tables';
import {UserGroupFactory} from '@models/factories';
import {IUserGroup, IUserGroupScanResult} from '@models/interfaces';

export class UserGroupController {
  constructor(private readonly userGroupTable = new UserGroupTable()) {
  }

  public batchDelete(req, res): void {
    this.userGroupTable.batchDelete(req.body.uuids, (err, data: DynamoDB.Types.BatchWriteItemOutput) => {
      if (!err) {
        res.json(data);
      } else {
        console.error(err);
        const {message} = err;
        res.status(err.statusCode).json({message});
      }
    });
  }

  public delete(req, res): void {
    this.userGroupTable.delete(req.params.uuid, (err, data: DynamoDB.Types.DeleteItemOutput) => {
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
    this.userGroupTable.down((err, data: DynamoDB.Types.DeleteTableOutput) => {
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

  public put(req, res): void {
    this.userGroupTable.put(req.body,
      (err, data: DynamoDB.Types.PutItemOutput, putItemInput: DynamoDB.Types.PutItemInput) => {
      if (!err && data) {
        const result = UserGroupFactory.convertPutItemFromDynamoDB(putItemInput);
        res.json(result);
      } else {
        console.error(err);
        const {message} = err;
        res.status(err.statusCode).json({message});
      }
    });
  }

  public up(req, res): void {
    this.userGroupTable.up((err, data: DynamoDB.Types.CreateTableOutput) => {
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
    this.userGroupTable.update(req.body, (err, data: DynamoDB.Types.UpdateItemOutput) => {
      if (!err) {
        const result = UserGroupFactory.convertUpdateItemFromDynamoDB(data);
        res.json(result);
      } else {
        console.error(err);
        const {message} = err;
        res.status(err.statusCode).json({message});
      }
    });
  }
}
