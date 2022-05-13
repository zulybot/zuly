import type {
  CommandInteraction as SlashCommand,
  ChatInputApplicationCommandStructure as SlashCommandData,
} from "eris";
import type Zuly from "../zuly";

export default class Command {
  name: SlashCommandData["name"];
  description: SlashCommandData["description"];
  type: SlashCommandData["type"];
  options: SlashCommandData["options"];
  defaultPermission: SlashCommandData["defaultPermission"];
  constructor (data: SlashCommandData, public readonly client: Zuly) {
    this.name = data.name;
    this.description = data.description;
    this.type = data.type;
    this.options = data.options;
    this.defaultPermission = data.defaultPermission;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public handler (slash: SlashCommand, locale: string): void {
    throw new Error("Not implemented.");
  }

  public async resolve (value: SlashCommand, locale: string): Promise<void> {
    let error: Error;
    try {
      this.handler(value, locale);
    }
    catch (err: unknown) {
      error = err as Error;
      await value.createMessage("```" + error.message + "```");
    }
  }
}
