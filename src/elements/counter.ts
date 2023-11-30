import { Input } from "../input";

/** Container for counters or timers */
export class Counter extends Input<number> {
  public state: number = 0;
  public active = false;
}
