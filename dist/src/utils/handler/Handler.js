import { normalize } from "node:path";
import ReaddirP from "readdirp";
import { pathToFileURL } from "node:url";
export default class Handler {
    client;
    path;
    loaded = [];
    size = this.loaded.length;
    constructor(path, client) {
        this.client = client;
        this.path = normalize(path);
    }
    walk() {
        return new Promise(async (resolve, reject) => {
            const files = ReaddirP(this.path, {
                lstat: true
            });
            for await (const { basename, fullPath } of files) {
                this.loaded.push({
                    name: basename,
                    path: fullPath
                });
                const fileURL = pathToFileURL(fullPath);
                const { default: exports } = await import(fileURL);
                try {
                    const e = exports;
                    if (e.type === "event") {
                        this.client[e.event.type](e.event.eventName, e.event.resolve);
                    }
                    else if (e.type === "command") {
                        this.client.commands.add(e.command);
                    }
                }
                catch (err) {
                    this.loaded.pop();
                    reject(err);
                }
                resolve(this.loaded);
            }
        });
    }
}
