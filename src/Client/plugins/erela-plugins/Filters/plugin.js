'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.customFilter = void 0;
const erela_js_1 = require('erela.js');
class customFilter extends erela_js_1.Plugin {
	load () {
		erela_js_1.Structure.extend('Player', (Player) => class extends Player {
			constructor () {
				super(...arguments);
				// Private Filter Boolean
				this._nightcore = false;
				this._vaporwave = false;
				this._bassboost = false;
				this._pop = false;
				this._soft = false;
				this._treblebass = false;
				this._eightD = false;
				this._karaoke = false;
				this._vibrato = false;
				this._tremolo = false;
				// Private Filter Data
				this._resetData = {
					op: 'filters',
					guildId: this.guild,
				};
				this._nightcoreData = {
					op: 'filters',
					guildId: this.guild,
					timescale: {
						speed: 1.2999999523162842,
						pitch: 1.2999999523162842,
						rate: 1,
					},
				};
				this._vaporwaveData = {
					op: 'filters',
					guildId: this.guild,
					equalizer: [
						{ band: 1, gain: 0.3 },
						{ band: 0, gain: 0.3 },
					],
					timescale: { pitch: 0.5 },
					tremolo: { depth: 0.3, frequency: 14 },
				};
				this._bassboostData = {
					op: 'filters',
					guildId: this.guild,
					equalizer: [
						{ band: 0, gain: 0.6 },
						{ band: 1, gain: 0.67 },
						{ band: 2, gain: 0.67 },
						{ band: 3, gain: 0 },
						{ band: 4, gain: -0.5 },
						{ band: 5, gain: 0.15 },
						{ band: 6, gain: -0.45 },
						{ band: 7, gain: 0.23 },
						{ band: 8, gain: 0.35 },
						{ band: 9, gain: 0.45 },
						{ band: 10, gain: 0.55 },
						{ band: 11, gain: 0.6 },
						{ band: 12, gain: 0.55 },
						{ band: 13, gain: 0 },
					],
				};
				this._popData = {
					op: 'filters',
					guildId: this.guild,
					equalizer: [
						{ band: 0, gain: 0.65 },
						{ band: 1, gain: 0.45 },
						{ band: 2, gain: -0.45 },
						{ band: 3, gain: -0.65 },
						{ band: 4, gain: -0.35 },
						{ band: 5, gain: 0.45 },
						{ band: 6, gain: 0.55 },
						{ band: 7, gain: 0.6 },
						{ band: 8, gain: 0.6 },
						{ band: 9, gain: 0.6 },
						{ band: 10, gain: 0 },
						{ band: 11, gain: 0 },
						{ band: 12, gain: 0 },
						{ band: 13, gain: 0 },
					],
				};
				this._softData = {
					op: 'filters',
					guildId: this.guild,
					lowPass: {
						smoothing: 20.0
					}
				};
				this._treblebassData = {
					op: 'filters',
					guildId: this.guild,
					equalizer: [
						{ band: 0, gain: 0.6 },
						{ band: 1, gain: 0.67 },
						{ band: 2, gain: 0.67 },
						{ band: 3, gain: 0 },
						{ band: 4, gain: -0.5 },
						{ band: 5, gain: 0.15 },
						{ band: 6, gain: -0.45 },
						{ band: 7, gain: 0.23 },
						{ band: 8, gain: 0.35 },
						{ band: 9, gain: 0.45 },
						{ band: 10, gain: 0.55 },
						{ band: 11, gain: 0.6 },
						{ band: 12, gain: 0.55 },
						{ band: 13, gain: 0 },
					],
				};
				this._eightDData = {
					op: 'filters',
					guildId: this.guild,
					rotation: {
						rotationHz: 0.2
					}
				};
				this._karaokeData = {
					op: 'filters',
					guildId: this.guild,
					karaoke: {
						level: 1.0,
						monoLevel: 1.0,
						filterBand: 220.0,
						filterWidth: 100.0
					},
				};
				this._vibratoData = {
					op: 'filters',
					guildId: this.guild,
					vibrato: {
						frequency: 10,
						depth: 0.9
					}
				};
				this._tremoloData = {
					op: 'filters',
					guildId: this.guild,
					tremolo: {
						frequency: 10,
						depth: 0.5
					}
				};
			}
			// Setting the filter
			set nightcore (status) {
				this._nightcore = status;
				if (status) {
					this._vaporwave = false;
					this._bassboost = false;
					this._soft = false;
					this._pop = false;
					this._treblebass = false;
					this._eightD = false;
					this._karaoke = false;
					this._vibrato = false;
					this._tremolo = false;
					this.node.send(this._nightcoreData);
				}
				else {this._resetnode();}
			}
			set vaporwave (status) {
				this._vaporwave = status;
				if (status) {
					this._bassboost = false;
					this._nightcore = false;
					this._soft = false;
					this._pop = false;
					this._treblebass = false;
					this._eightD = false;
					this._karaoke = false;
					this._vibrato = false;
					this._tremolo = false;
					this.node.send(this._vaporwaveData);
				}
				else {this._resetnode();}
			}
			set bassboost (status) {
				this._bassboost = status;
				if (status) {
					this._nightcore = false;
					this._vaporwave = false;
					this._soft = false;
					this._pop = false;
					this._treblebass = false;
					this._eightD = false;
					this._karaoke = false;
					this._vibrato = false;
					this._tremolo = false;
					this.node.send(this._bassboostData);
				}
				else {this._resetnode();}
			}
			set pop (status) {
				this._pop = status;
				if (status) {
					this._nightcore = false;
					this._vaporwave = false;
					this._bassboost = false;
					this._soft = false;
					this._treblebass = false;
					this._eightD = false;
					this._karaoke = false;
					this._vibrato = false;
					this._tremolo = false;
					this.node.send(this._popData);
				}
				else {this._resetnode();}
			}
			set soft (status) {
				this._soft = status;
				if (status) {
					this._nightcore = false;
					this._vaporwave = false;
					this._bassboost = false;
					this._pop = false;
					this._treblebass = false;
					this._eightD = false;
					this._karaoke = false;
					this._vibrato = false;
					this._tremolo = false;
					this.node.send(this._softData);
				}
				else {this._resetnode();}
			}
			set treblebass (status) {
				this._treblebass = status;
				if (status) {
					this._nightcore = false;
					this._vaporwave = false;
					this._bassboost = false;
					this._pop = false;
					this._soft = false;
					this._eightD = false;
					this._karaoke = false;
					this._vibrato = false;
					this._tremolo = false;
					this.node.send(this._treblebassData);
				}
				else {this._resetnode();}
			}
			set eightD (status) {
				this._eightD = status;
				if (status) {
					this._nightcore = false;
					this._vaporwave = false;
					this._bassboost = false;
					this._pop = false;
					this._soft = false;
					this._treblebass = false;
					this._karaoke = false;
					this._vibrato = false;
					this._tremolo = false;
					this.node.send(this._eightDData);
				}
				else {this._resetnode();}
			}
			set karaoke (status) {
				this._karaoke = status;
				if (status) {
					this._nightcore = false;
					this._vaporwave = false;
					this._bassboost = false;
					this._pop = false;
					this._soft = false;
					this._treblebass = false;
					this._eightD = false;
					this._vibrato = false;
					this._tremolo = false;
					this.node.send(this._karaokeData);
				}
				else {this._resetnode();}
			}
			set vibrato (status) {
				this._vibrato = status;
				if (status) {
					this._nightcore = false;
					this._vaporwave = false;
					this._bassboost = false;
					this._pop = false;
					this._soft = false;
					this._treblebass = false;
					this._eightD = false;
					this._karaoke = false;
					this._tremolo = false;
					this.node.send(this._vibratoData);
				}
				else {this._resetnode();}
			}
			set tremolo (status) {
				this._tremolo = status;
				if (status) {
					this._nightcore = false;
					this._vaporwave = false;
					this._bassboost = false;
					this._pop = false;
					this._soft = false;
					this._treblebass = false;
					this._eightD = false;
					this._karaoke = false;
					this._vibrato = false;
					this.node.send(this._tremoloData);
				}
				else {this._resetnode();}
			}
			// Get Filter Status
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
				return this._treblebass;
			}
			get eightD () {
				return this._eightD;
			}
			get karaoke () {
				return this._karaoke;
			}
			get vibrato () {
				return this._vibrato;
			}
			get tremolo () {
				return this._tremolo;
			}
			// Reset Everything
			_resetnode () {
				this.node.send(this._resetData);
			}
			reset () {
				this._resetnode();
				this._nightcore = false;
				this._vaporwave = false;
				this._bassboost = false;
				this._soft = false;
				this._pop = false;
				this._treblebass = false;
				this._eightD = false;
				this._karaoke = false;
				this._vibrato = false;
				this._tremolo = false;
			}
		});
	}
}
exports.customFilter = customFilter;
