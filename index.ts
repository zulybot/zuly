import Handler from "./src/utils/handler/Handler.js";
import Zuly from "./src/zuly.js";

const client = new Zuly({
  token: process.env.TOKEN as string,
  intents: ["allPrivileged"]
});

client.connect().then(async () => {
  await new Handler("./src/commands", client).walk();
  await new Handler("./src/events", client).walk();
});
