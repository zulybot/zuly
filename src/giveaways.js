const {
	GiveawaysManager
} = require('eris-giveaways');

global.zuly.giveawaysManager = new GiveawaysManager(global.zuly, {
	storage: './data/giveaways.json',
	updateCountdownEvery: 10000,
	default: {
		botsCanWin: false,
		embedColor: 16763867,
		embedColorEnd: 16763867,
		reaction: '🎁'
	}
});