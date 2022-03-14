require('colors');
const {
	Client,
	Collection
} = require('eris');

const {
	AutoPoster
} = require('./CustomPackages/DBLAutoPoster');

const {
	token
} = require('./Config/config');

const {
	top
} = require('./API/keys');

const {
	GiveawaysManager
} = require('eris-giveaways');

const client = new Client(token, {
	restMode: true,
	autoReconnect: true,
	defaultImageFormat: 'png',
	defaultImageSize: 4096,
	intents: [
		'guilds',
		'guildBans',
		'guildMembers',
		'guildMessages',
		'guildVoiceStates',
		'guildMessageReactions',
		'directMessages'
	],
	rest: {
		baseURL: '/api/v9',
		domain: 'canary.discord.com',
		latencyThreshold: 40000
	},
});

client.giveawaysManager = new GiveawaysManager(client, {
	storage: './src/db/giveaways.json',
	updateCountdownEvery: 5000,
	default: {
		botsCanWin: false,
		embedColor: 0xFFCBDB,
		embedColorEnd: 0xFFCBDB,
		reaction: '🎁'
	}
});

client.commands = new Collection();
client.events = new Collection();
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