'use strict';

const erela_js_1 = require('erela.js');
class customFilter extends erela_js_1.Plugin {
	load () {
		erela_js_1.Structure.extend('Player', t => class extends t {
			constructor () {
				
			}
			set nightcore (t) {
				
			}
			set vaporwave (t) {
				
			}
			set bassboost (t) {
				
			}
			set pop (t) {
				
			}
			set soft (t) {
				
			}
			set treblebass (t) {
				
			}
			set eightD (t) {
				
			}
			set karaoke (t) {
				
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
				
			}
		});
	}
}
exports.customFilter = customFilter;