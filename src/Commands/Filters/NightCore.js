module.exports = class StopCommand {
	constructor () {
		return {
			permissoes: {
				membro: [],
				bot: ['embedLinks'],
				dono: false
			},
			pt: {
				nome: 'nightcore',
				categoria: '🎵 » Filtros',
				desc: 'Ativa o filtro nightcore.'
			},
			en: {
				nome: 'nightcore',
				categoria: '🎵 » Filters',
				desc: 'Activates the nightcore filter.'
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
			if (player.nightcore === false) {
				player.nightcore = true;
				return ctx.message.channel.slashReply(`✅ ${ctx.message.author.mention} **|** ${ctx.idioma.filters.ativado.replace('%f', 'nightcore')}`);
			}
			if (player.nightcore === true) {
				player.nightcore = false;
				return ctx.message.channel.slashReply(`✅ ${ctx.message.author.mention} **|** ${ctx.idioma.filters.desativado.replace('%f', 'nightcore')}`);
			}
		}
	}
};
