require('colors');
const { Client, Collection } = require('discord.js');
const { REST } = require('@discordjs/rest');
const { AutoPoster } = require('./CustomPackages/DBLAutoPoster');
const { token } = require('./Config/config');
const { top } = require('./API/keys');
const { GiveawaysManager } = require('discord-giveaways');
const giveawayModel = require('./Schemas/GiveawaySchema');
const SnakeGame = require('./Helpers/SnakeGame');
// Creating the client
const client = new Client({
	restTimeOffset: 1,
	defaultImageFormat: 'png',
	defaultImageSize: 4096,
	intents: [
		'GUILDS',
		'GUILD_BANS',
		'GUILD_MEMBERS',
		'GUILD_MESSAGES',
		'DIRECT_MESSAGES',
		'GUILD_VOICE_STATES',
		'GUILD_MESSAGE_REACTIONS',
		'GUILD_EMOJIS_AND_STICKERS'
	],
	partials: [
		'USER',
		'GUILD',
		'CHANNEL',
		'MESSAGE',
		'REACTION'
	]
});

// Games
client.snakecord = new SnakeGame({
	title: 'SnakeCord | Zuly',
	color: '#ffcbdb',
	timestamp: false,
	gameOverTitle: 'Fim do Jogo',
});

// Plugins
client.restAPI = new REST({ version: '9' }).setToken(token);
client.routes = require('discord-api-types/v9').Routes;
client.backup = require('discord-backup');
client.version = require('../package.json').version;
const GiveawayManagerWithOwnDatabase = class extends GiveawaysManager {
	async getAllGiveaways () {
		return giveawayModel.find().lean().exec();
	}
	async saveGiveaway (messageId, giveawayData) {
		await giveawayModel.create(giveawayData);
		return true;
	}
	async editGiveaway (messageId, giveawayData) {
		await giveawayModel.updateOne({ messageId }, giveawayData, { omitUndefined: true }).exec();
		return true;
	}
	async deleteGiveaway (messageId) {
		await giveawayModel.deleteOne({ messageId }).exec();
		return true;
	}
};
client.giveawaysManager = new GiveawayManagerWithOwnDatabase(client, {
	updateCountdownEvery: 5000,
	default: {
		botsCanWin: false,
		embedColor: '#FFCBDB',
		embedColorEnd: '#FFCBDB',
		reaction: '🎁'
	}
});

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

require('./Client/Handler/eventos');
require('./Database/DatabaseConnect');
require('./Utils/ZulyFunctions');
require('./Containers/Premium/bot');