import * as GetEnv from 'getenv';

import {IConfigAWS, IConfigDynamoDB, IConfigEnv} from '@models/interfaces';

export class Environment {
  public static get aws(): IConfigAWS {
    return {
      apiVersion: GetEnv.string('AWS_API_VERSION'),
      key: GetEnv.string('AWS_KEY'),
      region: GetEnv.string('AWS_REGION_CODE'),
      secret: GetEnv.string('AWS_SECRET')
    };
  }

  public static get dynamoDB(): IConfigDynamoDB {
    return {
      readCapacityUnits: GetEnv.int('AWS_DYNAMO_DB_READ_CAPACITY_UNITS'),
      writeCapacityUnits: GetEnv.int('AWS_DYNAMO_DB_WRITE_CAPACITY_UNITS')
    };
  }

  public static get env(): IConfigEnv {
    return {
      serverless: GetEnv.string('SERVERLESS_NAME'),
      stage: GetEnv.string('ENVIRONMENT')
    };
  }
}
