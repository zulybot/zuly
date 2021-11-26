module.exports = class ExecCommand {
	constructor () {
		return {
			permissoes: {
				membro: [],
				bot: [],
				dono: false
			},
			pt: {
				nome: 'exec',
				categoria: '💻 » Dev',
				desc: 'Eval público para desenvolvedores testarem coisas.'
			},
			en: {
				nome: 'exec',
				categoria: '💻 » Dev',
				desc: 'Public eval for developers to test things.'
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
			options: [{
				type: 3,
				name: 'code',
				description: 'the code',
				required: false
			}],
			aliases: ['exec', 'ec', 'publiceval'],
			run: this.run
		};
	}

	async run (ctx) {
		const safeEval = require('../../CustomPackages/safeEval');
		function clean (text) {
			if (typeof text === 'string') {
				return text.replace(/`/g, '`' + String.fromCharCode(8203)).replace(/@/g, '@' + String.fromCharCode(8203));
			}
			else {
				return text;
			}
		}
		function errorEmbed (err) {
			function clean (err) {
				if (typeof err === 'string') {
					return err
						.replace(/`/g, '`' + String.fromCharCode(8203))
						.replace(/@/g, '@' + String.fromCharCode(8203));
				}
				else {
					return err;
				}
			}
			const embed = new ctx.embed();
			embed.setTitle(`💻 Exec | ${global.zuly.user.username}`);
			embed.setThumbnail(global.zuly.user.avatarURL);
			embed.addField('📥 Input', '```' + ctx.args.join(' ') + '```');
			embed.addField('📤 Result', '```xl\n' + clean(err) + '\n```');
			embed.setColor('#ff0000');
			embed.setFooter('⤷ zulybot.xyz', global.zuly.user.avatarURL);
			return embed;
		}
		try {
			let evaled = safeEval(ctx.args.join(' '));
			if (typeof evaled !== 'string') evaled = require('util').inspect(evaled);
			const embed = new ctx.embed();
			embed.setTitle(`💻 Exec | ${global.zuly.user.username}`);
			embed.setThumbnail(global.zuly.user.avatarURL);
			embed.addField('📥 Input', '```' + ctx.args.join(' ') + '```');
			embed.addField('📤 Result', '```' + clean(evaled) + '```');
			embed.setColor('#00FF00');
			embed.setFooter('⤷ zulybot.xyz', global.zuly.user.avatarURL);
			ctx.message.channel.slashReply({
				content: ctx.message.author.mention,
				embeds: [embed.get()]
			});
		}
		catch (err) {
			const embed = errorEmbed(err);
			ctx.message.channel.slashReply({
				content: ctx.message.author.mention,
				embeds: [embed.get()]
			});
		}
	}
};
