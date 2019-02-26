import {Environment} from '@config/environment';
import {IConfig} from '@models/interfaces';

export class Config {
  public static factory(): IConfig {
    return this.get();
  }

  private static get(): IConfig {
    return {
      aws: Environment.aws,
      dynamoDB: Environment.dynamoDB,
      env: Environment.env,
      master: Environment.master
    };
  }
}
