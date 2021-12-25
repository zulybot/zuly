export class CommandChoice {
    name;
    value;
    constructor(name, value) {
        this.name = name;
        this.value = value;
    }
}
export class CommandOption {
    name;
    description;
    type;
    required;
    constructor(name, description, { type, required }) {
        this.name = name;
        this.description = description;
        this.type = CommandOption.resolveType(type);
        this.required = !!required;
    }
    static resolveType(type) {
        if (typeof type === "string") {
            return CommandOptionTypes[type];
        }
        return Object.entries(CommandOptionTypes).find(([, v]) => v === type)?.[0];
    }
}
export var CommandOptionTypes;
(function (CommandOptionTypes) {
    CommandOptionTypes[CommandOptionTypes["subCommand"] = 1] = "subCommand";
    CommandOptionTypes[CommandOptionTypes["subCommandGroup"] = 2] = "subCommandGroup";
    CommandOptionTypes[CommandOptionTypes["string"] = 3] = "string";
    CommandOptionTypes[CommandOptionTypes["integer"] = 4] = "integer";
    CommandOptionTypes[CommandOptionTypes["boolean"] = 5] = "boolean";
    CommandOptionTypes[CommandOptionTypes["user"] = 6] = "user";
    CommandOptionTypes[CommandOptionTypes["channel"] = 7] = "channel";
    CommandOptionTypes[CommandOptionTypes["role"] = 8] = "role";
    CommandOptionTypes[CommandOptionTypes["mentionable"] = 9] = "mentionable";
    CommandOptionTypes[CommandOptionTypes["number"] = 10] = "number";
})(CommandOptionTypes || (CommandOptionTypes = {}));
