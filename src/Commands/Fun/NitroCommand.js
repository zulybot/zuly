module.exports = class Nitro {
	constructor () {
		return {
			permissoes: {
				membro: [],
				bot: ['attachFiles'],
				dono: false
			},
			pt: {
				nome: 'nitro',
				categoria: '⭐ » Diversão',
				desc: '"Compra" um nitro para você'
			},
			en: {
				nome: 'nitro',
				categoria: '⭐ » Fun',
				desc: '"Buy" a nitro for you.'
			},
			fr: {
				nome: 'nitro',
				categoria: '⭐ » Divertissement',
				desc: '"Achetez" un nitro pour vous.'
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
		const { readFile } = require('fs/promises');
		ctx.message.channel.slashReply(`<:zu_nitro:885919779205029898> ${ctx.message.author} **|** discord\\.gift/${Math.random().toString(36).slice(-8)}`, {
			file: await readFile('./assets/images/memes/nitrofake.png'),
			name: 'nitro.png'
		});
	}
};
