module.exports = class MessageReactionRemoveEvent {
	constructor () {
		return {
			nome: 'messageReactionRemove',
			run: this.run
		};
	}
	async run (message, emoji, user) {
		const system = require('../Config/system.js');
		const member = await message.guild.getRESTMember(user);
		if (member.bot) return;
		const rr = await global.zuly.db.get(`reaction-${emoji.name}-${message.id}`);
		if (rr) {
			await member.removeRole(rr, `ReactionRole - ${global.zuly.user.username}`).then(async () => {
				await global.zuly.executeWebhook(system.reactionRole.id, system.reactionRole.token, {
					avatarURL: global.zuly.user.avatarURL,
					username: global.zuly.user.username,
					content: `> 💼 **ReactionRole** | O Usuário \`${member.user.username}#${member.user.discriminator} (${member.user.id})\` perdeu o cargo de id \`${rr}\` no servidor \`${message.guild.name}\` através do sistema de reactionrole.`
				});
			});
		}
	}
};
