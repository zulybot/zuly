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
			aliases: ['fakenitro', 'fake-nitro', 'nitrofake', 'gift', 'giftnitro', 'nitrogift'],
			run: this.run
		};
	}

	async run (ctx) {
		const { readFile } = require('fs');
		const util = require('util');
		const read = util.promisify(readFile);
		ctx.message.channel.createMessage(`<:zu_nitro:885919779205029898> ${ctx.message.author.mention} **|** 𝖽iscord.gift/${Math.random().toString(36).slice(-8)}`, {
			file: await read('./assets/images/memes/nitrofake.png'),
			name: 'nitro.png'
		});
	}
};