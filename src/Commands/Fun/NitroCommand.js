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
				desc: 'Cria uma conquista do minecraft'
			},
			en: {
				nome: 'nitro',
				categoria: '⭐ » Fun',
				desc: 'Create a minecraft achievement'
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
		const { readFile } = require('fs');
		const util = require('util');
		const read = util.promisify(readFile);
		ctx.message.channel.slashReply({
			content: `🛒 ${ctx.message.author.mention} **|** Buying you nitro...`
		});
		ctx.message.channel.createMessage({
			content: `<:zu_nitro:885919779205029898> ${ctx.message.author.mention} **|** discord\\.gift/${Math.random().toString(36).slice(-8)}`,
			file: [{
				attachment: await read('./assets/images/memes/nitrofake.png', 'base64'),
				name: 'nitro.png'
			}]
		});
	}
};