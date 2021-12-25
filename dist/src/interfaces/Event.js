export default class Event {
    eventName;
    client;
    type;
    constructor(eventName, client, type = "on") {
        this.eventName = eventName;
        this.client = client;
        this.type = type;
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    handler(...args) {
        throw new Error("Not implemented.");
    }
    async resolve(...value) {
        let error;
        try {
            this.handler(value);
        }
        catch (err) {
            error = err;
            throw error;
        }
    }
}
