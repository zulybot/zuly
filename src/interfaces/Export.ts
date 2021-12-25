import type Zuly from "../zuly.js";
import Command from "./Command.js";
import Event from "./Event.js";

export default class Export {
  public readonly base: typeof Command | typeof Event;
  public event!: DefaultClass & Event;
  public command!: DefaultClass & Command;
  constructor (public readonly type: Interfaces, public readonly client: Zuly) {
    this.base = type === "command" ? Command : Event;
  }

  public make (c: typeof DefaultClass): DefaultClass & Command | DefaultClass & Event {
    const t = new c(this.client);
    return this.base instanceof Command ? this.command = t as DefaultClass & Command : this.event = t as DefaultClass & Event;
  }
}

export declare class DefaultClass {
  constructor (client: Zuly)

  handler (value: unknown): void;
  resolve (value: unknown): Promise<void>;
}

export type Interfaces = "command" | "event";