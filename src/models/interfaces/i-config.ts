export interface IConfig {
  aws: IConfigAWS;
  dynamoDB: IConfigDynamoDB;
  env: IConfigEnv;
}

export interface IConfigAWS {
  apiVersion: string;
  key: string;
  region: string;
  secret: string;
}

export interface IConfigDynamoDB {
  readCapacityUnits: number;
  writeCapacityUnits: number;
}

export interface IConfigEnv {
  serverless: string;
  stage: string;
}
