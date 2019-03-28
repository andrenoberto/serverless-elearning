import DynamoDB = require('aws-sdk/clients/dynamodb');

import {VideoTable} from '@db/tables';
import {validateMasterKey} from '@libs/utils';

export class VideoController {
  constructor(private readonly videoTable = new VideoTable()) {
  }

  public down(req, res): void {
    if (validateMasterKey(req)) {
      this.videoTable.down((err, data: DynamoDB.Types.DeleteTableOutput) => {
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

  public up(req, res): void {
    if (validateMasterKey(req)) {
      this.videoTable.up((err, data: DynamoDB.Types.CreateTableOutput) => {
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
}
