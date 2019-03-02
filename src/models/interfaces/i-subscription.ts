import {Key} from 'aws-sdk/clients/dynamodb';

export interface ISubscription {
  uuid?: string;
  active?: boolean;
  name?: string;
  description?: string;
  days?: number;
  price?: number;
  userGroups?: Array<string>;
}

export interface ISubscriptionScanResult {
  count?: number;
  scannedCount?: number;
  lastEvaluatedKey?: Key;
  items?: Array<ISubscription>;
}
