const {
	EventEmitter
} = require('events');
module.exports = class extends EventEmitter {
	constructor (t) {
		super(), this.ended = !1, this.client = t, this.error = !1, this.collected = [], this.collectedSize = 0;
	}
	stopAll () {
		this.ended = !0, this.emit('ended', this.ended, this.error), this.emit('end', this.collectedSize, this.collected);
	}
	createTimeout (t) {
		try {
			setTimeout(() => {
				this.stopAll();
			}, t);
		}
		catch (t) {
			this.error = t, this.stopAll();
		}
	}
};
