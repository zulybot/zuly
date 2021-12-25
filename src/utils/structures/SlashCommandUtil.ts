import { ApplicationCommandOptionChoice } from "eris";

export class CommandChoice implements ApplicationCommandOptionChoice {
  constructor (
    public readonly name: string,
    public readonly value: string | number
  ) {}
}

export class CommandOption {
  public readonly type: number;
  public readonly required: boolean;
  constructor (
    public readonly name: string,
    public readonly description: string,
    { type, required }: { type: CommandOptionTypesString; required?: boolean }
  ) {
    this.type = CommandOption.resolveType<number>(type);
    this.required = !!required;
  }

  public static resolveType<T = CommandOptionTypesString | number> (
    type: number | string
  ): T {
    if (typeof type === "string") {
      return CommandOptionTypes[type as CommandOptionTypesString] as unknown as T;
    }

    return Object.entries(CommandOptionTypes).find(
      ([, v]) => v === type
    )?.[0] as unknown as T;
  }
}


export type CommandOptionTypesString =
  | "subCommand"
  | "subCommandGroup"
  | "string"
  | "integer"
  | "boolean"
  | "user"
  | "channel"
  | "role"
  | "mentionable"
  | "number";

export enum CommandOptionTypes {
  subCommand = 1,
  subCommandGroup = 2,
  string = 3,
  integer = 4,
  boolean = 5,
  user = 6,
  channel = 7,
  role = 8,
  mentionable = 9,
  number = 10,
}
