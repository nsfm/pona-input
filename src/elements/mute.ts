import { Button } from "./button";

export class Mute extends Button {
  public readonly indicator = {};
  public readonly status = new Button({ icon: "!", name: "Status" });
}
