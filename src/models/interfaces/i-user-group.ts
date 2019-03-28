import {Key} from 'aws-sdk/clients/dynamodb';

export interface IUserGroup {
  uuid?: string;
  name?: string;
  description?: string;
}

export interface IUserGroupScanResult {
  count?: number;
  scannedCount?: number;
  lastEvaluatedKey?: Key;
  items?: IUserGroup[];
}
