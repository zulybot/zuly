/* eslint-disable new-cap */
module.exports = class EvalCommand {
	constructor () {
		return {
			permissoes: {
				membro: [],
				bot: [],
				dono: false
			},
			pt: {
				nome: 'waifu-info',
				categoria: '💖 » Waifu',
				desc: 'Vê informação de waifu'
			},
			en: {
				nome: 'waifu-info',
				categoria: '💖 » Waifu',
				desc: 'See waifu info.'
			},
			aliases: ['wa', 'wainfo', 'waifuinfo'],
			run: this.run
		};
	}

	async run (ctx) {
		const { SwapPages } = require('../../Helpers/EmbedPages.js');
		const { get } = require('axios');
		const embeds = [];
		await get('https://waifu-generator.vercel.app/api/v1').then(async response => {
			const res = response.data;
			res.forEach(waifu => {
				waifu.valor = Math.floor(Math.random() * 2000) + 18;
				console.log(waifu);
				const embed = new ctx.embed();
				embed.title(`♡︰𓂃 [${waifu.name}] ₊˚ฅ `);
				embed.description(`>>> ๑☕﹕ **Ryos:** ${waifu.valor}\n๑☕﹕ **Anime:** ${waifu.anime}`);
				embed.color('#ffcbdb');
				embed.image(waifu.image);
				embeds.push(embed);
			});
		});
		await SwapPages(global.zuly, ctx.message, 15000, 10, embeds);
	}
};
