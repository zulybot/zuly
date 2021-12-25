import { Client, ClientOptions, ComponentInteraction, Interaction } from "eris";

import { ClientEvents, CommandInteraction } from "eris";

import Command from "./interfaces/Command.js";

export interface ZulyEvents extends ClientEvents {
  buttonCreate: [button: ComponentInteraction];
  commandCreate: [command: CommandInteraction];
  selectMenuCreate: [selectMenu: ComponentInteraction];
}

export interface ZulyOptions extends ClientOptions {
  token: string;
}

export default interface Zuly extends Client {
  on<E extends keyof ZulyEvents>(
    event: E,
    listener: (...args: ZulyEvents[E]) => unknown
  ): this;
  once<E extends keyof ZulyEvents>(
    event: E,
    listener: (...args: ZulyEvents[E]) => unknown
  ): this;
  emit<E extends keyof ZulyEvents>(event: E, ...args: ZulyEvents[E]): boolean;
}

export default class Zuly extends Client {
  public commands = new Set<Command>();

  constructor (options: ZulyOptions) {
    super(options.token, options);

    this.on("interactionCreate", onInteractionCreate.bind(this));
  }
}

function onInteractionCreate (this: Zuly, interaction: Interaction): void {
  if (interaction instanceof CommandInteraction) {
    this.emit("commandCreate", interaction as CommandInteraction);
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
