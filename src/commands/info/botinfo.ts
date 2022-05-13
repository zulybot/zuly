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
  async handler (interaction: CommandInteraction, locale: any) {
    interaction.createMessage({
      embeds: [
        {
          title: locale("botinfo.title", {
            botName: this.client.user.username
          }),
          description: locale("botinfo.description", {
            botName: this.client.user.username,
            users: this.client.users.size,
            guilds: this.client.guilds.size,
          }),
          color: 0x7289da,
        }
      ]
    })
  }
}

export default function PingCommandRun (client: Zuly) {
  return new Export("command", client).make(PingCommand);
}