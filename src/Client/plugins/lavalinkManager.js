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
const Facebook = require('./erela-plugins/Facebook/index');
const Filter = require('./erela-plugins/Filters/index');

const clientID = spotify.id;
const clientSecret = spotify.secret;

// require('./zulyPlayer');
global.zuly.music = new Manager({
	nodes: nodes,
	plugins: [
		// DEEZER PLUGIN
		new Deezer(),
		// FACEBOOK PLUGIN
		new Facebook(),
		// FILTERS PLUGIN
		new Filter(),
		// SPOTIFY PLUGIN
		new Spotify({
			clientID,
			clientSecret
		})
	],
	autoPlay: true,
	send (id, payload) {
		const guild = global.zuly.guilds.get(id);
		if (guild) guild.shard.sendWS(payload.op, payload.d);
	}
})
	.on('nodeConnect', node => console.log(`[LAVALINK] Node ${node.options.name} conectado`.green))
	.on('nodeError', (node, error) => console.log(`[LAVALINK] Node ${node.options.name} teve um erro: ${error.message}`.red))
	.on('playerCreate', (player) => {
		player.set('rateLimitStatus', {
			status: false
		});
		player.set('24h', {
			status: false
		});
	})
	.on('trackStart', async (player, track) => {
		const ch = await global.zuly.getRESTChannel(player.textChannel);
		let idioma = require('../../Config/idiomas.js');
		let lang = await global.db.get(`idioma-${ch.guild.id}`) || 'pt_br';
		lang = lang.replace(/-/g, '_');
		idioma = idioma[lang];

		const embed = new global.zuly.manager.Ebl();
		embed.description(`<:zu_mp3:882310253226635284> **|** ${idioma.erela.np} **${track.title}**`);
		embed.color('#ffcbdb');
		ch.createMessage(embed.create);
	})
	.on('queueEnd', async (player) => {
		const ch = await global.zuly.getRESTChannel(player.textChannel);
		let idioma = require('../../Config/idiomas.js');
		let lang = await global.db.get(`idioma-${ch.guild.id}`) || 'pt_br';
		lang = lang.replace(/-/g, '_');
		idioma = idioma[lang];

		const embed = new global.zuly.manager.Ebl();
		embed.description(`<:zu_mp3:882310253226635284> **|** ${idioma.erela.end}`);
		embed.color('#ffcbdb');
		ch.createMessage(embed.create);
		player.destroy();
	});
