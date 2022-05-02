'use strict';

const DJSPoster_1 = require('./structs/DJSPoster');
const ErisPoster_1 = require('./structs/ErisPoster');
const DJSSharderPoster_1 = require('./structs/DJSSharderPoster');
const RosePoster_1 = require('./structs/RosePoster');

function AutoPoster (e, r, t) {
	if (!e) throw new Error('Top.gg Tokeni eksik');
	if (!r) throw new Error('Client eksik');
	let s, o, i;
	try {
		s = require.cache[require.resolve('discord.js')];
	}
	catch (e) {}
	try {
		o = require.cache[require.resolve('eris')];
	}
	catch (e) {}
	try {
		i = require.cache[require.resolve('discord-rose')];
	}
	catch (e) {}
	if (s && r instanceof s.exports.Client) return new DJSPoster_1.DJSPoster(e, r, t);
	if (o && r instanceof o.exports.Client) return new ErisPoster_1.ErisPoster(e, r, t);
	if (s && r instanceof s.exports.ShardingManager) return new DJSSharderPoster_1.DJSSharderPoster(e, r, t);
	if (i && r instanceof i.exports.Master) return new RosePoster_1.RosePoster(e, r, t);
	throw new Error('Desteklenmeyen client');
}
exports.AutoPoster = AutoPoster;
const DJSPoster_2 = require('./structs/DJSPoster');
Object.defineProperty(exports, 'DJSPoster', {
	enumerable: !0,
	get: function() {
		return DJSPoster_2.DJSPoster;
	}
});
const ErisPoster_2 = require('./structs/ErisPoster');
Object.defineProperty(exports, 'ErisPoster', {
	enumerable: !0,
	get: function() {
		return ErisPoster_2.ErisPoster;
	}
});
const DJSSharderPoster_2 = require('./structs/DJSSharderPoster');
Object.defineProperty(exports, 'DJSSharderPoster', {
	enumerable: !0,
	get: function() {
		return DJSSharderPoster_2.DJSSharderPoster;
	}
});
const RosePoster_2 = require('./structs/RosePoster');

