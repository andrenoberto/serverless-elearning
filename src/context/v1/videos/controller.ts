import * as DynamoDB from 'aws-sdk/clients/dynamodb';
import {v4 as uuidv4} from 'uuid';

import {VideoTable} from '@db/tables';
import {VideoFactory} from '@models/factories';
import {IVideo, IVideoInput, IVideoScanResult} from '@models/interfaces';

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

  public find(req, res): void {
    this.videoTable.find(req.params.uuid, (err, data) => {
      if (!err) {
        if (data && Object.keys(data).length > 0) {
          const result: IVideo = VideoFactory.convertGetItemFromDynamoDB(data);
          res.json(result);
        } else {
          res.status(404).end();
        }
      } else {
        console.error(err);
        const {message} = err;
        res.status(err.statusCode).json({message});
      }
    });
  }

  public get(req, res): void {
    this.videoTable.get((err, data: DynamoDB.Types.ScanOutput) => {
      if (!err) {
        const result: IVideoScanResult = VideoFactory.convertScanFromDynamoDB(data);
        res.json(result);
      } else {
        console.error(err);
        const {message} = err;
        res.status(err.statusCode).json({message});
      }
    }, req.params.exclusiveStartKey || null);
  }

  public put(req, res): void {
    const uuid = req.body.uuid ? req.body.uuid : uuidv4();
    const input: IVideoInput = {
      contentType: req.body.contentType,
      extension: req.body.extension,
      key: uuid
    };
    this.videoTable.put(input, (err, data: string) => {
      if (!err) {
        res.json({signedRequest: data, uuid});
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
