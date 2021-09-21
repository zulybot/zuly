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
		// CacheClear + RAM Monitor
		setInterval(() => {
			const ram = process.memoryUsage().rss / 1024 / 1024;
			console.log(`[RAM] ${ram.toFixed(2)}mb`.cyan);
			global.zuly.users.map(g => global.zuly.users.delete(g.id));
		}, 5000);
		// AUTO STATUS
		const { version } = require('../../package.json');

		const adg = await global.zuly.getRESTUser('726449359167684734');

		// Status Array

		const status = [
			`zulybot.xyz | ${global.zuly.user.username} [v${version}]`,
			`I'm on ${global.zuly.guilds.size} servers | ${global.zuly.user.username} [v${version}]`,
			`Follow me on twitter @ZulyBot | ${global.zuly.user.username} [v${version}]`,
			`z!help | ${global.zuly.user.username} [v${version}]`,
			`z!upvote | ${global.zuly.user.username} [v${version}]`,
			`z!invite | ${global.zuly.user.username} [v${version}]`,
			`Join in my support server discord.gg/pyyyJpw5QW | ${global.zuly.user.username} [v${version}]`,
			`I was created by: ${adg.username}#${adg.discriminator}`
		];

		// Presence Array

		const presence = [
			'online',
			'idle',
			'dnd'
		];

		setInterval(() => {
			global.zuly.editStatus(presence[Math.floor(Math.random() * presence.length)], {
				game: global.zuly.user.username,
				name: status[Math.floor(Math.random() * status.length)],
				type: 5
			});
		}, 1000 * 180);
		// Iniciando Sistema de Música
		global.zuly.music.init(global.zuly.user.id);
	}
};
