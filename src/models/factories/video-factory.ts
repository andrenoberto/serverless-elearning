import * as DynamoDB from 'aws-sdk/clients/dynamodb';
import {oc} from 'ts-optchain';

import {IDynamoVideoItem} from '@db/interfaces';
import {IOutputDetails, IVideo, IVideoScanResult} from '@models/interfaces';

export class VideoFactory {
  public static convertGetItemFromDynamoDB(getItemOutput: DynamoDB.Types.GetItemOutput): IVideo {
    return {
      uuid: oc(getItemOutput).Item.Uuid.S(''),
      inputFileName: oc(getItemOutput).Item.InputFileName.S(''),
      inputSource: oc(getItemOutput).Item.InputSource.S(''),
      outputDetails: VideoFactory.getOutputDetails(getItemOutput.Item.OutputDetails.L) || [],
      outputSource: oc(getItemOutput).Item.OutputSource.S(''),
      size: parseInt(oc(getItemOutput).Item.Size.N(), 10) || 0,
      status: oc(getItemOutput).Item.Status.S(''),
      type: oc(getItemOutput).Item.Type.S('')
    };
  }

  public static convertScanFromDynamoDB(scanOutput: DynamoDB.Types.ScanOutput): IVideoScanResult {
    const videos: IVideo[] = [];
    scanOutput.Items.forEach((item: IDynamoVideoItem) => {
      videos.push({
        uuid: oc(item).Uuid.S(''),
        inputFileName: oc(item).InputFileName.S(''),
        inputSource: oc(item).InputSource.S(''),
        outputDetails: VideoFactory.getOutputDetails(item.OutputDetails.L) || [],
        outputSource: oc(item).OutputSource.S(''),
        size: parseInt(oc(item).Size.N(), 10) || 0,
        status: oc(item).Status.S(''),
        type: oc(item).Type.S('')
      });
    });
    return {
      count: scanOutput.Count,
      scannedCount: scanOutput.ScannedCount,
      lastEvaluatedKey: scanOutput.LastEvaluatedKey,
      items: videos
    };
  }

  public static getOutputDetails(outputDetails: DynamoDB.Types.ListAttributeValue): IOutputDetails[] {
    const result: IOutputDetails[] = [];
    outputDetails.forEach((details: DynamoDB.Types.AttributeValue) => {
      result.push({
        durationInMS: parseInt(oc(details).M.DurationInMS.N(), 10) || 0,
        videoDetails: {
          widthInPx: parseInt(oc(details).M.VideoDetails.M.WidthInPx.N(), 10) || 0,
          heightInPx: parseInt(oc(details).M.VideoDetails.M.HeightInPx.N(), 10) || 0
        }
      });
    });
    return result;
  }
}
