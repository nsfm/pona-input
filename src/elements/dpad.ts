import { Button } from "./button";
import { Input, InputParams } from "../input";

export interface DpadParams extends InputParams {
  up?: InputParams;
  down?: InputParams;
  left?: InputParams;
  right?: InputParams;
}

export class Dpad extends Input<Dpad> {
  public readonly state: this = this;

  public readonly up: Button;
  public readonly down: Button;
  public readonly left: Button;
  public readonly right: Button;

  constructor(params: DpadParams = {}) {
    super(params);
    const { up, down, left, right } = params;
    this.up = new Button({ ...(up ?? {}) });
    this.down = new Button({ ...(down ?? {}) });
    this.left = new Button({ ...(left ?? {}) });
    this.right = new Button({ ...(right ?? {}) });
  }

  public get active(): boolean {
    return (
      this.up.active ||
      this.down.active ||
      this.left.active ||
      this.right.active
    );
  }
}
