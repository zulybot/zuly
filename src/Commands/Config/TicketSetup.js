module.exports = class TicketCommand {
	constructor () {
		return {
			permissoes: {
				membro: ['manageGuild'],
				bot: []
			},
			pt: {
				nome: 'ticket',
				categoria: '⚙️ » Configuração',
				desc: 'Configure o sistema de tickets.'
			},
			en: {
				nome: 'ticket',
				categoria: '⚙️ » Configuration',
				desc: 'Configure the ticket system.'
			},
			fr: {
				nome: 'ticket',
				categoria: '⚙️ » Configuration',
				desc: 'Configurez le système de tickets.'
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
		ctx.message.channel.slashReply({
			content: `✅ ${ctx.message.author} **|** ${ctx.idioma.ticket.sus}`,
			flags: ctx.ephemeral
		});
		global.zuly.createMessage(ctx.message.channel.id, { embed:{
			title: `<:zu_ticket:890950181120507935> Ticket | ${global.zuly.user.username}`,
			description: `> ${ctx.idioma.ticket.create}`,
			color: 0x7289DA,
		},
		components:[{
			type: 1,
			components:[{
				type: 2,
				emoji: {
					name: '📩'
				},
				label: ctx.idioma.ticket.labels.create,
				style: 1,
				custom_id: 'open-ticket'
			}]
		}]
		});
	}
};