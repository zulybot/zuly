/* eslint-disable new-cap */
module.exports = class HentaiCommand {
	constructor () {
		return {
			permissoes: {
				membro: [],
				bot: ['embedLinks'],
				dono: false,
				nsfw: true
			},
			pt: {
				nome: 'hentai',
				categoria: '⛔ » NSFW',
				desc: 'Exibir uma imagem de peito aleatória/gif'
			},
			en: {
				nome: 'hentai',
				categoria: '⛔ » NSFW',
				desc: 'Display a random boobs image/gif'
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
			aliases: ['h', 'hent'],
			run: this.run
		};
	}

	async run (ctx) {
		const { get } = require('axios');
		await get('https://nekobot.xyz/api/image?type=hentai').then(async response => {
			const res = response.data;
			const embed = new ctx.embed();
			embed.color('#ffcbdb');
			embed.image(res.message);
			embed.footer(`⤷ https://zulybot.xyz | Executed by: ${ctx.message.author.username}#${ctx.message.author.discriminator}`);
			return ctx.send(embed.create);
		});
	}
};
