export interface IConfig {
  aws: IConfigAWS;
  awsAccount: IConfigAWSAccount;
  dynamoDB: IConfigDynamoDB;
  env: IConfigEnv;
  master: IConfigMasterKey;
  mediaConvert: IConfigMediaConvert;
}

export interface IConfigAWS {
  apiVersion: string;
  accessKeyId: string;
  region: string;
  secretAccessKey: string;
}

export interface IConfigAWSAccount {
  accountId: string;
}

export interface IConfigDynamoDB {
  readCapacityUnits: number;
  writeCapacityUnits: number;
  limit: number;
}

export interface IConfigEnv {
  serverless: string;
  stage: string;
}

export interface IConfigMasterKey {
  key: string;
}

export interface IConfigMediaConvert {
  jobTemplate: string;
  options: IConfigMediaConvertOptions;
  outputBucket: string;
  role: string;
}

export interface IConfigMediaConvertOptions {
  apiVersion: string;
  endpoint: string;
}
