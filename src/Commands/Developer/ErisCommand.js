module.exports = class ExecCommand {
	constructor () {
		return {
			permissoes: {
				membro: [],
				bot: ['EMBED_LINKS'],
				dono: false
			},
			pt: {
				nome: 'eris',
				categoria: '💻 » Dev',
				desc: 'Procura algo na documentação do eris.js.'
			},
			en: {
				nome: 'eris',
				categoria: '💻 » Dev',
				desc: 'Search for something in the eris.js documentation.'
			},
			fr: {
				nome: 'eris',
				categoria: '💻 » Dev',
				desc: 'Recherchez quelque chose dans la documentation eris.js.'
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
			options: [{
				type: 3,
				name: 'term',
				description: 'the term to search',
				required: true
			}],
			aliases: ['eris.js', 'eris', 'erisjs'],
			run: this.run
		};
	}

	async run (ctx) {
		if (!ctx.args[0]) {
			return ctx.message.channel.slashReply({
				content: `:x: ${ctx.message.author.mention} **|** ${ctx.idioma.docs.args}`
			});
		};
		const {
			get
		} = require('axios');
		await get(`https://eris-docs-api.herokuapp.com/?query=${encodeURI(ctx.args.join(' '))}`).then(response => {
			const res = response.data;
			const embed = new ctx.embed();
			embed.setTitle('<:zu_eris:904419966323933184> Eris Docs');
			embed.setColor('#ffcbdb');
			embed.setThumbnail(global.zuly.user.displayAvatarURL({ dynamic: true, format: 'png', size: 4096 }));
			embed.setFooter('⤷ zulybot.xyz', global.zuly.user.displayAvatarURL({ dynamic: true, format: 'png', size: 4096 }));
			if (!res.embed.fields) {
				embed.setDescription(`>>> 📘 ${res.embed.description}`);
				ctx.message.channel.slashReply({
					content: ctx.message.author.mention,
					embeds: [embed.get()]
				});
			}
			else {
				res.embed.fields.forEach(resu => {
					embed.setDescription(`>>> 📘 ${res.embed.description}`);
					embed.addField(resu.name, resu.value);
				});
				ctx.message.channel.slashReply({
					content: ctx.message.author.mention,
					embeds: [embed.get()]
				});
			}
		});
	}
};
