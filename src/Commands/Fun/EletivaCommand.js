module.exports = class NitroCommand {
	constructor () {
		return {
			permissoes: {
				membro: [],
				bot: [],
				dono: false
			},
			pt: {
				nome: 'dado',
				categoria: '⭐ » Diversão',
				desc: 'Eletiva'
			},
			en: {
				nome: 'dice,
				categoria: '⭐ » Fun',
				desc: 'Eletiva'
			},
			fr: {
				nome: 'roll',
				categoria: '⭐ » Divertissement',
				desc: 'Eletiva'
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
			aliases: ['fakenitro', 'fake-nitro', 'nitrofake', 'gift', 'giftnitro', 'nitrogift'],
			run: this.run
		};
	}

	async run (ctx) {
		const number = return Math.random() * (20 - 1) + 1;
		ctx.message.channel.slashReply('🎲 **|** Toma aqui o número: **' + number + '**')
	}
};
