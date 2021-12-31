import Event from "../interfaces/Event.js";
import Export from "../interfaces/Export.js";
class CommandCreateEvent extends Event {
    constructor(client) {
        super("commandCreate", client);
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    handler(command) {
        const cmd = Array.from(this.client.commands.values()).find(cmd => cmd.name === command.data.name);
        console.log(command);
    }
}
export default function CommandInteractionEvent(client) {
    return new Export("event", client).make(CommandCreateEvent);
}
