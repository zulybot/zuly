const {
	EventEmitter
} = require('events');

module.exports = class CollectorBase extends EventEmitter {
	constructor (client) {
		super();

		this.ended = false;
		this.client = client;
		this.error = false;
		this.collected = [];
		this.collectedSize = 0;
	}

	stopAll () {
		this.ended = true;
		this.emit('ended', this.ended, this.error);
		this.emit('end', this.collectedSize, this.collected);
	}

	createTimeout (time) {
		try {
			setTimeout(() => {
				this.stopAll();
			}, time);
		}
		catch (error) {
			this.error = error;
			this.stopAll();
		}
	}
};
