module.exports = class ExecCommand {
	constructor () {
		return {
			permissoes: {
				membro: [],
				bot: [],
				dono: false
			},
			pt: {
				nome: 'discordjs',
				categoria: '💻 » Dev',
				desc: 'Procura algo na documentação do discord.js.'
			},
			en: {
				nome: 'discordjs',
				categoria: '💻 » Dev',
				desc: 'Search for something in the Discord.js documentation.'
			},
			fr: {
				nome: 'discordjs',
				categoria: '💻 » Dev',
				desc: 'Recherchez quelque chose dans la documentation Discord.js.'
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
				required: false
			}],
			aliases: ['discord.js', 'djs', 'dc.js'],
			run: this.run
		};
	}

	async run (ctx) {
		if (!ctx.args[0]) {
			return ctx.message.channel.slashReply({
				content: `:x: ${ctx.message.author.mention} **|** ${ctx.idioma.docs.args}`
			});
		};
		const { get } = require('axios');
		await get(`https://djsdocs.sorta.moe/v2/embed?src=stable&q=${encodeURI(ctx.args.join(' '))}`).then(response => {
			const res = response.data;
			const embed = new ctx.embed();
			embed.setTitle('<:zu_djs:904418845631082506> Discord.js Docs');
			embed.setColor('#ffcbdb');
			embed.setThumbnail(global.zuly.user.avatarURL);
			embed.setFooter('⤷ zulybot.xyz', global.zuly.user.avatarURL);
			if (!res.fields) {
				embed.setDescription(`${res.description}`);
				ctx.message.channel.slashReply({
					content: ctx.message.author.mention,
					embeds: [embed.get()]
				});
			}
			else {
				res.fields.forEach(resu => {
					if (resu.value.includes('View source')) return;
					embed.setDescription(`>>> 📘 ${res.description}`);
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
