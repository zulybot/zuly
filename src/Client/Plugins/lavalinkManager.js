require('colors');
const {
	spotify
} = require('../../Config/player');
const {
	Manager
} = require('erela.js');
const nodes = require('./nodes');
const Deezer = require('./erela-plugins/Deezer/index');
const Spotify = require('./erela-plugins/Spotify/index');
const clientID = spotify.id;
const clientSecret = spotify.secret;
require('./zulyPlayer');
global.zuly.music = new Manager({
	nodes: nodes,
	plugins: [new Deezer(), new Spotify({
		clientID,
		clientSecret
	})],
	autoPlay: !0,
	send (id, payload) {
		const guild = global.zuly.guilds.get(id);
		if (guild) guild.shard.sendWS(payload.op, payload.d);
	}
}).on('nodeConnect', node => console.log(`[LAVALINK] Node ${node.options.name} conectado`.green)).on('nodeError', (node, error) => console.log(`[LAVALINK] Node ${node.options.name} teve um erro: ${error.message}`.red)).on('playerCreate', (player) => {
	player.set('rateLimitStatus', {
		status: !1
	});
	player.set('24h', {
		status: !1
	});
}).on('trackStart', async (player, track) => {
	const ch = await global.zuly.getRESTChannel(player.textChannel);
	let idioma = require('../../Config/idiomas.js');
	let lang = await global.db.get(`idioma-${ch.guild.id}`) || 'pt_br';
	lang = lang.replace(/-/g, '_');
	idioma = idioma[lang];
	const embed = new global.zuly.manager.Ebl();
	embed.setDescription(`<:zu_mp3:882310253226635284> **|** ${idioma.erela.np} **${track.title}**`);
	embed.setColor('#ffcbdb');
	embed.setFooter('⤷ zulybot.xyz', global.zuly.user.avatarURL);
	ch.createMessage({
		embed: embed.get()
	});
}).on('queueEnd', async (player) => {
	const ch = await global.zuly.getRESTChannel(player.textChannel);
	let idioma = require('../../Config/idiomas.js');
	let lang = await global.db.get(`idioma-${ch.guild.id}`) || 'pt_br';
	lang = lang.replace(/-/g, '_');
	idioma = idioma[lang];
	const embed = new global.zuly.manager.Ebl();
	embed.setDescription(`<:zu_mp3:882310253226635284> **|** ${idioma.erela.end}`);
	embed.setColor('#ffcbdb');
	embed.setFooter('⤷ zulybot.xyz', global.zuly.user.avatarURL);
	ch.createMessage({
		embed: embed.get()
	});
	player.destroy();
}).on('playerMove', async (player, currentChannel, newChannel) => {
	player.voiceChannel = await global.zuly.getRESTChannel(newChannel);
}).on('socketClosed', (player, payload) => {
	if(payload.byRemote == true) {
		player.destroy();
	}
});