module.exports = class GuessCommand {
	constructor () {
		return {
			permissoes: {
				membro: ['manageGuild'],
				bot: [],
				dono: false
			},
			pt: {
				nome: 'guess',
				categoria: '⭐ » Diversão',
				desc: 'Adivinhe o número é um jogo educacional divertido.'
			},
			en: {
				nome: 'guess',
				categoria: '⭐ » Fun',
				desc: 'Guess the Number is a fun educational game.'
			},
			fr: {
				nome: 'guess',
				categoria: '⭐ » Divertissement',
				desc: 'Deviner le nombre est un jeu d\'éducation divertissant.'
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
					name: 'min',
					description: 'The minimum number.',
					required: false
				},
				{
					type: 3,
					name: 'max',
					description: 'The maximum number.',
					required: false
				}
			],
			aliases: [],
			run: this.run
		};
	}

	async run (ctx) {
		if (!ctx.args[0] && !ctx.args[1] || isNaN(ctx.args[0]) && isNaN(ctx.args[1])) {
			const number = Math.floor(Math.random() * 1500) + 500;
			console.log(number);
			ctx.message.channel.slashReply({
				content: `⏰ ${ctx.message.author.mention} **|** ${ctx.idioma.guess.start.replace('%min', 500).replace('%max', 1500)}`
			});
			setTimeout(() => {
				ctx.message.channel.createMessage({
					content: `✅ ${ctx.message.author.mention} **|** ${ctx.idioma.guess.started}`
				}).then(async msg => {
					const dm = await ctx.message.author.getDMChannel();
					dm.createMessage({
						content: `👀 ${ctx.message.author.mention} **|** ${ctx.idioma.guess.number.replace('%num', number)}`
					}).catch(() => {
						ctx.message.createFollowup({
							content: `👀 ${ctx.message.author.mention} **|** ${ctx.idioma.guess.number.replace('%num', number)}`,
							flags: ctx.ephemeral
						});
					});
					const {
						MessageCollector
					} = require('eris-collector');
					const collector = new MessageCollector(global.zuly, msg.channel, (m) => m.content === `${number}`, {
						time: 300000
					});
					collector.on('collect', async msg => {
						ctx.message.channel.createMessage({
							content: `✅ ${msg.author.mention} **|** ${ctx.idioma.guess.win.replace('%num', number)}`,
							messageReference: {
								channelID: msg.channel.id,
								guildID: msg.channel.guild.id,
								messageID: msg.id
							}
						}).then(() => {
							collector.stop();
						});
					});
				});
			}, 5000);
		}
		else {
			const number = Math.floor(Math.random() * Number(ctx.args[1])) + Number(ctx.args[0]);
			console.log(number);
			ctx.message.channel.slashReply({
				content: `⏰ ${ctx.message.author.mention} **|** ${ctx.idioma.guess.start.replace('%min', Number(ctx.args[0])).replace('%max', Number(ctx.args[1]))}`
			});
			setTimeout(() => {
				ctx.message.channel.createMessage({
					content: `✅ ${ctx.message.author.mention} **|** ${ctx.idioma.guess.started}`
				}).then(async msg => {
					const dm = await ctx.message.author.getDMChannel();
					dm.createMessage({
						content: `👀 ${ctx.message.author.mention} **|** ${ctx.idioma.guess.number.replace('%num', number)}`
					}).catch(() => {
						ctx.message.createFollowup({
							content: `👀 ${ctx.message.author.mention} **|** ${ctx.idioma.guess.number.replace('%num', number)}`,
							flags: ctx.ephemeral
						});
					});
					const {
						MessageCollector
					} = require('eris-collector');
					const collector = new MessageCollector(global.zuly, msg.channel, (m) => m.content === `${number}`, {
						time: 300000
					});
					collector.on('collect', async msg => {
						ctx.message.channel.createMessage({
							content: `✅ ${msg.author.mention} **|** ${ctx.idioma.guess.win.replace('%num', number)}`,
							messageReference: {
								channelID: msg.channel.id,
								guildID: msg.channel.guild.id,
								messageID: msg.id
							}
						}).then(() => {
							collector.stop();
						});
					});
				});
			}, 5000);
		}
	}
};
// 𝖽
