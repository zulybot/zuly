module.exports = class GuildMemberAddEvent {
	constructor () {
		return {
			nome: 'guildMemberAdd',
			run: this.run
		};
	}
	async run (member) {
		try {
			const autorolebot = await global.zuly.db.get(`autorolebot-${member.guild.id}`);
			const autoroleuser = await global.zuly.db.get(`autoroleuser-${member.guild.id}`);
			if (autorolebot || autoroleuser) {
				if (member.user.bot) {
					await member.roles.add(autorolebot, 'AutoRole [Bot] - Zuly');
				}
				if (!member.user.bot) {
					await member.roles.add(autoroleuser, 'AutoRole [User] - Zuly');
				}
			}
		}
		catch (e) {
			console.log(e);
		}
	}
};
