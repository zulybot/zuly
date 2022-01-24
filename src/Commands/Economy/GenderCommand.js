module.exports = class DailyCommand {
	constructor () {
		return {
			permissoes: {
				membro: [],
				bot: [],
				dono: false
			},
			pt: {
				nome: 'gender',
				categoria: '💰 » Economia',
				desc: 'Altere seu gênero.'
			},
			en: {
				nome: 'gender',
				categoria: '💰 » Economy',
				desc: 'Change your gender.'
			},
			fr: {
				nome: 'gender',
				categoria: '💰 » Économie',
				desc: 'Changer de sexe.'
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
		const embed = new ctx.embed();
		embed.setTitle(`${ctx.idioma.gender.title} | ${global.zuly.user.username}`);
		embed.setDescription(ctx.idioma.gender.desc.replace('%u', ctx.message.author.mention));
		embed.setFooter('⤷ zulybot.xyz', global.zuly.user.avatarURL);
		embed.setColor('#ffcbdb');
		embed.setThumbnail(global.zuly.user.avatarURL);
		ctx.message.channel.slashReply({
			content: ctx.message.author.mention,
			embeds: [embed.get()]
		}).then(async (msg) => {
			const { ReactionCollector } = require('eris-collector');
			// Adicionando Reações
			msg.addReaction('🚹');
			msg.addReaction('🚺');
			msg.addReaction('🚻');
			// Filtros
			let MeninoFilter = (m, emoji) => emoji.name === '🚹';
			let MeninaFilter = (m, emoji) => emoji.name === '🚺';
			let LgbtFilter = (m, emoji) => emoji.name === '🚻';
			// Coletores
			let MeninoColetor = new ReactionCollector(global.zuly, msg, MeninoFilter, {
				time: 60000
			});
			let MeninaColetor = new ReactionCollector(global.zuly, msg, MeninaFilter, {
				time: 60000
			});
			let LgbtColetor = new ReactionCollector(global.zuly, msg, LgbtFilter, {
				time: 60000
			});
			// Eventos
			MeninoColetor.on('collect', async (m, reaction, user) => {
				if (user.id !== ctx.message.author.id) return;
				if (user.id === ctx.message.author.id) {
					await global.db.set(`gender-${ctx.message.author.id}`, 'male');
					ctx.message.channel.slashReply(`:white_check_mark: ${ctx.message.author.mention} **|** ${ctx.idioma.gender.change.replace('%g', ctx.idioma.gender.male)}`);
					// End Collectors
					MeninoColetor.stop();
					MeninaColetor.stop();
					LgbtColetor.stop();
				}
			});
			MeninaColetor.on('collect', async (m, reaction, user) => {
				if (user.id !== ctx.message.author.id) return;
				if (user.id === ctx.message.author.id) {
					await global.db.set(`gender-${ctx.message.author.id}`, 'female');
					ctx.message.channel.slashReply(`:white_check_mark: ${ctx.message.author.mention} **|** ${ctx.idioma.gender.change.replace('%g', ctx.idioma.gender.female)}`);
					// End Collectors
					MeninoColetor.stop();
					MeninaColetor.stop();
					LgbtColetor.stop();
				}
			});
			LgbtColetor.on('collect', async (m, reaction, user) => {
				if (user.id !== ctx.message.author.id) return;
				if (user.id === ctx.message.author.id) {
					await global.db.set(`gender-${ctx.message.author.id}`, 'lgbt');
					ctx.message.channel.slashReply(`:white_check_mark: ${ctx.message.author.mention} **|** ${ctx.idioma.gender.change.replace('%g', 'lgbt')}`);
					// End Collectors
					MeninoColetor.stop();
					MeninaColetor.stop();
					LgbtColetor.stop();
				}
			});
		});
	}
};
