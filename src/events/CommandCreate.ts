import { CommandInteraction } from "eris";
import Event from "../interfaces/Event.js";
import Export from "../interfaces/Export.js";
import Zuly from "../zuly.js";
import i18n from "i18n";

class CommandCreateEvent extends Event {
  constructor (client: Zuly) {
    super("commandCreate", client);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async handler (interaction: CommandInteraction) {
    const guild = await this.client.getRESTGuild(interaction.guildID || "");
    await interaction.acknowledge(1);
    const command = Array.from(this.client.commands.values()).find((c) => c.name === interaction.data.name);
    const idioma = guild.preferredLocale.toLowerCase();
    const locale = (key: string, replacements?: { [key: string]: string }) =>
      i18n.__({ locale: idioma, phrase: key }, replacements || "{}" as any);
    command?.handler(interaction, locale as any);
  }
}

export default function CommandInteractionEvent (client: Zuly) {
  return new Export("event", client).make(CommandCreateEvent);
}