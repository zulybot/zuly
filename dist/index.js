import dotenv from "dotenv";
dotenv.config();
import Handler from "./src/utils/handler/Handler.js";
import Zuly from "./src/zuly.js";
const client = new Zuly({
    token: process.env.TOKEN,
    intents: ["allPrivileged"]
});
client.connect().then(async () => {
    await new Handler("./dist/src/commands", client).walk();
    await new Handler("./dist/src/events", client).walk();
});
