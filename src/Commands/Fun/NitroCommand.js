module.exports = class NitroCommand {
	constructor () {
		return {
			permissoes: {
				membro: [],
				bot: ['ATTACH_FILES'],
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
		const { MessageAttachment } = require('discord.js');
		const attachment = new MessageAttachment('./assets/images/memes/nitrofake.png', 'nitro.png');

		ctx.message.channel.slashReply({
			content: `<a:zu_booster:880862453712429098> ${ctx.message.author.mention} **|** discord\\.gift/${Math.random().toString(36).slice(-8)}${Math.random().toString(36).slice(-8)}`,
			files: [attachment]
		});
	}
};
