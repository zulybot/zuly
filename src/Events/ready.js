module.exports = class ReadyEvent {
	constructor () {
		return {
			nome: 'ready',
			run: this.run
		};
	}
	async run () {
		// Carregando Handler
		require('../Client/Handler/comandos');
		// Mostrando que o bot está ligado.
		console.log(`[ZULY] ${global.zuly.user.username}#${global.zuly.user.discriminator} Ligada`.green);
		global.zuly.editStatus('idle', {
			game: global.zuly.user.username,
			name: 'Starting...',
			type: 5
		});
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
		global.zuly.statcord.autopost();
		require('../Integrations/app');
	}
};
