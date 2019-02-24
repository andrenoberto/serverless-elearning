import {ISubscription} from "@models/interfaces/i-subscription";

export class Subscription {
  private uuid: string;
  private active: boolean;
  private name: string;
  private description: string;
  private plans: Array<string>;
  private accessGroup: Array<string>;

  constructor(subscription: ISubscription) {
    this.uuid = subscription.uuid;
    this.active = subscription.active;
    this.name = subscription.name;
    this.description = subscription.description;
    this.plans = subscription.plans;
    this.accessGroup = subscription.accessGroup;
  }
}
