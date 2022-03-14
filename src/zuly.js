require('colors');
const {
	Client,
	Collection
} = require('discord.js');

const {
	AutoPoster
} = require('./CustomPackages/DBLAutoPoster');

const {
	token
} = require('./Config/config');

const {
	top
} = require('./API/keys');

const client = new Client({
	restTimeOffset: 1,
	defaultImageFormat: 'png',
	defaultImageSize: 4096,
	intents: [
		'GUILDS',
		'GUILD_BANS',
		'GUILD_MEMBERS',
		'GUILD_MESSAGES',
		'GUILD_VOICE_STATES',
		'GUILD_MESSAGE_REACTIONS',
		'DIRECT_MESSAGES'
	]
});

client.commands = new Collection();
client.events = new Collection();
client.aliases = new Collection();

const Zuly = require('./Client/zulybot.js');
const ZulyBot = new Zuly(client);

ZulyBot.iniciar(token).then((zuly) => {
	console.log(`[CLIENT] ${zuly}, Tudo Carregado!`.brightMagenta);
});

client.topgg = new AutoPoster(top.gg.token, client).on('posted', () => {
	console.log('[DBL] Posted stats to Top.gg!'.green);
});

global.zuly = client;
global.zuly.manager = ZulyBot;

require('./ZulyUtilLoader');