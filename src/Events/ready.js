module.exports = class ReadyEvent {
	constructor () {
		return {
			nome: 'ready',
			type: 'once',
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
			console.log(`[RAM] ${ram.toFixed(2)}mb`.cyan);
			global.zuly.users.map(g => global.zuly.users.delete(g.id));
		}, 3000);
		const {
			version
		} = require('../../package.json');
		const adg = await global.zuly.getRESTUser('726449359167684734');
		const status = [`zulybot.xyz | ${global.zuly.user.username} [v${version}]`, `I'm on ${global.zuly.guilds.size} servers | ${global.zuly.user.username} [v${version}]`, `Follow me on twitter @ZulyBot | ${global.zuly.user.username} [v${version}]`, `z!help | ${global.zuly.user.username} [v${version}]`, `z!upvote | ${global.zuly.user.username} [v${version}]`, `z!invite | ${global.zuly.user.username} [v${version}]`, `Join in my support server discord.gg/pyyyJpw5QW | ${global.zuly.user.username} [v${version}]`, `I was created by: ${adg.username}#${adg.discriminator}`];
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
		const job = new CronJob('00 15 21 * * *', function() {
			global.zuly.guilds.map(async guild => {
				const fnshop = await global.db.get(`fnshop-${guild.id}`);
				if (fnshop) {
					const canal = await global.zuly.getRESTChannel(fnshop);
					canal.createMessage('<a:zu_fortnite:894977940926910485> **|** https://fn.zulybot.xyz/shop-now.png');
				}
			});
		}, null, !0, 'America/Sao_Paulo');
		job.start();
	}
};