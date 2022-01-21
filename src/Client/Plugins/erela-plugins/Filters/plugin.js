'use strict';
Object.defineProperty(exports, '__esModule', {
	value: !0
}), exports.customFilter = void 0;
const erela_js_1 = require('erela.js');
class customFilter extends erela_js_1.Plugin {
	load () {
		erela_js_1.Structure.extend('Player', t => class extends t {
			constructor () {
				super(...arguments), this._nightcore = !1, this._vaporwave = !1, this._bassboost = !1, this._pop = !1, this._soft = !1, this._treblebass = !1, this._eightD = !1, this._karaoke = !1, this._resetData = {
					op: 'filters',
					guildId: this.guild
				}, this._nightcoreData = {
					op: 'filters',
					guildId: this.guild,
					timescale: {
						speed: 1.2999999523162842,
						pitch: 1.2999999523162842,
						rate: 1
					}
				}, this._vaporwaveData = {
					op: 'filters',
					guildId: this.guild,
					equalizer: [{
						band: 1,
						gain: 0.3
					}, {
						band: 0,
						gain: 0.3
					}],
					timescale: {
						pitch: 0.5
					},
					tremolo: {
						depth: 0.3,
						frequency: 14
					}
				}, this._bassboostData = {
					op: 'filters',
					guildId: this.guild,
					equalizer: [{
						band: 0,
						gain: 0.6
					}, {
						band: 1,
						gain: 0.67
					}, {
						band: 2,
						gain: 0.67
					}, {
						band: 3,
						gain: 0
					}, {
						band: 4,
						gain: -0.5
					}, {
						band: 5,
						gain: 0.15
					}, {
						band: 6,
						gain: -0.45
					}, {
						band: 7,
						gain: 0.23
					}, {
						band: 8,
						gain: 0.35
					}, {
						band: 9,
						gain: 0.45
					}, {
						band: 10,
						gain: 0.55
					}, {
						band: 11,
						gain: 0.6
					}, {
						band: 12,
						gain: 0.55
					}, {
						band: 13,
						gain: 0
					}]
				}, this._popData = {
					op: 'filters',
					guildId: this.guild,
					equalizer: [{
						band: 0,
						gain: 0.65
					}, {
						band: 1,
						gain: 0.45
					}, {
						band: 2,
						gain: -0.45
					}, {
						band: 3,
						gain: -0.65
					}, {
						band: 4,
						gain: -0.35
					}, {
						band: 5,
						gain: 0.45
					}, {
						band: 6,
						gain: 0.55
					}, {
						band: 7,
						gain: 0.6
					}, {
						band: 8,
						gain: 0.6
					}, {
						band: 9,
						gain: 0.6
					}, {
						band: 10,
						gain: 0
					}, {
						band: 11,
						gain: 0
					}, {
						band: 12,
						gain: 0
					}, {
						band: 13,
						gain: 0
					}]
				}, this._softData = {
					op: 'filters',
					guildId: this.guild,
					lowPass: {
						smoothing: 20
					}
				}, this._treblebassData = {
					op: 'filters',
					guildId: this.guild,
					equalizer: [{
						band: 0,
						gain: 0.6
					}, {
						band: 1,
						gain: 0.67
					}, {
						band: 2,
						gain: 0.67
					}, {
						band: 3,
						gain: 0
					}, {
						band: 4,
						gain: -0.5
					}, {
						band: 5,
						gain: 0.15
					}, {
						band: 6,
						gain: -0.45
					}, {
						band: 7,
						gain: 0.23
					}, {
						band: 8,
						gain: 0.35
					}, {
						band: 9,
						gain: 0.45
					}, {
						band: 10,
						gain: 0.55
					}, {
						band: 11,
						gain: 0.6
					}, {
						band: 12,
						gain: 0.55
					}, {
						band: 13,
						gain: 0
					}]
				}, this._eightDData = {
					op: 'filters',
					guildId: this.guild,
					rotation: {
						rotationHz: 0.1
					}
				}, this._karaokeData = {
					op: 'filters',
					guildId: this.guild,
					karaoke: {
						level: 1,
						monoLevel: 1,
						filterBand: 220,
						filterWidth: 100
					}
				};
			}
			set nightcore (t) {
				this._nightcore = t, t ? (this._vaporwave = !1, this._bassboost = !1, this._soft = !1, this._pop = !1, this._treblebass = !1, this._eightD = !1, this._karaoke = !1, this.node.send(this._nightcoreData)) : this._resetnode();
			}
			set vaporwave (t) {
				this._vaporwave = t, t ? (this._bassboost = !1, this._nightcore = !1, this._soft = !1, this._pop = !1, this._treblebass = !1, this._eightD = !1, this._karaoke = !1, this.node.send(this._vaporwaveData)) : this._resetnode();
			}
			set bassboost (t) {
				this._bassboost = t, t ? (this._nightcore = !1, this._vaporwave = !1, this._soft = !1, this._pop = !1, this._treblebass = !1, this._eightD = !1, this._karaoke = !1, this.node.send(this._bassboostData)) : this._resetnode();
			}
			set pop (t) {
				this._pop = t, t ? (this._nightcore = !1, this._vaporwave = !1, this._bassboost = !1, this._soft = !1, this._treblebass = !1, this._eightD = !1, this._karaoke = !1, this.node.send(this._popData)) : this._resetnode();
			}
			set soft (t) {
				this._soft = t, t ? (this._nightcore = !1, this._vaporwave = !1, this._bassboost = !1, this._pop = !1, this._treblebass = !1, this._eightD = !1, this._karaoke = !1, this.node.send(this._softData)) : this._resetnode();
			}
			set treblebass (t) {
				this._treblebass = t, t ? (this._nightcore = !1, this._vaporwave = !1, this._bassboost = !1, this._pop = !1, this._soft = !1, this._eightD = !1, this._karaoke = !1, this.node.send(this._treblebassData)) : this._resetnode();
			}
			set eightD (t) {
				this._eightD = t, t ? (this._nightcore = !1, this._vaporwave = !1, this._bassboost = !1, this._pop = !1, this._soft = !1, this._treblebass = !1, this._karaoke = !1, this.node.send(this._eightDData)) : this._resetnode();
			}
			set karaoke (t) {
				this._karaoke = t, t ? (this._nightcore = !1, this._vaporwave = !1, this._bassboost = !1, this._pop = !1, this._soft = !1, this._treblebass = !1, this._EightD = !1, this.node.send(this._karaokeData)) : this._resetnode();
			}
			get nightcore () {
				return this._nightcore;
			}
			get vaporwave () {
				return this._vaporwave;
			}
			get bassboost () {
				return this._bassboost;
			}
			get pop () {
				return this._pop;
			}
			get soft () {
				return this._soft;
			}
			get treblebass () {
				return this.treblebass;
			}
			get eightD () {
				return this._eightD;
			}
			get karaoke () {
				return this._karaoke;
			}
			_resetnode () {
				this.node.send(this._resetData);
			}
			reset () {
				this._resetnode(), this._nightcore = !1, this._vaporwave = !1, this._bassboost = !1, this._soft = !1, this._pop = !1, this._treblebass = !1, this._eightD = !1, this._karaoke = !1;
			}
		});
	}
}
exports.customFilter = customFilter;