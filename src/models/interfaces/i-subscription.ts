import {Key} from 'aws-sdk/clients/dynamodb';

export interface ISubscription {
  uuid?: string;
  active?: boolean;
  name?: string;
  description?: string;
  plans?: Array<string>;
  accessGroup?: Array<string>;
}

export interface ISubscriptionGetItemResult {
  item?: ISubscription;
}

export interface ISubscriptionScanResult {
  count?: number;
  scannedCount?: number;
  lastEvaluatedKey?: Key;
  items?: Array<ISubscription>;
}
