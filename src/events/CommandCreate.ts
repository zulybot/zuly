import { CommandInteraction } from "eris";
import Locales from "../locales/config.js";
import Event from "../interfaces/Event.js";
import Export from "../interfaces/Export.js";
import Zuly from "../zuly.js";

class CommandCreateEvent extends Event {
  constructor (client: Zuly) {
    super("commandCreate", client);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async handler (interaction: CommandInteraction) {
    const guild = await this.client.getRESTGuild(interaction.guildID || "");
    await interaction.acknowledge(1);
    const command = Array.from(this.client.commands.values()).find((c) => c.name === interaction.data.name);
    let locale = Locales.en_us
    if (guild.preferredLocale) {
      const idioma = guild.preferredLocale.toLowerCase().replace(/-/g, "_");
      if (Locales[idioma]) {
        locale = Locales[idioma];
      }
      else if (Locales[idioma] === undefined) {
        locale = Locales.en_us;
      }
    }
    command?.handler(interaction, locale);
  }
}

export default function CommandInteractionEvent (client: Zuly) {
  return new Export("event", client).make(CommandCreateEvent);
}