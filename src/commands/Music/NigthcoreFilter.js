module.exports = class StopCommand {
	constructor () {
		return {
			permissoes: {
				membro: [],
				bot: ['embedLinks'],
				dono: true
			},
			pt: {
				nome: 'nightcore',
				categoria: '🎵 » Música',
				desc: 'Ativa o filtro nightcore'
			},
			en: {
				nome: 'nightcore',
				categoria: '🎵 » Music',
				desc: 'Activates the nightcore filter'
			},
			aliases: ['nc', 'night'],
			run: this.run
		};
	}

	async run (ctx) {
		const player = await global.zuly.music.players.get(ctx.message.channel.guild.id);
		if (!ctx.message.member.voiceState.channelID) return ctx.send(`:x: ${ctx.message.author.mention} **|** ${ctx.idioma.player.noc2}`);
		if (!player) {
			return ctx.send(`:x: ${ctx.message.author.mention} **|** ${ctx.idioma.erela.not}`);
		}
		if (player.nightcore) {
			player.nigthcore = false;
			return ctx.send(`✅ ${ctx.message.author.mention} **|** ${ctx.idioma.filtros.desativado.replace('%f', 'nightcore')}`);
		}
		else {
			player.nigthcore = true;
			return ctx.send(`✅ ${ctx.message.author.mention} **|** ${ctx.idioma.filtros.ativado.replace('%f', 'nightcore')}`);
		}
	}
};
