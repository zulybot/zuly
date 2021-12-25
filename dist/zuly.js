import { Client } from "eris";
export default class Zuly extends Client {
  commands = new Set();
  constructor(options) {
    super(options.token, options);
  }
}
