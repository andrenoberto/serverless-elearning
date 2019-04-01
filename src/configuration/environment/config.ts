import {Environment} from '@config/environment';
import {IConfig} from '@models/interfaces';

export class Config {
  public static factory(): IConfig {
    return this.get();
  }

  private static get(): IConfig {
    return {
      aws: Environment.aws,
      awsAccount: Environment.awsAccount,
      awsS3: Environment.awsS3,
      dynamoDB: Environment.dynamoDB,
      env: Environment.env,
      master: Environment.master,
      mediaConvert: Environment.mediaConvert,
      video: Environment.video
    };
  }
}
