import { CommandInteraction } from "eris";
import Event from "../interfaces/Event.js";
import Export from "../interfaces/Export.js";
import Zuly from "../zuly.js";

class CommandCreateEvent extends Event {
  constructor (client: Zuly) {
    super("commandCreate", client);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  handler (command: CommandInteraction) {
    const cmd = Array.from(this.client.commands.values()).find(cmd => cmd.name === command.data.name);
    console.log(command)
  }
}

export default function CommandInteractionEvent (client: Zuly) {
  return new Export("event", client).make(CommandCreateEvent);
}