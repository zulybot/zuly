/* eslint-disable max-nested-callbacks */
/* eslint-disable new-cap */
module.exports = class EvalCommand {
	constructor () {
		return {
			permissoes: {
				membro: [],
				bot: [],
				dono: false
			},
			pt: {
				nome: 'waifu',
				categoria: '💖 » Waifu',
				desc: 'Case com alguma waifu!'
			},
			en: {
				nome: 'waifu',
				categoria: '💖 » Waifu',
				desc: 'Marry some waifu!'
			},
			fr: {
				nome: 'waifu',
				categoria: '💖 » Waifu',
				desc: 'Marry some waifu!'
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
					type: 1,
					name: 'harem',
					description: 'Check your waifus harem.'
				},
				{
					type: 1,
					name: 'roll',
					description: 'Roll waifus.'
				},
				{
					type: 1,
					name: 'list',
					description: 'A Waifu list.'
				}
			],
			aliases: ['wa', 'wai', 'w'],
			run: this.run
		};
	}

	async run (ctx) {
		const { get } = require('axios');
		if (ctx.args[0] === 'roll') {
			const { ReactionCollector } = require('discord.js');
			await get('https://waifu-generator.vercel.app/api/v1').then(async response => {
				const res = response.data;
				const rand = Math.floor(Math.random() * res.length);
				const waifu = res[rand];
				waifu.id = rand;
				const valor = await global.zuly.db.get(`waifu-${waifu.id}`);
				if (valor) {
					waifu.valor = valor;
				}
				else {
					waifu.valor = Math.floor(Math.random() * 2000) + 18;
					await global.zuly.db.set(`waifu-${waifu.id}`, waifu.valor);
				}
				const dono = await global.zuly.db.get(`waifu-${ctx.message.guild.id}-${waifu.id}`, ctx.message.author.id);
				const timeout = 7200000;
				const embed = new ctx.embed();
				embed.setTitle(`♡︰𓂃 [${waifu.name}] ₊˚ฅ `);
				if (!dono) {
					embed.setDescription(`>>> ๑☕﹕ **Ryos:** ${waifu.valor}\n๑☕﹕ **Anime:** ${waifu.anime}`);
				}
				else {
					const owner = await global.zuly.users.fetch(dono);
					embed.setDescription(`>>> ๑☕﹕ **Ryos:** ${waifu.valor}\n๑☕﹕ **Anime:** ${waifu.anime}\n๑☕﹕ **${ctx.idioma.waifu.dono}:** ${owner.username}#${owner.discriminator}`);
				}
				embed.setColor('#ffcbdb');
				embed.setImage(waifu.image);
				if (!dono) {
					embed.setFooter('⤷ zulybot.xyz | ' + ctx.idioma.waifu.casar, global.zuly.user.displayAvatarURL({ dynamic: true, format: 'png', size: 4096 }));
				}
				else {
					embed.setFooter('⤷ zulybot.xyz', global.zuly.user.displayAvatarURL({ dynamic: true, format: 'png', size: 4096 }));
				}
				ctx.message.channel.slashReply({
					content: ctx.message.author.mention,
					embeds: [embed.get()]
				}).then(async message => {
					if (!dono) {
						const MarryCollector = new ReactionCollector(message);
						message.react('💖');
						MarryCollector.on('collect', async (reaction, user) => {
							if (user.id !== ctx.message.author.id) return;
							const date = Date.now();
							const marrytime = await global.zuly.db.get(`timeout-${ctx.message.author.id}`);
							if (marrytime !== null && timeout - (date - marrytime) > 0) {
								return ctx.message.channel.slashReply({
									content: `:x: ${ctx.message.author.mention} **|** ${ctx.idioma.waifu.casado}.`,
									embeds: []
								});
							}
							const ryos = await global.zuly.db.get(`ryos-${ctx.message.author.id}`);
							if (ryos) {
								await global.zuly.db.set(`ryos-${ctx.message.author.id}`, ryos + waifu.valor);
							}
							else {
								await global.zuly.db.set(`ryos-${ctx.message.author.id}`, waifu.valor);
							}
							await global.zuly.db.set(`waifu-${ctx.message.guild.id}-${waifu.id}`, ctx.message.author.id);
							const harem = await global.zuly.db.get(`harem-${ctx.message.guild.id}-${ctx.message.author.id}`);
							if (harem) {
								global.zuly.db.push(`harem-${ctx.message.guild.id}-${ctx.message.author.id}`, waifu.id);
							}
							else {
								global.zuly.db.set(`harem-${ctx.message.guild.id}-${ctx.message.author.id}`, [waifu.id]);
							}
							global.zuly.db.set(`timeout-${ctx.message.author.id}`, Date.now());
							const embed = new ctx.embed();
							embed.setTitle(`♡︰𓂃 [${waifu.name}] ₊˚ฅ `);
							embed.setDescription(`>>> ๑☕﹕ **Ryos:** ${waifu.valor}\n๑☕﹕ **Anime:** ${waifu.anime}`);
							embed.setColor('#ffcbdb');
							embed.setImage(waifu.image);
							embed.setFooter('⤷ zulybot.xyz | ' + ctx.idioma.waifu.casou.replace('%w', waifu.name), global.zuly.user.displayAvatarURL({ dynamic: true, format: 'png', size: 4096 }));
							message.edit({
								content: ctx.message.author.mention,
								embeds: [embed.get()]
							});
						});
					}
				});
			});
		}
		else if (ctx.args[0] === 'harem') {
			const harem = await global.zuly.db.get(`harem-${ctx.message.guild.id}-${ctx.message.author.id}`);
			if (!harem) {
				return ctx.message.channel.slashReply({
					content: `:x: ${ctx.message.author.mention} **|** ${ctx.idioma.waifu.noharem}.`,
					embeds: []
				});
			}
			else {
				await get('https://waifu-generator.vercel.app/api/v1').then(async response => {
					const embed = new ctx.embed();
					embed.setTitle(`♡︰𓂃 [${ctx.message.author.username}] ₊˚ฅ `);
					harem.forEach(async (wad) => {
						const res = response.data;
						const waifu = res[wad];
						const valor = await global.zuly.db.get(`waifu-${wad}`);
						embed.addField(`${waifu.name}`, `>>> ๑☕﹕ **ID:** ${wad}\n๑☕﹕ **Ryos:** ${valor}\n๑☕﹕ **Anime:** ${waifu.anime}`, true);
					});
					embed.setColor('#ffcbdb');
					embed.setFooter('⤷ zulybot.xyz', global.zuly.user.displayAvatarURL({ dynamic: true, format: 'png', size: 4096 }));
					setTimeout(async () => {
						ctx.message.channel.slashReply({
							content: ctx.message.author.mention,
							embeds: [embed.get()]
						});
					}, 5000);
				});
			}
		}
		else if (ctx.args[0] === 'list') {
			const embeds = [];
			const paginationEmbed = require('../../Helpers/ButtonPages');
			await get('https://waifu-generator.vercel.app/api/v1').then(async response => {
				const walist = response.data;
				walist.forEach(async (wa, id) => {
					const valor = await global.zuly.db.get(`waifu-${id}`);
					if (valor) {
						wa.valor = valor;
					}
					else {
						wa.valor = Math.floor(Math.random() * 2000) + 18;
						await global.zuly.db.set(`waifu-${id}`, wa.valor);
					}
					const embed = new (require('discord.js')).MessageEmbed;
					embed.setTitle(`♡︰𓂃 [${wa.name}] ₊˚ฅ `);
					embed.setDescription(`>>> ๑☕﹕ **ID:** ${id}\n๑☕﹕ **Ryos:** ${wa.valor}\n๑☕﹕ **Anime:** ${wa.anime}`);
					embed.setColor('#ffcbdb');
					embed.setImage(wa.image);
					embeds.push(embed);
				});
			});

			const { MessageButton } = require('discord.js');
			const button1 = new MessageButton()
				.setCustomId('previousbtn')
				.setEmoji('⬅️')
				.setStyle('PRIMARY');
			const button2 = new MessageButton()
				.setCustomId('nextbtn')
				.setEmoji('➡️')
				.setStyle('PRIMARY');
			const buttonList = [
				button1,
				button2
			];
			setTimeout(async () => {
				await paginationEmbed(ctx.message, embeds, buttonList);
			}, 3000);
		}
	}
};
