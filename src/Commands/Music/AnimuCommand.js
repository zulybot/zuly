module.exports = class AnimuCommand {
	constructor () {
		return {
			permissoes: {
				membro: [],
				bot: [],
				dono: false
			},
			pt: {
				nome: 'animu',
				categoria: '🎵 » Música',
				desc: 'Toca a radio de anime, Animu.'
			},
			en: {
				nome: 'animu',
				categoria: '🎵 » Music',
				desc: 'Play anime radio, Animu.'
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
			aliases: ['radio'],
			run: this.run
		};
	}

	async run (ctx) {
		const play = global.zuly.music.players.get(ctx.message.channel.guild.id);
		if (!ctx.message.member.voiceState.channelID) {
			return ctx.message.channel.slashReply({
				content: `:x: ${ctx.message.author.mention} **|** ${ctx.idioma.play.can}`
			});
		}
		if (!play) {
			const player = global.zuly.music.create({
				guild: ctx.message.channel.guild.id,
				voiceChannel: ctx.message.member.voiceState.channelID,
				textChannel: ctx.message.channel.id,
				selfDeafen: true,
				volume: 100
			});
			await player.connect();
		}
		const player = global.zuly.music.players.get(ctx.message.channel.guild.id);
		const res = await player.search('https://cast.animu.com.br:9006/stream', ctx.message.author);
		if (res.loadType === 'LOAD_FAILED') {
			if (!player.queue.current) player.destroy();
			throw new Error(res.exception.message);
		}
		player.set('interaction', undefined);
		player.queue.add(res.tracks[0]);
		if (!player.playing && !player.paused && !player.queue.size) player.play();
		if (player.queue.size >= 1) {
			const embed = new ctx.embed();
			embed.setDescription(`<:zu_animu:882344230515802152> **|** ${ctx.idioma.play.add} **Animu**`);
			embed.setColor('#ffcbdb');
			embed.setFooter('⤷ zulybot.xyz', global.zuly.user.avatarURL);
			ctx.message.channel.slashReply({
				content: ctx.message.author.mention,
				embeds: [embed.get()]
			});
		}
	}
};
