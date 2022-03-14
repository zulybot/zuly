module.exports = class CalcCommand {
	constructor () {
		return {
			permissoes: {
				membro: [],
				bot: ['embedLinks'],
				dono: false
			},
			pt: {
				nome: 'colorizer',
				categoria: '🕰️ » Utilidades',
				desc: 'Colore alguma imagem.'
			},
			en: {
				nome: 'colorizer',
				categoria: '🕰️ » Utility',
				desc: 'Color any image.'
			},
			fr: {
				nome: 'colorizer',
				categoria: '🕰️ » Utilitaires',
				desc: 'Colorer une image.'
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
			options: [
				{
					type: 3,
					name: 'image',
					description: 'The Image Link',
					required: false
				}
			],
			aliases: ['av', 'user-avatar', 'ua', 'memberavatar', 'profileavatar'],
			run: this.run
		};
	}

	async run (ctx) {
		const API = require('../../API/keys');
		const result = await global.zuly.deepai.callStandardApi('colorizer', {
			image: ctx.args[0]
		});
		const { request } = require('axios');
		request({
			method: 'POST',
			url: 'https://api-ssl.bitly.com/v4/bitlinks',
			headers: {
				Authorization: `Bearer ${API.bit}`,
				'Content-Type': 'application/json'
			},
			data: {
				domain: 'bit.ly',
				long_url: result.output_url
			}
		}).then(response => {
			const res = response.data;
			if (!ctx.message.channel.nsfw) {
				ctx.message.channel.slashReply({
					content: `📸 ${ctx.message.author} **|** ${res.link}`,
					flags: ctx.ephemeral
				});
			}
			else {
				ctx.message.channel.slashReply({
					content: `📸 ${ctx.message.author} **|** ${res.link}`
				});
			}
		});
	}
};
