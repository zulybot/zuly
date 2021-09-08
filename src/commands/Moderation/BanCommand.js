module.exports = class BanCommand {
	constructor () {
		return {
			permissoes: {
				membro: ['banMembers'], // Permissoes que o usuario necessita
				bot: ['banMembers'], // Permissoes que o bot necessita
				dono: false // Se apenas nos devs podem usar o comando
			},
			pt: {
				nome: 'ban',
				categoria: '<:zu_certifiedmod:885193463111483412> » Moderação',
				desc: 'Bane algum usuário babaca de seu servidor.'
			},
			en: {
				nome: 'ban',
				categoria: '<:zu_certifiedmod:885193463111483412> » Moderation',
				desc: 'Bane algum usuário babaca de seu servidor'
			},
			aliases: ['banir', 'hackban', 'forceban'],
			run: this.run
		};
	}

	async run (ctx) {
		let member;
		if (!ctx.args[0]) return ctx.reply(`:x: ${ctx.message.author.mention} **|** ${ctx.idioma.ban.noarg}`);

		if (!ctx.message.mentions[0]) {
			member = await global.zuly.getRESTUser(ctx.args[0]).then(info => info).catch(() => {
				return ctx.send(`:x: ${ctx.message.author.mention} **|** Usuário desconhecido.`);
			});
		}
		else {
			member = await ctx.message.mentions[0];
		}

		let banReason = ctx.args.splice(1).join(' ');
		if (!banReason) {
			banReason = `${ctx.idioma.ban.mot}`;
		}
		const motivo = `${ctx.idioma.ban.mot2} ${ctx.message.author.username}#${ctx.message.author.discriminator} - ${ctx.idioma.ban.mot3} ${banReason}`;

		ctx.message.channel.guild.banMember(member.id, 0, motivo);

		ctx.send(`:white_check_mark: ${ctx.message.author.mention} **|** ${ctx.idioma.ban.the} **${member.username}** ${ctx.idioma.ban.foi}`);
	}
};
// ADG, Davi e LRD
