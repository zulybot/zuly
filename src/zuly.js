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
		everyone: !1,
		roles: !0,
		users: !0
	},
	autoReconnect: !0,
	defaultImageFormat: 'png',
	defaultImageSize: 4096,
	disableEvents: {
		CHANNEL_UPDATE: !0,
		GUILD_BAN_ADD: !0,
		GUILD_BAN_REMOVE: !0,
		GUILD_MEMBER_UPDATE: !0,
		GUILD_ROLE_CREATE: !0,
		GUILD_ROLE_DELETE: !0,
		GUILD_ROLE_UPDATE: !0,
		MESSAGE_DELETE: !0,
		MESSAGE_DELETE_BULK: !0,
		TYPING_START: !0,
		PRESENCE_UPDATE: !0,
	},
	getAllUsers: !1,
	intents: ['guilds', 'guildMembers', 'guildMessages', 'guildVoiceStates', 'guildMessageReactions'],
	largeThreshold: 200,
	maxReconnectAttempts: Infinity,
	maxResumeAttempts: 50,
	maxShards: 'auto',
	messageLimit: 10,
	requestTimeout: 30000,
	rest: {
		baseURL: '/api/v9',
		domain: 'canary.discord.com',
		latencyThreshold: 40000
	},
	restMode: !0
});
client.discordTogether = new DiscordTogether(client);
client.commands = new Collection();
client.aliases = new Collection();
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