import { Button } from "./button";
import { Touch } from "./touch";
import { Input, InputParams } from "../input";

export class Touchpad extends Input<Touchpad> {
  public readonly state: this = this;

  public readonly left: Touch = new Touch();

  public readonly right: Touch = new Touch();

  public readonly button: Button;

  public get active(): boolean {
    return this.left.contact.active;
  }

  constructor(params: InputParams) {
    super(params);
    this.button = new Button();
    this.left = new Touch();
    this.right = new Touch();
  }
}
