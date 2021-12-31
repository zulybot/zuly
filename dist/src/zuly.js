import { Client, ComponentInteraction } from "eris";
import { CommandInteraction } from "eris";
export default class Zuly extends Client {
    commands = new Set();
    constructor(options) {
        super(options.token, options);
        this.on("interactionCreate", onInteractionCreate.bind(this));
    }
}
function onInteractionCreate(interaction) {
    if (interaction instanceof CommandInteraction) {
        this.emit("commandCreate", interaction);
    }
    else if (interaction instanceof ComponentInteraction) {
        if (interaction.data.component_type === 2) {
            this.emit("buttonCreate", interaction);
        }
        else {
            this.emit("selectMenuCreate", interaction);
        }
    }
}
