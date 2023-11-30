import { Joystick } from "./joystick";
import { Counter } from "./counter";

/**
 * Represents a touchpad touch, treated like an analog joystick input
 * with [0,0] representing the center of the touchpad.
 */
export class Touch extends Joystick {
  public readonly state: this = this;
  public readonly contact = this.button;
  public readonly tracker: Counter = new Counter();
  public deadzone = 0;

  public get active(): boolean {
    return this.contact.active;
  }
}
