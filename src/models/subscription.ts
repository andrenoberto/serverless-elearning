import {ISubscription} from '@models/interfaces/i-subscription';

export class Subscription {
  public uuid: string;
  public active: boolean;
  public name: string;
  public description: string;
  public plans: Array<string>;
  public accessGroup: Array<string>;

  constructor(subscription: ISubscription) {
    this.uuid = subscription.uuid;
    this.active = subscription.active;
    this.name = subscription.name;
    this.description = subscription.description;
    this.plans = subscription.plans;
    this.accessGroup = subscription.accessGroup;
  }
}
