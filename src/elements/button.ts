import { Input } from "../input";

export class Button extends Input<boolean> {
  public state: boolean = false;

  public get active(): boolean {
    return this.state;
  }
}
