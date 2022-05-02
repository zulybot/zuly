'use strict';

const sdk_1 = require('@top-gg/sdk');
const typed_emitter_1 = require('@jpbberry/typed-emitter');
class BasePoster extends typed_emitter_1.EventEmitter {
	constructor (t, s) {
		let e, i, r;
		if (super(), this.options = s, this.started = !1, s || (s = {}), this.options = {
			interval: (e = s.interval) !== null && void 0 !== e ? e : 18e5,
			postOnStart: (i = s.postOnStart) === null || void 0 === i || i,
			startPosting: (r = s.startPosting) === null || void 0 === r || r,
			sdk: s.sdk
		}, this.options.interval < 9e5) throw new Error('Gönderme aralığı 900000 in üzerinde olmalıdır (15 dakika)');
		this.api = this.options.sdk || new sdk_1.Api(t);
	}

	async _binder (t) {
		
	}

	start () {
		
	}

	stop () {
		
	}

	_setupInterval () {
		
	}

	async post () {
		this.api.postStats(await this.binds.getStats()).then(t => this.emit('posted', t)).catch(t => this.eventNames().includes('error') ? this.emit('error', t) : console.error(t));
	}
}
exports.BasePoster = BasePoster;
