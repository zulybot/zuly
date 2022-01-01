module.exports = class guildMemberAdd {
	constructor () {
		return {
			nome: 'guildMemberAdd',
			run: this.run
		};
	}
	async run (guild, member) {
		const autorolebot = await global.db.get(`autorolebot-${guild.id}`);
		const autoroleuser = await global.db.get(`autoroleuser-${guild.id}`);
		if (!autorolebot || !autoroleuser) return;
		if (member.user.bot) {
			return autorolebot.forEach(async (role) => {
				member.addRole(role, 'AutoRole - Bot');
			});
		}
		else {
			return autoroleuser.forEach(async (role) => {
				member.addRole(role, 'AutoRole - User');
			});
		}
	}
};
