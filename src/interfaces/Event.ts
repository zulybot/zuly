import type Zuly from "../zuly.js";
import type { ZulyEvents } from "../zuly.js";

export default class Event {
  constructor (public readonly eventName: keyof ZulyEvents, public readonly client: Zuly, public type: "on" | "once" = "on") {
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public handler (...args: unknown[]): void {
    throw new Error("Not implemented.");
  }

  public async resolve (...value: unknown[]): Promise<void> {
    let error: Error;
    try {
      this.handler(value);
    }
    catch (err: unknown) {
      error = err as Error;
      throw error;
    }
  }
}
