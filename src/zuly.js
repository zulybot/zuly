require('colors');
const {
	Client,
	Collection
} = require('eris');

const {
	token,
	stats
} = require('./config');

const Statcord = require('statcord-eris');

const DiscordTogether = require('./client/discord-together');

const client = new Client(token, {
	allowedMentions: {
		everyone: false,
		roles: false,
		users: true
	},
	autoreconnect: true,
	defaultImageFormat: 'png',
	defaultImageSize: 4096,
	// disableEvents: []
	// firstShardID: 0
	getAllUsers: false,
	// guildCreateTimeout: 2000
	// guildSubscriptions: true
	intents: [
		'guilds',
		'guildMembers',
		'guildMessages',
		'guildVoiceStates',
		'guildMessageReactions'
	],
	largeThreshold: 200,
	// lastShardID
	// latencyThreshold
	// maxReconnectAttempts: Infinity
	maxResumeAttempts: 20,
	maxShards: 'auto',
	messageLimit: 100,
	opusOnly: false,
	// ratelimiterOffset
	// reconnectDelay
	// requestTimeout: 15000
	rest: {
		// agent
		baseURL: '/api/v9',
		// decodeReasons
		// disableLatencyCompensation
		domain: 'canary.discord.com',
		latencyThreshold: 40000
		// ratelimiterOffset
		// requestTimeout
	},
	restMode: true
	// seedVoiceConnections
	// ws
});

client.statcord = new Statcord.Client({
	key: stats,
	client,
	postCpuStatistics: true,
	postMemStatistics: true,
	postNetworkStatistics: true,
	autopost: true
});

client.discordTogether = new DiscordTogether(client);

client.commands = new Collection();
client.aliases = new Collection();
// client.events = new Collection()

const Zuly = require('./client/zulybot.js');
const ZulyBot = new Zuly(client);

ZulyBot.iniciar().then((zuly) => {
	console.log(`[CLIENT] ${zuly}, Tudo Carregado!`.brightMagenta);
});

client.statcord.on('post', status => {
	if (!status) console.log('[STATCORD] Successful post');
	else console.error(status);
});

client.statcord.on('autopost-start', () => {
	console.log('[STATCORD] Started autopost');
});

global.zuly = client;
global.zuly.manager = ZulyBot;

require('./ZulyUtilLoader');
