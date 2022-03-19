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
		global.zuly.user.setActivity(global.zuly.user.username, {
			game: global.zuly.user.username,
			type: 5
		});

		const adg = await global.zuly.users.fetch('726449359167684734');
		const status = [`zulybot.xyz | ${global.zuly.user.username} [v${global.zuly.version}]`, `I'm on ${global.zuly.guilds.cache.size} servers | ${global.zuly.user.username} [v$global.zuly.version]`, `Follow me on twitter @ZulyBot | ${global.zuly.user.username} [v$global.zuly.version]`, `/help | ${global.zuly.user.username} [v$global.zuly.version]`, `/upvote | ${global.zuly.user.username} [v$global.zuly.version]`, `/invite | ${global.zuly.user.username} [v$global.zuly.version]`, `Join in my support server discord.gg/pyyyJpw5QW | ${global.zuly.user.username} [v$global.zuly.version]`, `I was created by: ${adg.username}#${adg.discriminator}`];
		const presence = ['online', 'idle', 'dnd'];

		setInterval(async () => {
			global.zuly.user.setStatus(presence[Math.floor(Math.random() * presence.length)]);
			global.zuly.user.setActivity(status[Math.floor(Math.random() * status.length)], {
				game: status[Math.floor(Math.random() * status.length)],
				type: 5
			});
		}, 1000 * 180);

		require('../Integrations/app');
	}
};
