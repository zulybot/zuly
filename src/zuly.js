// Puxando as cores que iremos usar para fazer o console.log
require('colors');
// Puxando somente o que iremos usar do Eris.
const {
	Client,
	Collection
} = require('eris');
// Puxando somente o que iremos usar do TOPGG.
const {
	AutoPoster
} = require('topgg-autoposter');
// Puxando o token do arquivo de configuração
const {
	token
} = require('./Config/config');
const {
	top
} = require('./API/keys');
// Puxando o arquivo do discord-together, já que ela que faz os comandos do discord-together funcionar
const DiscordTogether = require('./Client/discord-together');
// Criando o client, que no caso é nosso bot.
const client = new Client(token, {
	allowedMentions: {
		everyone: false,
		roles: true,
		users: true
	},
	autoreconnect: true,
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
// Iniciando o discord-together
client.discordTogether = new DiscordTogether(client);
// Criando as coleções de comandos/aliases
client.commands = new Collection();
client.aliases = new Collection();
// Puxando a iniciação do bot
const Zuly = require('./Client/zulybot.js');
const ZulyBot = new Zuly(client);
// Iniciando o bot
ZulyBot.iniciar().then((zuly) => {
	console.log(`[CLIENT] ${zuly}, Tudo Carregado!`.brightMagenta);
});
// TOPGG AutoPoster
client.topgg = new AutoPoster(top.gg.token, client)
	.on('posted', () => {
		console.log('[DBL] Posted stats to Top.gg!'.green);
	});
// Definindo o bot como variavel global, para que seja mais fácil de acessar.
global.zuly = client;
global.zuly.manager = ZulyBot;
// Puxando o carregador.
require('./ZulyUtilLoader');
