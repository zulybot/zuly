export class CommandOption {
  type;
  constructor(data) {
    this.type = CommandOption.resolveType(data.type);
  }
  static resolveType(type) {
    return Object.entries(CommandOptionTypes).find(([, v]) => v === type)?.[0];
  }
}
export var CommandOptionTypes;
(function (CommandOptionTypes) {
  CommandOptionTypes[(CommandOptionTypes["subCommand"] = 1)] = "subCommand";
  CommandOptionTypes[(CommandOptionTypes["subCommandGroup"] = 2)] =
    "subCommandGroup";
  CommandOptionTypes[(CommandOptionTypes["string"] = 3)] = "string";
  CommandOptionTypes[(CommandOptionTypes["integer"] = 4)] = "integer";
  CommandOptionTypes[(CommandOptionTypes["boolean"] = 5)] = "boolean";
  CommandOptionTypes[(CommandOptionTypes["user"] = 6)] = "user";
  CommandOptionTypes[(CommandOptionTypes["channel"] = 7)] = "channel";
  CommandOptionTypes[(CommandOptionTypes["role"] = 8)] = "role";
  CommandOptionTypes[(CommandOptionTypes["mentionable"] = 9)] = "mentionable";
  CommandOptionTypes[(CommandOptionTypes["number"] = 10)] = "number";
})(CommandOptionTypes || (CommandOptionTypes = {}));
