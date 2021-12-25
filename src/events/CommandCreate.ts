import { CommandInteraction } from "eris";
import Event from "../interfaces/Event.js";
import Export from "../interfaces/Export.js";
import Zuly from "../zuly.js";

class CommandCreateEvent extends Event {
  constructor(client: Zuly) {
    super("commandCreate", client);
  }

  handler(command: CommandInteraction) {
    // a
  }
}

export default function CommandInteractionEvent (client: Zuly) {
  return new Export("event", client).make(CommandCreateEvent);
}