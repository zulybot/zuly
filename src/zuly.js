require('colors');
const {
	Client,
	Collection
} = require('eris');
const {
	AutoPoster
} = require('./CustomPackages/DBLAutoPoster');
const {
	token,
	statcord
} = require('./Config/config');
const {
	top
} = require('./API/keys');
const Statcord = require('statcord-eris');
const DiscordTogether = require('./Client/discord-together');
const client = new Client(token, {
	autoReconnect: !0,
	defaultImageFormat: 'png',
	defaultImageSize: 4096,
	getAllUsers: !1,
	intents: [
		'allNonPrivileged',
		'allPrivileged',
	],
	largeThreshold: 200,
	maxReconnectAttempts: Infinity,
	maxResumeAttempts: 100,
	maxShards: 'auto',
	messageLimit: 50,
	requestTimeout: 30000,
	rest: {
		baseURL: '/api/v9',
		domain: 'discord.com',
		latencyThreshold: 40000
	},
	restMode: !0
});
client.statcord = new Statcord.Client({
	key: statcord,
	client,
	postCpuStatistics: true,
	postMemStatistics: true,
	postNetworkStatistics: true
});
client.statcord.on('autopost-start', () => {
	console.log('[STATCORD] Started autopost'.green);
});
client.discordTogether = new DiscordTogether(client);
client.commands = new Collection();
client.aliases = new Collection();
client.on('debug', console.log);
const Zuly = require('./Client/zulybot.js');
const ZulyBot = new Zuly(client);
ZulyBot.iniciar().then((zuly) => {
	console.log(`[CLIENT] ${zuly}, Tudo Carregado!`.brightMagenta);
});
client.topgg = new AutoPoster(top.gg.token, client).on('posted', () => {
	console.log('[DBL] Posted stats to Top.gg!'.green);
});
global.zuly = client;
global.zuly.manager = ZulyBot;
require('./ZulyUtilLoader');
