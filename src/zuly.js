require('colors');
const { Client, Collection } = require('discord.js');
const { REST } = require('@discordjs/rest');
const { AutoPoster } = require('./CustomPackages/DBLAutoPoster');
const { token } = require('./Config/config');
const { top } = require('./API/keys');
const { ImgurClient } = require('imgur');
const SnakeGame = require('./Helpers/SnakeGame');
// Creating the client
const client = new Client({
	restTimeOffset: 1,
	shardCount: 1,
		intents: [
		'GUILDS',
		'GUILD_MEMBERS',
		'GUILD_MESSAGES',
		'GUILD_MESSAGE_REACTIONS',
		'GUILD_EMOJIS_AND_STICKERS'
	],
	partials: [
		'USER',
		'GUILD',
		'CHANNEL',
		'MESSAGE',
		'REACTION'
	],
});
// Games
client.snakecord = new SnakeGame({
	title: 'SnakeCord | Zuly',
	color: '#ffcbdb',
	timestamp: false,
	gameOverTitle: 'Fim do Jogo',
});
// Plugins
client.wait = require('node:timers/promises').setTimeout;
client.restAPI = new REST({ version: '9' }).setToken(token);
client.routes = require('discord-api-types/v9').Routes;
client.backup = require('discord-backup');
client.version = require('../package.json').version;
const { imgur } = require('./API/keys');
client.imgur = new ImgurClient({ clientId: imgur.id });
// Collections
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

// require('./Client/Plugins/lavalinkManager');
require('./Client/Handler/eventos');
require('./Database/DatabaseConnect');
require('./Utils/ZulyFunctions');
