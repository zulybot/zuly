/* eslint-disable new-cap */
module.exports = class PrintCommand {
	constructor () {
		return {
			permissoes: {
				membro: [],
				bot: [],
				dono: false,
				nsfw: true
			},
			pt: {
				nome: 'print',
				categoria: '⛔ » NSFW',
				desc: 'Tira print de um site'
			},
			en: {
				nome: 'print',
				categoria: '⛔ » NSFW',
				desc: 'Take a print of a website'
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
					name: 'website',
					description: 'The website link to take a print',
					required: false,
				}
			],
			aliases: ['foto', 'site', 'website'],
			run: this.run
		};
	}

	async run (ctx) {
		if (!ctx.args[0]) return ctx.send(`:x: ${ctx.message.author.mention} **|** ${ctx.idioma.print.web}`);
		const foto = `https://shot.screenshotapi.net/screenshot?token=FP5MEHC-G3BM4P9-PPBRB2G-QBTSNBT&url=${encodeURIComponent(ctx.args.join(' '))}&output=image&file_type=png&wait_for_event=load`;

		const fs = require('fs');
		const request = require('request');

		const download = function(uri, filename, callback) {
			request.head(uri, function(err, res) {
			  console.log('content-type:', res.headers['content-type']);
			  console.log('content-length:', res.headers['content-length']);

			  request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
			});
		  };

		download(foto, `screen-${ctx.message.author.id}.png`, async function() {
			console.log('[!] Download: sucesso');
			const util = require('util');
			const read = util.promisify(fs.readFile);

			await ctx.message.channel.createMessage(`📸 ${ctx.message.author.mention}`, {
				file: await read(`./screen-${ctx.message.author.id}.png`),
				name: 'print.png'
			}).then(async () => {
				await fs.unlinkSync(`./screen-${ctx.message.author.id}.png`);
			});
		});
	}
};
