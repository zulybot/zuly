module.exports = class StopCommand {
	constructor () {
		return {
			permissoes: {
				membro: [],
				bot: ['embedLinks'],
				dono: false
			},
			pt: {
				nome: 'karaoke',
				categoria: '🎵 » Filtros',
				desc: 'Ativa o filtro karaoke.'
			},
			en: {
				nome: 'karaoke',
				categoria: '🎵 » Filters',
				desc: 'Activates the karaoke filter.'
			},
			fr: {
				nome: 'karaoke',
				categoria: '🎵 » Filtres',
				desc: 'Active le filtre karaoke.'
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
			aliases: [],
			run: this.run
		};
	}

	async run (ctx) {
		const player = await global.zuly.music.players.get(ctx.message.channel.guild.id);
		if (!ctx.message.member.voiceState.channelID) return ctx.message.channel.slashReply(`:x: ${ctx.message.author.mention} **|** ${ctx.idioma.player.noc2}`);
		if (!player) {
			return ctx.message.channel.slashReply(`:x: ${ctx.message.author.mention} **|** ${ctx.idioma.player.not}`);
		}
		else {
			if (player.karaoke === false) {
				player.karaoke = true;
				return ctx.message.channel.slashReply(`✅ ${ctx.message.author.mention} **|** ${ctx.idioma.filters.ativado.replace('%f', 'karaoke')}`);
			}
			if (player.karaoke === true) {
				player.karaoke = false;
				return ctx.message.channel.slashReply(`✅ ${ctx.message.author.mention} **|** ${ctx.idioma.filters.desativado.replace('%f', 'karaoke')}`);
			}
		}
	}
};
