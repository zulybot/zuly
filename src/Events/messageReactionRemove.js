module.exports = class MessageReactionAddEvent {
	constructor () {
		return {
			nome: 'messageReactionRemove',
			run: this.run
		};
	}
	async run (msg, user) {
		const emoji = msg._emoji;
		const message = msg.message;

		const member = await message.guild.members.fetch(user.id);

		const system = require('../Config/system.js');
		if (member.bot) return;
		const rr = await global.zuly.db.get(`reaction-${emoji.name}-${message.id}`);
		if (rr) {
			member.roles.remove(rr, `ReactionRole - ${global.zuly.user.username}`).then(async () => {
				const { WebhookClient } = require('discord.js');
				const hook = new WebhookClient({
					id: system.reactionRole.id,
					token: system.reactionRole.token
				});

				await hook.send({
					avatarURL: global.zuly.user.displayAvatarURL({ dynamic: true, format: 'png', size: 4096 }),
					username: global.zuly.user.username,
					content: `> 💼 **ReactionRole** | O Usuário \`${member.user.username}#${member.user.discriminator} (${member.user.id})\` ganhou o cargo de id \`${rr}\` no servidor \`${message.guild.name}\` através do sistema de reactionrole.`
				});
			});
		}
	}
};
