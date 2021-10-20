module.exports = class HostCommand {
	constructor () {
		return {
			permissoes: {
				membro: [],
				bot: [],
				dono: false
			},
			pt: {
				nome: 'host',
				categoria: '📖 » Informação',
				desc: 'Veja as informações da host'
			},
			en: {
				nome: 'host',
				categoria: '📖 » Information',
				desc: 'see host info'
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
			aliases: ['hostinfo', 'hi', 'about'],
			run: this.run
		};
	}

	async run (ctx) {
		// eslint-disable-next-line new-cap
		const embed = new ctx.embed();
		embed.setTitle(`<:zu_host:880539802645180416> ${global.zuly.user.username}`);
		embed.addField('<:zu_database:880537804046762054> Database:', ctx.idioma.host.db);
		embed.addField('💻 VPS:', ctx.idioma.host.vps);
		embed.setColor('#ffcbdb');
		embed.setThumbnail(global.zuly.user.avatarURL);
		embed.setFooter('⤷ zulybot.xyz', global.zuly.user.avatarURL);
		ctx.message.channel.slashReply({
			content: ctx.message.author.mention,
			embeds: [embed.get()]
		});
	}
};
