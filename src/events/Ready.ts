import Event from "../interfaces/Event.js";
import Export from "../interfaces/Export.js";
import Zuly from "../zuly.js";

class ReadyEvent extends Event {
  constructor (client: Zuly) {
    super("ready", client);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async handler (bot: Zuly) {
    const status: string[] = [
      `zulybot.xyz | ${this.client.user.username}`,
      `I'm on ${this.client.guilds.size} servers | ${this.client.user.username}`
    ];
    this.client.editStatus("dnd", {
      name: status[Math.floor(Math.random() * status.length)],
      type: 1,
      url: "https://twitch.tv/adg_ofc"
    })
    setInterval(() => {
      this.client.editStatus("dnd", {
        name: status[Math.floor(Math.random() * status.length)],
        type: 1,
        url: "https://twitch.tv/adg_ofc"
      });
    }, 30000);
    console.log(`[Zuly] I'm ready! ${this.client.user.username}#${this.client.user.discriminator} in ${this.client.guilds.size} guilds.`);
  }
}

export default function BotReadyEvent (client: Zuly) {
  return new Export("event", client).make(ReadyEvent);
}