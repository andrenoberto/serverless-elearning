import {IPlan} from '@models/interfaces';

export class Plan {
  private uuid: string;
  private name: string;
  private description: string;
  private price: number;
  private days: number;

  constructor(plan: IPlan) {
    this.uuid = plan.uuid;
    this.name = plan.name;
    this.description = plan.description;
    this.price = plan.price;
    this.days = plan.days;
  }
}
