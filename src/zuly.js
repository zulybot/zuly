require('colors');
const {
	Client,
	Collection
} = require('eris');
const {
	AutoPoster
} = require('topgg-autoposter');
const {
	token
} = require('./Config/config');
const {
	top
} = require('./API/keys');
const DiscordTogether = require('./Client/discord-together');
const client = new Client(token, {
	allowedMentions: {
		everyone: false,
		roles: true,
		users: true
	},
	autoReconnect: true,
	defaultImageFormat: 'png',
	defaultImageSize: 4096,
	disableEvents: {
		CHANNEL_UPDATE: true,
		GUILD_BAN_ADD: true,
		GUILD_BAN_REMOVE: true,
		GUILD_MEMBER_UPDATE: true,
		GUILD_ROLE_CREATE: true,
		GUILD_ROLE_DELETE: true,
		GUILD_ROLE_UPDATE: true,
		MESSAGE_DELETE: true,
		MESSAGE_DELETE_BULK: true,
		TYPING_START: true,
		PRESENCE_UPDATE: true,
	  },
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
	maxReconnectAttempts: Infinity,
	maxResumeAttempts: 50,
	maxShards: 'auto',
	messageLimit: 10,
	// opusOnly: false,
	// ratelimiterOffset
	// reconnectDelay
	requestTimeout: 30000,
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
client.discordTogether = new DiscordTogether(client);
client.commands = new Collection();
client.aliases = new Collection();
const Zuly = require('./Client/zulybot.js');
const ZulyBot = new Zuly(client);
ZulyBot.iniciar().then((zuly) => {
	console.log(`[CLIENT] ${zuly}, Tudo Carregado!`.brightMagenta);
});
client.topgg = new AutoPoster(top.gg.token, client)
	.on('posted', () => {
		console.log('[DBL] Posted stats to Top.gg!'.green);
	});
global.zuly = client;
global.zuly.manager = ZulyBot;
require('./ZulyUtilLoader');
