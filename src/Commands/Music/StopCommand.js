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
			/*
            SUB_COMMAND	1 = SubCommand
            SUB_COMMAND_GROUP: 2 = SubCommandGroup
            STRING: 3 = String
            INTEGER: 4 = Any integer between -2^53 and 2^53
            BOOLEAN: 5 = True or False
            USER: 6 = User Mention
            CHANNEL: 7 = Includes all channel types + categories
            ROLE: 8 = Role Mention
            MENTIONABLE: 9 = Includes users and roles
            NUMBER: 10 = Any double between -2^53 and 2^53
            */
			options: [],
			aliases: ['parar', 'leave'],
			run: this.run
		};
	}

	async run (ctx) {
		const player = await global.zuly.music.players.get(ctx.message.channel.guild.id);
		if (!ctx.message.member.voiceState.channelID) return ctx.message.channel.createMessage(`:x: ${ctx.message.author.mention} **|** ${ctx.idioma.player.noc2}`);
		if (!player) {
			return ctx.message.channel.createMessage(`:x: ${ctx.message.author.mention} **|** ${ctx.idioma.erela.not}`);
		}
		else {
			player.destroy();
			const embed = new global.zuly.manager.Ebl();
			embed.setDescription(`<:zu_mp3:882310253226635284> **|** ${ctx.idioma.erela.end}`);
			embed.setColor('#ffcbdb');
			embed.setFooter('⤷ zulybot.xyz', global.zuly.user.avatarURL);
			ctx.message.channel.createMessage({
				embeds: [embed.get()]
			});
		}
	}
};
