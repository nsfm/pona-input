import { InputSet } from "../input";
import { Button } from "./button";

describe("Momentary", () => {
  it("should construct", () => {
    expect(new Button({})).toBeInstanceOf(Button);
  });

  it("should implement `active`", () => {
    const button = new Button({});
    expect(button.active).toEqual(false);
    button[InputSet](true);
    expect(button.active).toEqual(true);
    button[InputSet](false);
    expect(button.active).toEqual(false);
  });

  it("should implement `state`", () => {
    const button = new Button({});
    expect(button.state).toEqual(false);
    button[InputSet](true);
    expect(button.state).toEqual(true);
    button[InputSet](false);
    expect(button.state).toEqual(false);
  });

  it("should implement 'on `press`'", (done) => {
    const button = new Button({});
    button[InputSet](false);
    button.on("release", () => {
      fail();
    });

    button.on("press", (btn) => {
      expect(button.id).toBe(btn.id);
      done();
    });
    button[InputSet](true);
  });

  it("should implement 'on `release`'", (done) => {
    const button = new Button({});
    button[InputSet](true);
    button.on("press", () => {
      fail();
    });

    button.on("release", (btn) => {
      expect(button.id).toBe(btn.id);
      done();
    });
    button[InputSet](false);
  });
});
