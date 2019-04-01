import {Key} from 'aws-sdk/clients/dynamodb';
import {ReadStream} from 'fs';

import {ISubscription} from '@models/interfaces/i-subscription';

export interface IVideo {
  uuid?: string;
  inputFileName?: string;
  inputSource?: string;
  outputDetails?: IOutputDetails[];
  outputSource?: string;
  size?: number;
  status?: string;
  type?: string;
}

export interface IVideoScanResult {
  count?: number;
  scannedCount?: number;
  lastEvaluatedKey?: Key;
  items?: ISubscription[];
}

export interface IOutputDetails {
  durationInMS?: number;
  videoDetails?: IVideoDetails;
}

export interface IVideoDetails {
  widthInPx?: number;
  heightInPx?: number;
}

export interface IVideoInput {
  extension: string;
  contentType: string;
}
