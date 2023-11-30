# pona-input

`pona-input` is a state framework for building convenient APIs around controllers and other kinds of input devices.

## Getting Started

Sorry, this library is still under development, please wait until 1.0.0 is released!

## Building Input APIs

### Organizing your device

### Feeding in data

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
