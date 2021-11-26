'use strict';
module.exports = class MessageEventCommand {
	constructor () {
		return {
			nome: 'messageCreate',
			run: this.run
		};
	}

	async run (message) {
		message.client = global.zuly;
		const config = require('../Config/config.js');

		if (message.channel.type === 1) return;

		const {
			get
		} = require('axios');
		await get('https://bad-domains.walshy.dev/domains.json').then(async (response) => {
			const domains = response.data;
			for (const domain of domains) {
				if (message.content.includes(domain)) {
					message.delete();
					message.channel.createMessage(`:x: ${message.author.mention} **|** Este domínio foi bloqueado por ser suspeito de spam/phishing, caso acesse este site, você corre o risco de perder sua conta.`);
					break;
				}
			}
		});

		if (message.content === 'meme') {
			try {
				console.log('ok!');
				const { createCanvas, loadImage } = require('canvas');
				const incriveis = await loadImage('./assets/images/memes/incriveis.png');
				const canvas = createCanvas(incriveis.width, incriveis.height);
				const foto = canvas.getContext('2d');

				foto.drawImage(incriveis, 0, 0, canvas.width, canvas.height);

				foto.font = '30px sans-serif';
				foto.fillStyle = '#ffffff';

				foto.fillText('Cento e Quatro'.match(/.{1,23}/g).join('\n'), canvas.width / 50.9, canvas.height / 15.9, 655);
				foto.fillText('Sento em Quatro'.match(/.{1,23}/g).join('\n'), canvas.width / 1.9, canvas.height / 15.9, 655);

				message.channel.createMessage(message.author.mention, {
					file: canvas.toBuffer(),
					name: 'laranjo.png'
				});
			}
			catch (e) {
				console.log(e);
			}
		}

		const mensagens = await global.db.get(`messages-${message.guildID}-${message.author.id}`);
		await global.db.set(`messages-${message.guildID}-${message.author.id}`, mensagens ? mensagens + 1 : 1);
		let idioma = require('../Config/idiomas');
		let lang = await global.db.get(`idioma-${message.guildID}`) || 'pt_br';
		lang = lang.replace(/-/g, '_');
		idioma = idioma[lang];

		if (message.author.bot) return;

		if (message.content === `<@${global.zuly.user.id}>` || message.content === `<@!${global.zuly.user.id}>`) {
			const embed = new global.zuly.manager.Ebl();
			embed.setAuthor(global.zuly.user.username, '', global.zuly.user.avatarURL);
			embed.setDescription(`👋 ${idioma.mention.hello.replace('%user', message.author.mention)}\n> <:zu_info:911303533859590144> ${idioma.mention.about}\n> <:zu_slash:886681118470987967> ${idioma.mention.help}`);
			embed.setColor('#ffcbdb');
			embed.setFooter('⤷ zulybot.xyz', global.zuly.user.avatarURL);
			message.channel.createMessage({
				content: message.author.mention,
				embeds: [embed.get()],
				components: [
					{
						type: 1,
						components: [
							{
								type: 2,
								label: `${idioma.mention.labels.support}`,
								style: 5,
								url: 'https://discord.gg/pyyyJpw5QW'
							},
							{
								type: 2,
								label: `${idioma.mention.labels.invite}`,
								style: 5,
								url: 'https://discord.com/oauth2/authorize?client_id=' + global.zuly.user.id + '&scope=bot%20applications.commands&permissions=268823622'
							},
							{
								type: 2,
								label: `${idioma.mention.labels.website}`,
								style: 5,
								url: 'https://zulybot.xyz/'
							}
						]
					}
				]
			}).catch((e) => console.log(e));
		}

		const regexPrefix = new RegExp(`^(${config.prefix.map(prefix => prefix.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&')).join('|')}|<@!?${global.zuly.user.id}>)( )*`, 'gi');
		if (!message.content.match(regexPrefix)) return;
		const args = message.content.replace(regexPrefix, '').trim().split(/ +/g);
		const commandName = args.shift().toLowerCase();
		const commandFile = global.zuly.commands.get(commandName) || global.zuly.aliases.get(commandName);
		if (!commandFile) return;

		const command = commandFile;

		if (!command || command) {
			const embed = new global.zuly.manager.Ebl();
			embed.setTitle(`<:zu_slash:886288977668243566> SlashCommands | ${global.zuly.user.username}`);
			embed.setDescription(`${message.author.mention}, ${idioma.slash}`);
			embed.setColor('#ffcbdb');
			embed.setThumbnail(global.zuly.user.avatarURL);
			embed.setFooter('⤷ zulybot.xyz', global.zuly.user.avatarURL);
			message.channel.createMessage({
				content: message.author.mention,
				embeds: [embed.get()]
			});
		}
	}
};
