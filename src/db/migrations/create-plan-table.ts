import * as AWS from 'aws-sdk';

import {Config} from '@config/environment';
import {IConfig} from '@models/interfaces';

export class CreatePlanTable {
  private readonly config: IConfig;
  private dynamoDB: AWS.DynamoDB;

  constructor() {
    this.config = Config.factory();
    this.dynamoDB = new AWS.DynamoDB({
      ...this.config.aws
    });
  }

  public up({
    readCapacityUnits: ReadCapacityUnits,
    writeCapacityUnits: WriteCapacityUnits
            } = this.config.dynamoDB): void {
    const params = {
      AttributeDefinitions: [
        {
          AttributeName: 'uuid',
          AttributeType: 'S'
        },
        {
          AttributeName: 'active',
          AttributeType: 'BOOL'
        },
        {
          AttributeName: 'name',
          AttributeType: 'S'
        },
        {
          AttributeName: 'description',
          AttributeType: 'S'
        },
        {
          AttributeName: 'price',
          AttributeType: 'N'
        },
        {
          AttributeName: 'days',
          AttributeType: 'N'
        }
      ],
      ProvisionedThroughput: {
        ReadCapacityUnits,
        WriteCapacityUnits
      },
      KeySchema: [
        {
          AttributeName: 'uuid',
          KeyType: 'HASH'
        },
        {
          AttributeName: 'name',
          KeyType: 'RANGE'
        }
      ],
      TableName: 'Plans'
    };
    this.dynamoDB.createTable(params, (err, data) => {
      if (!err) {
        console.log(data);
      } else {
        console.error(err);
      }
    });
  }
}
