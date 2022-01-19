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
			options: [],
			aliases: ['wa', 'wai', 'w'],
			run: this.run
		};
	}

	async run (ctx) {
		const ReactionCollector = require('../../Helpers/ReactionCollector');
		const { get } = require('axios');
		await get('https://waifu-generator.vercel.app/api/v1').then(async response => {
			const res = response.data;
			const rand = Math.floor(Math.random() * res.length);
			const waifu = res[rand];
			waifu.id = rand;
			waifu.valor = Math.floor(Math.random() * 2000) + 18;
			const dono = await global.db.get(`waifu-${ctx.message.channel.guild.id}-${waifu.id}`, ctx.message.author.id);
			const timeout = 7200000;
			const embed = new ctx.embed();
			embed.setTitle(`♡︰𓂃 [${waifu.name}] ₊˚ฅ `);
			if (!dono) {
				embed.setDescription(`>>> ๑☕﹕ **Ryos:** ${waifu.valor}\n๑☕﹕ **Anime:** ${waifu.anime}`);
			}
			else {
				const owner = await global.zuly.getRESTUser(dono);
				embed.setDescription(`>>> ๑☕﹕ **Ryos:** ${waifu.valor}\n๑☕﹕ **Anime:** ${waifu.anime}\n๑☕﹕ **${ctx.idioma.waifu.dono}:** ${owner.username}#${owner.discriminator}`);
			}
			embed.setColor('#ffcbdb');
			embed.setImage(waifu.image);
			if (!dono) {
				embed.setFooter('⤷ zulybot.xyz | ' + ctx.idioma.waifu.casar, global.zuly.user.avatarURL);
			}
			else {
				embed.setFooter('⤷ zulybot.xyz', global.zuly.user.avatarURL);
			}
			ctx.message.channel.slashReply({
				content: ctx.message.author.mention,
				embeds: [embed.get()]
			}).then(async message => {
				if (!dono) {
					const MarryCollector = new ReactionCollector(message, {
						user: ctx.message.author,
						ignoreBot: true,
						emoji: '💖',
						time: 60000,
						max: 1,
						acceptReactionRemove: false,
						stopOnCollect: true
					});
					message.addReaction('💖');
					MarryCollector.on('collect', async () => {
						const date = Date.now();
						const marrytime = await global.db.get(`timeout-${ctx.message.author.id}`);
						if (marrytime !== null && timeout - (date - marrytime) > 0) return ctx.message.channel.slashReply(`:x: ${ctx.message.author.mention} **|** ${ctx.idioma.waifu.casado}`);
						const ryos = await global.db.get(`ryos-${ctx.message.author.id}`);
						if (ryos) {
							global.db.set(`ryos-${ctx.message.author.id}`, ryos + waifu.valor);
						}
						else {
							global.db.set(`ryos-${ctx.message.author.id}`, waifu.valor);
						}
						global.db.set(`waifu-${ctx.message.channel.guild.id}-${waifu.id}`, ctx.message.author.id);
						global.db.set(`timeout-${ctx.message.author.id}`, Date.now());
						const embed = new ctx.embed();
						embed.setTitle(`♡︰𓂃 [${waifu.name}] ₊˚ฅ `);
						embed.setDescription(`>>> ๑☕﹕ **Ryos:** ${waifu.valor}\n๑☕﹕ **Anime:** ${waifu.anime}`);
						embed.setColor('#ffcbdb');
						embed.setImage(waifu.image);
						embed.setFooter('⤷ zulybot.xyz | ' + ctx.idioma.waifu.casou.replace('%w', waifu.name), waifu.image);
						message.edit({
							content: ctx.message.author.mention,
							embeds: [embed.get()]
						});
					});
				}
			});
		});
	}
};
