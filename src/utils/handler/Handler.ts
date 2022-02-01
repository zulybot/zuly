import { normalize } from "node:path";
import ReaddirP from "readdirp";
import { pathToFileURL } from "node:url";
import type Zuly from "../../zuly.js";
import type Export from "../../interfaces/Export.js";

export default class Handler {
  public readonly path: string;
  public loaded: Array<{ name: string, path: string }> = [];
  public size = this.loaded.length;
  constructor (path: string, public readonly client: Zuly) {
    this.path = normalize(path);
  }

  public walk (): Promise<Array<{ name: string, path: string }>> {
    return new Promise(async (resolve, reject) => {
      const files = ReaddirP(this.path, {
        fileFilter: ["*.js"],
        alwaysStat: true,
        directoryFilter: ["!node_modules"]
      })

      for await (const entry of files) {
        const { basename, fullPath } = entry;
        console.log(basename, fullPath)
        this.loaded.push({
          name: basename,
          path: fullPath
        });

        const fileURL = pathToFileURL(fullPath) as unknown as string;
        const { default: exports }: { default: (client: Zuly) => Export } = await import(fileURL);

        try {
          const e = exports(this.client);

          if (e.type === "event") {
            this.client[e.event.type](e.event.eventName, e.event.resolve.bind(e.event));
          }
          else if (e.type === "command") {
            this.client.commands.add(e.command);
          }
        }
        catch (err) {
          this.loaded.pop();
          reject(err);
        }
      }

      resolve(this.loaded);

    })
  }
}
