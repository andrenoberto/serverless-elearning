import {IPlan} from '@models/interfaces';

export class Plan {
  public uuid: string;
  public active: boolean;
  public name: string;
  public description: string;
  public price: number;
  public days: number;

  constructor(plan: IPlan) {
    this.uuid = plan.uuid;
    this.active = plan.active;
    this.name = plan.name;
    this.description = plan.description;
    this.price = plan.price;
    this.days = plan.days;
  }
}
