module.exports = class CalcCommand {
	constructor () {
		return {
			permissoes: {
				membro: [],
				bot: ['embedLinks'],
				dono: false
			},
			pt: {
				nome: 'banner',
				categoria: '🕰️ » Utilidades',
				desc: 'Veja informações sobre um usuário'
			},
			en: {
				nome: 'banner',
				categoria: '🕰️ » Utility',
				desc: 'View information about a user'
			},
			aliases: ['userbanner', 'user-banner', 'ub', 'memberbanner', 'background', 'profilebanner', 'profilebackground'],
			run: this.run
		};
	}

	async run (ctx) {
		const user = ctx.args[0] ? ctx.message.mentions[0] || await global.zuly.getRESTUser(ctx.args[0]).catch(() => ctx.message.author) : ctx.message.author;
		const banner = await global.zuly.getRESTBanner(user.id);

		const embed = new ctx.embed();
		embed.title(`${ctx.idioma.avatar.title.replace('Avatar', 'Banner')} __${user.username}#${user.discriminator}__`);
		embed.description(`> <:zu_download:890281922331291698> ${ctx.idioma.avatar.download} [${ctx.idioma.avatar.click}](${banner || 'https://imgur.com/XVLqrn1.png'})`);
		embed.color('#ffcbdb');
		embed.image(banner || 'https://imgur.com/XVLqrn1.png');
		embed.thumbnail(user.avatarURL || global.zuly.avatarURL);
		ctx.send(embed.create);
	}
};
