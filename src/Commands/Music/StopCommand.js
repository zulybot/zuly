module.exports = class StopCommand {
	constructor () {
		return {
			permissoes: {
				membro: [],
				bot: ['embedLinks'],
				dono: false
			},
			pt: {
				nome: 'stop',
				categoria: '🎵 » Música',
				desc: 'Para a música'
			},
			en: {
				nome: 'stop',
				categoria: '🎵 » Music',
				desc: 'Stop the music'
			},
			aliases: ['parar', 'leave'],
			run: this.run
		};
	}

	async run (ctx) {
		const player = await global.zuly.music.players.get(ctx.message.channel.guild.id);
		if (!ctx.message.member.voiceState.channelID) return ctx.send(`:x: ${ctx.message.author.mention} **|** ${ctx.idioma.player.noc2}`);
		if (!player) {
			return ctx.send(`:x: ${ctx.message.author.mention} **|** ${ctx.idioma.erela.not}`);
		}
		else {
			player.destroy();
			const embed = new global.zuly.manager.Ebl();
			embed.description(`<:zu_mp3:882310253226635284> **|** ${ctx.idioma.erela.end}`);
			embed.color('#ffcbdb');
			ctx.message.channel.createMessage(embed.create);
		}
	}
};
