import { CommandInteraction } from "eris";
import Event from "../interfaces/Event.js";
import Export from "../interfaces/Export.js";
import Zuly from "../zuly.js";

class CommandCreateEvent extends Event {
  constructor (client: Zuly) {
    super("commandCreate", client);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async handler (interaction: CommandInteraction) {
    await interaction.acknowledge(1);
    const command = Array.from(this.client.commands.values()).find((c) => c.name === interaction.data.name);
  }
}

export default function CommandInteractionEvent (client: Zuly) {
  return new Export("event", client).make(CommandCreateEvent);
}