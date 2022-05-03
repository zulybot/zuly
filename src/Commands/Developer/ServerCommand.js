module.exports = class BanCommand {
	constructor () {
		return {
			permissoes: {
				membro: [],
				bot: ['EMBED_LINKS'],
				dono: true
			},
			pt: {
				nome: 'server',
				categoria: '💻 » Dev',
				desc: 'Comandos destinados ao servidor de suporte da Zuly.'
			},
			en: {
				nome: 'server',
				categoria: '💻 » Dev',
				desc: 'Commands intended for the Zuly support server.'
			},
			fr: {
				nome: 'server',
				categoria: '💻 » Dev',
				desc: 'Commandes pour le serveur de support zuly.'
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
					name: 'rules',
					description: 'See the server rules.',
					required: false,
					name_localizations: {
						'pt-BR': 'regras',
						'en-US': 'rules',
						'fr': 'règles'
					},
					description_localizations: {
						'pt-BR': 'Ver as regras do servidor.',
						'en-US': 'See the server rules.',
						'fr': 'Voir les règles du serveur.'
					}
				}
			],
			aliases: ['zulyban'],
			run: this.run
		};
	}

	async run (ctx) {
		ctx.message.channel.slashReply({
			content: '✅ **|** Sucesso.'
		}).then(msg => {
			msg.delete();
		});
		const { MessageAttachment } = require('discord.js');
		if (ctx.args[0] === 'rules') {
			const rulesBanner = new MessageAttachment('./assets/images/server/rules.png', 'regras-zuly.png');
			ctx.message.channel.send({
				files: [rulesBanner]
			});
			setTimeout(() => {
				const embed = new ctx.embed();
				embed.setTitle('📖 » Regras');
				embed.setDescription('<:zu_basic:885925886837264384> Leiam as regras para que todos tenhamos uma boa convivência na comunidade.');
				embed.addField('⛔ » Níveis de punições:', '```1 » Nível Básico: Warn [1], dependendo do caso um mute de até 42 horas\n2 » Nível Infrator: Warn [2], dependendo do caso você pode tomar mute de 1 semana ou ban.\n3 » Nível Extremo: Warn [3], dependendo do caso você pode tomar ban ou até um zulyban (ser banido de usar a zuly)```');
				embed.addField('📚 » Regras Gerais:', '`1 » ` **Spam:** É proibido mandar a mesma mensagem diversas vezes ou mensagens com mensagens aleatórias como Copypasta, propaganda e afins.\n`2 » ` **NSFW:** É proibido o envio de conteúdos NSFW nos chats, que principalmente consiste em gore, Creepypastas pesadas e/ou pornografia/hentais, também é valido para fotos de perfil.\n`3 » ` **Discriminação:** Não será permitido qualquer atitude ou fala preconceituosa.\nex:\n↳ Difamar da religião alheia;\n↳ Difamar da escolha sexual do outro;\n↳ Difamar do tom de pele alheio.');
				embed.addField('🙋 » Regras Suporte:', '↳ Além das regras escritas no <#880486887981211738> & <#880860757552668672> também é importante que você tenha consciência de:\n`1 » ` Não se intrometa no suporte. Se você ver que alguém está precisando de suporte no <#885215178701037629>, mas algum membro da equipe já está no canal ajudando ou um membro da equipe começou a digitar, deixe tudo com ele.\n`2 » ` Não marque a <@&880406988486479883> desnecessariamente, tanto no <#885215178701037629> ou <#880486887981211738>, tenha paciência e alguém vai te atender.\n`3 » ` Evite perguntas idiotas, sempre leia o <#880860757552668672> antes de pedir ajuda no <#885215178701037629> ou no <#880486887981211738>.\n`4 » ` Não mencione membros da equipe para motivos especiais que precisam ser tratados via DM ou afins, para isso abra um <#880486887981211738>.');
				embed.addField('_ _', '> ⚠️ Nossas regras tem intuito de educar e garantir um bom ambiente para os usuários, e não meramente punir. Se você tem uma dúvida ou quer denunciar um membro, faça em https://dis.gd/report.');
				embed.setColor('#ffcbdb');
				embed.setThumbnail(global.zuly.user.displayAvatarURL({ dynamic: true, format: 'png', size: 4096 }));
				embed.setFooter('⤷ zulybot.xyz', global.zuly.user.displayAvatarURL({ dynamic: true, format: 'png', size: 4096 }));
				ctx.message.channel.send({
					embeds: [embed.get()]
				});

				const embed2 = new ctx.embed();
				embed2.setTitle('🔗 » Links');
				embed2.setDescription('>>> 🌐 » **Website:** https://zulybot.xyz\n:robot: » **Convite do Bot:** https://zulybot.xyz/add\n:envelope_with_arrow: » **Convite do Servidor:** https://discord.gg/pyyyJpw5QW');
				embed2.setColor('#ffcbdb');
				embed2.setThumbnail(global.zuly.user.displayAvatarURL({ dynamic: true, format: 'png', size: 4096 }));
				embed2.setFooter('⤷ zulybot.xyz', global.zuly.user.displayAvatarURL({ dynamic: true, format: 'png', size: 4096 }));
				ctx.message.channel.send({
					embeds: [embed2.get()]
				});

				ctx.message.channel.send({
					content: '📪 **|** https://discord.gg/pyyyJpw5QW',
				}).then(msg => {
					msg.react(':zu_members:936975701322633256');
				});

				ctx.message.channel.send({
					content: '@everyone'
				}).then(msg => {
					msg.delete();
				});
			}, 5000);
		}
	}
};
// ADG, Davi e LRD
