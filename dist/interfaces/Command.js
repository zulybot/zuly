export default class Command {
  client;
  name;
  description;
  options;
  defaultPermission;
  constructor(data, client) {
    this.client = client;
    this.name = data.name;
    this.description = data.description;
    this.options = data.options;
    this.defaultPermission = data.defaultPermission;
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  handler(slash) {
    throw new Error("Not implemented.");
  }
  async resolve(value) {
    try {
      this.handler(value);
    } catch (err) {
      const error = err;
      await value.createMessage("```" + error.message + "```");
    }
  }
}
