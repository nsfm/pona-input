import { Input, InputParams } from "../input";
import { Axis, AxisParams } from "./axis";

export interface GyroscopeParams extends InputParams {
  /** Configuration for the input's x axis */
  x?: AxisParams;

  /** Configuration for the input's y axis */
  y?: AxisParams;

  /** Configuration for the input's z axis */
  z?: AxisParams;
}

/** Tracks the angular velocity of the controller. */
export class Gyroscope extends Input<Gyroscope> {
  public readonly state: this = this;

  public readonly x: Axis;
  public readonly y: Axis;
  public readonly z: Axis;

  constructor(params?: GyroscopeParams) {
    super(params);
    const { x, y, z } = params ?? {};

    this.x = new Axis({ ...params, ...x });
    this.y = new Axis({ ...params, ...y });
    this.z = new Axis({ ...params, ...z });
  }

  public readonly active = false;
}
