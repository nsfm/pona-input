import { Input } from "../input";
import { Magnitude } from "../math";
import { Button } from "./button";

export class Trigger extends Input<Magnitude> {
  public state: Magnitude = 0;

  public button: Button = new Button();

  public get active(): boolean {
    return this.state > 0;
  }

  public get pressure(): Magnitude {
    return this.state;
  }

  public get magnitude(): Magnitude {
    return this.state;
  }

  public changes(state: Magnitude): boolean {
    return this.state !== state;
  }
}
