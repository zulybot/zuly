/* eslint-disable new-cap */
module.exports = class BoobsCommand {
	constructor () {
		return {
			permissoes: {
				membro: [],
				bot: ['embedLinks'],
				dono: false,
				nsfw: true
			},
			pt: {
				nome: 'boobs',
				categoria: '⛔ » NSFW',
				desc: 'Exibir uma imagem de peito aleatória/gif'
			},
			en: {
				nome: 'boobs',
				categoria: '⛔ » NSFW',
				desc: 'Display a random boobs image/gif'
			},
			aliases: ['peitos', 'boob'],
			run: this.run
		};
	}

	async run (ctx) {
		const { get } = require('axios');
		await get('http://api.oboobs.ru/boobs/0/1/random').then(async response => {
			const res = response.data;
			const embed = new ctx.embed();
			embed.color('#ffcbdb');
			embed.image('http://media.oboobs.ru/' + res[0].preview);
			embed.footer(`Executed by: ${ctx.message.author.username}#${ctx.message.author.discriminator}`);
			return ctx.send(embed.create);
		});
	}
};
