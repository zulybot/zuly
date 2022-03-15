module.exports = class MessageReactionAddEvent {
	constructor () {
		return {
			nome: 'messageReactionAdd',
			run: this.run
		};
	}
	async run (message, member) {
		const emoji = message._emoji;
		const system = require('../Config/system.js');
		if (member.bot) return;
		const rr = await global.zuly.db.get(`reaction-${emoji.name}-${message.id}`);
		if (rr) {
			await member.addRole(rr, `ReactionRole - ${global.zuly.user.username}`).then(async () => {
				const { WebhookClient } = require('discord.js');
				const hook = new WebhookClient(system.reactionRole.id, system.reactionRole.token);

				await hook.send({
					avatarURL: global.zuly.user.displayAvatarURL({ dynamic: true, format: 'png', size: 4096 }),
					username: global.zuly.user.username,
					content: `> 💼 **ReactionRole** | O Usuário \`${member.user.username}#${member.user.discriminator} (${member.user.id})\` ganhou o cargo de id \`${rr}\` no servidor \`${message.guild.name}\` através do sistema de reactionrole.`
				});
			});
		}
	}
};
