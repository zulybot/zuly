module.exports = class ReadyEvent {
	constructor () {
		return {
			nome: 'ready',
			run: this.run
		};
	}
	async run () {
		console.log(`[ZULY] ${global.zuly.user.username}#${global.zuly.user.discriminator} Ligada`.green);
		setInterval(() => {
			if (global.gc) {
				global.gc();
			}
			const ram = process.memoryUsage().rss / 1024 / 1024;
			global.zuly.unavailableGuilds.forEach(guild => {
				console.log(guild);
			});
			console.log(`[RAM] ${ram.toFixed(2)}mb`.cyan);
		}, 5000);
		try {
			require('../../assets/images/utils/fnshop.png');
		}
		catch (e) {
			await global.zuly.download('https://fn.zulybot.xyz/shop-now.png', './assets/images/utils/fnshop.png').then(()=> console.log('downloaded file no issues...'))
				.catch(e => console.error('error while downloading', e));;
		}
		const {
			version
		} = require('../../package.json');
		const adg = await global.zuly.getRESTUser('726449359167684734');
		const status = [`zulybot.xyz | ${global.zuly.user.username} [v${version}]`, `I'm on ${global.zuly.guilds.size} servers | ${global.zuly.user.username} [v${version}]`, `Follow me on twitter @ZulyBot | ${global.zuly.user.username} [v${version}]`, `/help | ${global.zuly.user.username} [v${version}]`, `/upvote | ${global.zuly.user.username} [v${version}]`, `/invite | ${global.zuly.user.username} [v${version}]`, `Join in my support server discord.gg/pyyyJpw5QW | ${global.zuly.user.username} [v${version}]`, `I was created by: ${adg.username}#${adg.discriminator}`];
		const presence = ['online', 'idle', 'dnd'];
		setInterval(async () => {
			global.zuly.editStatus(presence[Math.floor(Math.random() * presence.length)], {
				game: global.zuly.user.username,
				name: status[Math.floor(Math.random() * status.length)],
				type: 5
			});
		}, 1000 * 180);
		global.zuly.music.init(global.zuly.user.id);
		const CronJob = require('cron').CronJob;
		// fortnite-shop
		const job = new CronJob('00 15 21 * * *', async function() {
			const fs = require('fs');
			fs.unlink('./assets/images/utils/fnshop.png', err => {
				if (err) {console.log(err);}
				else {console.log('\nDeleted file: fnshop.png');}
			});
			await global.zuly.download('https://fn.zulybot.xyz/shop-now.png', './assets/images/utils/fnshop.png').then(()=> console.log('downloaded file no issues...'));
			global.zuly.guilds.forEach(async guild => {
				const fnshop = await global.db.get(`fnshop-${guild.id}`);
				if (fnshop) {
					const canal = await global.zuly.getRESTChannel(fnshop);
					canal.createMessage('<a:zu_fortnite:894977940926910485> **|** Fortnite Shop: https://fn.zulybot.xyz/shop-now.png');
				}
			});
		}, null, !0, 'America/Sao_Paulo');
		// start cron-jobs
		job.start();
		global.zuly.statcord.autopost();
		require('../Integrations/app');
	}
};
