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
				nome: 'profile',
				categoria: '💖 » Waifu',
				desc: 'Vê informação de waifu'
			},
			en: {
				nome: 'profile',
				categoria: '💖 » Waifu',
				desc: 'See waifu info.'
			},
			aliases: ['perfil', 'status'],
			run: this.run
		};
	}

	async run (ctx) {
		const user = ctx.args[0] ? ctx.message.mentions[0] || await global.zuly.getRESTUser(ctx.args[0]).catch(() => ctx.ctx.message.author.mention) : ctx.message.author;
		const ryos = await global.db.get(`ryos-${ctx.message.channel.guild.id}-${user.id}`);

		const waifus = [];

		const waifudb = require('../../Database/WaifuDB');
		waifudb.waifus.map(async wai => {
			const waif = await global.db.get(`waifu-${ctx.message.channel.guild}-${wai.id}`);
			if (waif && waif === user.id) {
				waifus.push(waif);
			}
		});

		const embed = new ctx.embed();
		embed.title(`♡︰𓂃 [${user.username}#${user.discriminator}] ₊˚ฅ `);
		embed.description(`>>> ๑☕﹕ **Ryos:** ${ryos || 0}\n ๑☕﹕ **Waifus:** ${waifus.length}`);
		embed.color('#ffcbdb');
		ctx.send(embed.create);
	}
};
