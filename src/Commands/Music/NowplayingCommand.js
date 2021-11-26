module.exports = class NowplayingCommand {
	constructor () {
		return {
			permissoes: {
				membro: [],
				bot: ['embedLinks'],
				dono: false
			},
			pt: {
				nome: 'nowplaying',
				categoria: '🎵 » Música',
				desc: 'A música que está tocando agora.'
			},
			en: {
				nome: 'nowplaying',
				categoria: '🎵 » Music',
				desc: 'The song that\'s playing now.'
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
			aliases: ['np', 'tocando', 'tocandoagora', 'playingnow'],
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
		const humanizeDuration = require('humanize-duration');
		const duration = player.queue.current.duration;
		const part = Math.floor(player.position / duration * 11);
		const embed = new ctx.embed();
		embed.setTitle(`:musical_note: ${ctx.idioma.erela.np}`);
		embed.setDescription(`> [${player.queue.current.title}](${player.queue.current.uri})`);
		embed.addField(`⏲️ ${ctx.idioma.erela.duration}`, `${humanizeDuration(player.queue.current.duration, {
			language: ctx.idioma.lang
		})}`, true);
		embed.addField(`📊 ${ctx.idioma.erela.duration}`, `\`${'▬'.repeat(part) + '⚪' + '▬'.repeat(11 - part)}\``, true);
		embed.setColor('#ffcbdb');
		embed.setThumbnail(player.queue.current.thumbnail || global.zuly.user.avatarURL);
		embed.setFooter('⤷ zulybot.xyz', global.zuly.user.avatarURL);
		ctx.message.channel.slashReply({
			content: ctx.message.author.mention,
			embeds: [embed.get()]
		});
	}
};

// ADG
