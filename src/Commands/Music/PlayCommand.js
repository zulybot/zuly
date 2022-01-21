module.exports = class PlayCommand {
	constructor () {
		return {
			permissoes: {
				membro: [],
				bot: ['embedLinks'],
				dono: false
			},
			pt: {
				nome: 'play',
				categoria: '🎵 » Música',
				desc: 'Ouça músicas, yay.'
			},
			en: {
				nome: 'play',
				categoria: '🎵 » Music',
				desc: 'Listen musics, yay.'
			},
			fr: {
				nome: 'play',
				categoria: '🎵 » Musique',
				desc: 'Écouter des musiques, yay.'
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
			options: [
				{
					type: 3,
					name: 'music',
					description: 'The Music that will be played',
					required: false
				}
			],
			aliases: ['p', 'tocar', 'som', 'somzao', 'somzão', 'dj'],
			run: this.run
		};
	}

	async run (ctx) {
		try {
			if (!ctx.args[0]) {
				return ctx.message.channel.slashReply({
					content: `:x: ${ctx.message.author.mention} **|** ${ctx.idioma.play.nada.replace('%p', ctx.prefix)}`
				});
			}
			if (!ctx.message.member.voiceState.channelID) {
				return ctx.message.channel.slashReply({
					content: `:x: ${ctx.message.author.mention} **|** ${ctx.idioma.play.can}`
				});
			}
			const res = await global.zuly.music.search(ctx.args.join(' '), ctx.message.author);
			const play = global.zuly.music.players.get(ctx.message.channel.guild.id);
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
			player.queue.add(res.tracks[0]);
			const track = res.tracks[0];

			if (!player.playing && !player.paused && !player.queue.size) {
				player.play();
			}
			if (!player.playing && !player.paused && player.queue.totalSize === res.tracks.length) {
				player.play();
			}
			const embed = new ctx.embed();
			embed.setDescription(`<:zu_mp3:882310253226635284> **|** ${ctx.idioma.play.add} **${track.title}**`);
			embed.setColor('#ffcbdb');
			embed.setFooter('⤷ zulybot.xyz', global.zuly.user.avatarURL);
			ctx.message.channel.slashReply({
				embeds: [embed.get()]
			});
		}
		catch (e) {
			console.log(e);
		}
	}
};

// ADG
