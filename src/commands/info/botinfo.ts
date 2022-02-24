import { CommandInteraction } from "eris";
import Command from "../../interfaces/Command.js";
import Export from "../../interfaces/Export.js";
import Zuly from "../../zuly.js";

class PingCommand extends Command {
  constructor (client: Zuly) {
    super({
      name: "botinfo",
      description: "[❓ » Info] BotInfo!",
      type: 1,
      options: [],
      defaultPermission: false,
    }, client);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async handler (interaction: CommandInteraction) {
    interaction.createMessage({
      embeds: [
        {
          title: `<:zu_info:911303533859590144> BotInfo | ${this.client.user.username}`,
        }
      ]
    })
  }
}

export default function PingCommandRun (client: Zuly) {
  return new Export("command", client).make(PingCommand);
}