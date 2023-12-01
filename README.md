# pona-input

`pona-input` is a state management framework that makes it easy for developers to integrate human input devices into their applications. It helps you map input events over an abstract representation of a device to create a shareable fluent API.

For example, if your device produces analog X and Y values, `pona-input` can represent these as a `Joystick`. This component normalizes your X/Y values over a consistent range, calculates the direction and overall magnitude of the stick position, and offers configuration such as deadzones and change detection thresholds.

The end-user of a `pona-input` device can take advantage of a convenient, fluent API that supports many input patterns. It makes it easy to support different kinds of devices and develop a hardware-agnostic application. Plus it provides utilities for mocking inputs so testing your application is easy even when devices are unavailable.

## Getting Started

Sorry, this library is still under development, please wait until 1.0.0 is released!

## Building Input APIs

### Organizing your device

```typescript
import { Device } from `pona-input`

/** Extend Input to organize nested or repeated input mechanisms */
export class HalfController extends Input {
  readonly joystick = new ButtonJoystick()
  readonly trigger = new Trigger()
  readonly bumper = new Button()
}

export class Dualsense extends Device {
  readonly left = new HalfController()
  readonly right = new HalfController()
  readonly dpad = new Dpad()
  readonly cross = new Button()
  readonly circle = new Button()
  readonly triange = new Button()
  readonly square = new Button()
  readonly start = new Button()
  readonly select = new Button()
  readonly mute = new Button()

  /** Implement the abstract functions on Device */
  async connect(): Promise<void> {}

  /** Include whatever extra functionality you need */
  async myUniqueFeature(): Promise<void> {}
}

/** Set up an instance of your device */
const controller = new Dualsense()

/** Register callbacks */
controller.cross.on("change", ({ state }) => console.log(`X ${state ? 'pressed' : 'released' }`))
/** Read synchronously */
console.log(`Left thumbstick: ${controller.left.joystick.direction} rad`)
/** Use promises */
await controller.right.bumper.promise("change")
/** And iterators */
for (await const { magnitude } of controller.right.joystick) {}

/** Find inputs by ID */
controller.find(controller.left.bumper.id) === controller.left.bumper // True
/** Set inputs by ID */
controller.set(controller.square.id, false)
```

### Feeding in data

```typescript
class Dualsense extends Device {
  /** ... */

  async connect(): Promise<void> {
    /** This example uses a WebHID device */
    const underlyingDevice: HIDDevice;

    underlyingDevice.addEventListener("inputreport", (event) => {
      const { data, device, reportId } = event;
      /** As you parse the HID report, assign the results directly to the device.*/
      this.cross.set(data.getUint8(0));
      this.left.joystick.x.set(data.getUint16(12));
      this.left.joystick.y.set(data.getUint16(14));
      /** ... */
    });
  }
}
```

### Core input elements

#### Button

An input that accepts boolean values.

```typescript
import { Button } from "pona-input";
```

#### Axis

Represents an analog input with a value ranging from -1 to 1.

```typescript
import { Axis } from "pona-input";
```

#### Trigger

Represents an analog input with a value ranging from 0 to 1.

```typescript
import { Trigger } from "pona-input";
```

#### Counter

Represents an arbitrary numeric value.

```typescript
import { Counter } from "pona-input";
```

### Compound input elements

#### Joystick

An input composed of two `Axis` elements. It provides helpers for calculating the direction and magnitude of the joystick.

```typescript
import { Joystick } from "pona-input";
```

#### Button Joystick

An input composed of two `Axis` elements and a `Button`. It extends `Joystick`.

```typescript
import { ButtonJoystick } from "pona-input";
```

#### Dpad

An input for representing four `Button`s described by `up`, `down`, `left`, `right`.

```typescript
import { Dpad } from "pona-input";
```

#### Gyroscope

An input for representing the angular velocity of the device.

#### Accelerometer

An input for representing the linear acceleration of the device.

### Custom input elements

New kinds of input elements can be created by extending `pona-input`'s `Input` class:

```typescript
import { Input } from "pona-input";

// `Input` can represent any kind of value
export class BigInput extends Input<bigint> {
  // Implement custom logic by overriding `Input`'s functions & properties
}
```

Or by extending any other element:

```typescript
import { Joystick, Button } from "pona-input";

// Represents a Joystick with an extra Button
export class ButtonJoystick extends Joystick {
  public readonly button = new Button();
}
```

### Testing
