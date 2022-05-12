import dotenv from "dotenv";
dotenv.config();

import Handler from "./src/utils/handler/Handler.js";
import Zuly from "./src/zuly.js";

const client = new Zuly({
  token: process.env.TOKEN as string,
  intents: ["allPrivileged"]
});

client.on("ready", async () => {
  await new Handler("./dist/src/commands", client).walk();
})

client.connect().then(async () => {
  await new Handler("./dist/src/events", client).walk();
});