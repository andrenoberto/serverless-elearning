export interface IConfig {
  aws: IConfigAWS;
  dynamoDB: IConfigDynamoDB;
  env: IConfigEnv;
  master: IConfigMasterKey;
}

export interface IConfigAWS {
  apiVersion: string;
  accessKeyId: string;
  region: string;
  secretAccessKey: string;
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
