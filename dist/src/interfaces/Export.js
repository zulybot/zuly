import Command from "./Command.js";
import Event from "./Event.js";
export default class Export {
    type;
    client;
    base;
    event;
    command;
    constructor(type, client) {
        this.type = type;
        this.client = client;
        this.base = type === "command" ? Command : Event;
    }
    make(c) {
        const t = new c(this.client);
        return this.base instanceof Command ? this.command = t : this.event = t;
    }
}
