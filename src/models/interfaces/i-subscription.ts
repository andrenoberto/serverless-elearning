export interface ISubscription {
  uuid: string;
  active: boolean;
  name: string;
  description: string;
  plans: Array<string>;
  accessGroup: Array<string>;
}
