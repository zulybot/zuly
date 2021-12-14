/* eslint-disable max-nested-callbacks */
module.exports = class LangCommand {
	constructor () {
		return {
			permissoes: {
				membro: ['manageGuild'],
				bot: []
			},
			pt: {
				nome: 'embed',
				categoria: '⚙️ » Configuração',
				desc: 'Embed generator, envie embeds personalizadas.'
			},
			en: {
				nome: 'embed',
				categoria: '⚙️ » Configuration',
				desc: 'Embed generator, send custom embeds.'
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
			aliases: [],
			run: this.run
		};
	}

	async run (ctx) {
		// Make a function that takes text from an image.
		async function getText (image) {
			const vision = require('@google-cloud/vision');
			const client = new vision.ImageAnnotatorClient();
			const [result] = await client.textDetection(image);
			const detections = result.textAnnotations;
			return detections[0].description;
		}
		getText('https://s.dicio.com.br/imagem.jpg').then(text => {
			ctx.message.channel.createMessage(text);
		});
	};
};