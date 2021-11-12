/* eslint-disable */
const {
	Structure: Structure,
	TrackUtils: TrackUtils
} = require('erela.js');
module.exports = Structure.extend('Player', t => {
	return class extends t {
		constructor (...t) {
			super(...t), this.speed = 1, this.speed = 1, this.rate = 1, this.pitch = 1, this.bassboost = !1, this.nightcore = !1, this.vaporwave = !1, this._8d = !1;
		}
		setSpeed (t) {
			if (isNaN(t)) throw new RangeError('<Player>#setSpeed() must be a number.');
			return this.speed = Math.max(Math.min(t, 5), 0.05), this.setTimescale(t, this.pitch, this.rate), this;
		}
		setPitch (t) {
			if (isNaN(t)) throw new RangeError('<Player>#setPitch() must be a number.');
			return this.pitch = Math.max(Math.min(t, 5), 0.05), this.setTimescale(this.speed, t, this.rate), this;
		}
		setNightcore (t) {
			if (typeof t != 'boolean') throw new RangeError('<Player>#setNighcore() must be a boolean.');
			return t ? (this.bassboost = !1, this.distortion = !1, this.vaporwave = !1, this.setVaporwave(!1), this.setBassboost(!1), this.setDistortion(!1), this.setTimescale(1.2999999523162842, 1.2999999523162842, 1), this.nightcore = t) : this.setTimescale(1, 1, 1), this.nightcore = t, this;
		}
		setVaporwave (t) {
			if (typeof t != 'boolean') throw new RangeError('<Player>#setVaporwave() must be a boolean.');
			return t ? (this.nightcore = !1, this.bassboost = !1, this.distortion = !1, this.setBassboost(!1), this.setNightcore(!1), this.setDistortion(!1), this.setTimescale(0.8500000238418579, 0.800000011920929, 1), this.vaporwave = t) : this.setTimescale(1, 1, 1), this.vaporwave = t, this;
		}
		setDistortion (t) {
			if (typeof t != 'boolean') throw new RangeError('<Player>#setDistortion() must be a boolean.');
			return t ? (this.nightcore = !1, this.vaporwave = !1, this.bassboost = !1, this.setBassboost(!1), this.setNightcore(!1), this.setVaporwave(!1), this.setDistort(0.5), this.distortion = t) : this.clearEffects(), this.distortion = t, this;
		}
		setBassboost (t) {
			return t ? (this.nightcore = !1, this.vaporwave = !1, this.setVaporwave(!1), this.setNightcore(!1), this.setEQ(...new Array(3).fill(null).map((e, s) => ({
				band: 1,
				gain: t
			}))), this.bassboost = t) : this.clearEffects(), this.bassboost = t, this;
		}
		set8D (t) {
			if (typeof t != 'boolean') throw new RangeError('<Player>#set8D() must be a boolean.');
			return t ? (this.nightcore = !1, this.vaporwave = !1, this.setVaporwave(!1), this.setNightcore(!1), this.node.send({
				op: 'filters',
				guildId: this.guild,
				rotation: {
					rotationHz: 1
				}
			}), this._8d = t) : this.clearEffects(), this._8d = t, this;
		}
		async toggleLoop () {
			return this.queueRepeat || this.trackRepeat ? this.trackRepeat ? (await this.setQueueRepeat(!0), {
				player: this,
				status: 'queue'
			}) : this.queueRepeat ? (await this.setQueueRepeat(!1), {
				player: this,
				status: 'none'
			}) : void 0 : (await this.setTrackRepeat(!0), {
				player: this,
				status: 'track'
			});
		}
		async skip () {
			if (this.queue.length === 0) throw new Error('Queue is empty to skip');
			const t = this.queue.current;
			if (this.play(this.queue[0]), this.queueRepeat) {
				const e = TrackUtils.build({
					track: t.track ? t.track : null,
					info: {
						title: t.title ? t.title : null,
						identifier: t.identifier ? t.identifier : null,
						author: t.author ? t.author : null,
						length: t.duration ? t.duration : 1,
						isSeekable: t.isSeekable,
						isStream: t.isStream,
						uri: t.uri ? t.uri : null,
						thumbnail: t.thumbnail ? t.thumbnail : null
					}
				}, t.requester);
				return this.queue.add(e), this.queue.shift(), this;
			}
			return this.queue.shift(), this;
		}
		async skipto (t) {
			if (typeof t != 'number') throw new RangeError('<Player>#skipto() must be a number.');
			if (this.queue.length === 0) throw new Error('Queue is empty to skip');
			if (t > this.queue.size) throw new Error('There\'s only ' + this.queue.size + ' songs in queue.');
			const e = this.queue.current;
			if (this.play(this.queue[parseInt(`${t}`) - 1]), this.queueRepeat) {
				const s = TrackUtils.build({
					track: e.track ? e.track : null,
					info: {
						title: e.title ? e.title : null,
						identifier: e.identifier ? e.identifier : null,
						author: e.author ? e.author : null,
						length: e.duration ? e.duration : 1,
						isSeekable: e.isSeekable,
						isStream: e.isStream,
						uri: e.uri ? e.uri : null,
						thumbnail: e.thumbnail ? e.thumbnail : null
					}
				}, e.requester);
				this.queue.add(s);
				for (let e = 0; e < parseInt(`${t}`) - 1; e++) this.queue.push(this.queue.shift());
				return this.queue.shift(), this;
			}
			for (let e = 0; e < parseInt(`${t}`); e++) this.queue.shift();
			return this;
		}
		async move (t, e) {
			if (typeof t != 'number') throw new RangeError('<Player>#move() first must be a number.');
			if (t && !e) {
				if (parseInt(`${t}`) - 1 > this.queue.size) throw new Error('There\'s only ' + this.queue.size + ' songs in queue.');
				return this.arraymove(this.queue, parseInt(`${t}`) - 1, 0), this;
			}
			if (typeof e != 'number') throw new RangeError('<Player>#move() second must be a number.');
			if (parseInt(`${t}`) - 1 > this.queue.size) throw new Error('There\'s only ' + this.queue.size + ' songs in queue.');
			if (parseInt(`${e}`) - 1 > this.queue.size) throw new Error('There\'s only ' + this.queue.size + ' songs in queue.');
			return this.arraymove(this.queue, parseInt(`${t}`) - 1, parseInt(`${e}`) - 1), this;
		}
		setDistort (t) {
			return this.value = t || this.value, this.node.send({
				op: 'filters',
				guildId: this.guild,
				distortion: {
					distortion: this.value
				}
			}), this;
		}
		setTimescale (t, e, s) {
			return this.speed = t || this.speed, this.pitch = e || this.pitch, this.rate = s || this.rate, this.node.send({
				op: 'filters',
				guildId: this.guild,
				timescale: {
					speed: this.speed,
					pitch: this.pitch,
					rate: this.rate
				}
			}), this;
		}
		clearEffects () {
			return this.speed = 1, this.pitch = 1, this.rate = 1, this._8d = !1, this.bassboost = !1, this.nightcore = !1, this.vaporwave = !1, this.distortion = !1, this.clearEQ(), this.node.send({
				op: 'filters',
				guildId: this.guild
			}), this;
		}
		arraymove (t, e, s) {
			if (s >= t.length) {
				let e = s - t.length + 1;
				for (; e--;) t.push(void 0);
			}
			return t.splice(s, 0, t.splice(e, 1)[0]), t;
		}
	};
});