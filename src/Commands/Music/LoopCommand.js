module.exports = class NowplayingCommand {
	constructor () {
		return {
			permissoes: {
				membro: [],
				bot: ['embedLinks'],
				dono: false
			},
			pt: {
				nome: 'loop',
				categoria: '🎵 » Música',
				desc: 'Repete a música atual.'
			},
			en: {
				nome: 'loop',
				categoria: '🎵 » Music',
				desc: 'Loop the current song.'
			},
			fr: {
				nome: 'loop',
				categoria: '🎵 » Musique',
				desc: 'Répéter la musique actuelle.'
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
			aliases: ['loop', 'repeat'],
			run: this.run
		};
	}

	async run (ctx) {
		const player = global.zuly.music.players.get(ctx.message.channel.guild.id);
		if (!ctx.message.member.voiceState.channelID) {
			return ctx.message.channel.slashReply({
				content: `:x: ${ctx.message.author.mention} **|** ${ctx.idioma.together.channel}`
			});
		}
		if (!player) {
			return ctx.message.channel.slashReply({
				content: `:x: ${ctx.message.author.mention} **|** ${ctx.idioma.erela.not}`
			});
		}

		if (player.trackRepeat) {
			player.setTrackRepeat(false);
			const embed = new ctx.embed();
			embed.setDescription(`<:zu_mp3:882310253226635284> **|** ${ctx.idioma.erela.loop.desativado}`);
			embed.setColor('#ffcbdb');
			embed.setFooter('⤷ zulybot.xyz', global.zuly.user.avatarURL);
			ctx.message.channel.slashReply({
				content: ctx.message.author.mention,
				embeds: [embed.get()]
			});
		}
		else {
			player.setTrackRepeat(true);
			const embed = new ctx.embed();
			embed.setDescription(`<:zu_mp3:882310253226635284> **|** ${ctx.idioma.erela.loop.ativado}`);
			embed.setColor('#ffcbdb');
			embed.setFooter('⤷ zulybot.xyz', global.zuly.user.avatarURL);
			ctx.message.channel.slashReply({
				content: ctx.message.author.mention,
				embeds: [embed.get()]
			});
		}
	}
};

// ADG
