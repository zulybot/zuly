import Event from "../interfaces/Event.js";
import Export from "../interfaces/Export.js";
class ReadyEvent extends Event {
    constructor(client) {
        super("ready", client);
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    handler(bot) {
        console.log(`[Zuly] I'm ready! ${this.client.user.username}#${this.client.user.discriminator} in ${this.client.guilds.size} guilds.`);
    }
}
export default function BotReadyEvent(client) {
    return new Export("event", client).make(ReadyEvent);
}
