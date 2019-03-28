import DynamoDB = require('aws-sdk/clients/dynamodb');

import {VideoTable} from '@db/tables';

export class VideoController {
  constructor(private readonly videoTable = new VideoTable()) {
  }

  public down(req, res): void {
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
  }

  public up(req, res): void {
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
  }
}
