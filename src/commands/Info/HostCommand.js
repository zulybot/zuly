module.exports = class HostCommand {
	constructor () {
		return {
			permissoes: {
				membro: [], // Permissoes que o usuario necessita
				bot: [], // Permissoes que o bot necessita
				dono: false // Se apenas nos devs podem usar o comando
			},
			pt: {
				nome: 'host',
				categoria: '📖 » Informação',
				desc: 'Veja as informações da host'
			},
			en: {
				nome: 'host',
				categoria: '📖 » Information',
				desc: 'see host info'
			},
			aliases: ['hostinfo', 'hi', 'about'],
			run: this.run
		};
	}

	async run (ctx) {
		// eslint-disable-next-line new-cap
		const embed = new ctx.embed();
		embed.title(`<:zu_host:880539802645180416> ${global.zuly.user.username}`);
		embed.field('<:zu_database:880537804046762054> Database:', ctx.idioma.host.db);
		embed.field('💻 VPS:', ctx.idioma.host.vps);
		embed.color('#ffcbdb');
		embed.thumbnail(global.zuly.user.avatarURL);
		ctx.send(embed.create);
	}
};
