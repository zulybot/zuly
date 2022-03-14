module.exports = class GuildMemberAddEvent {
	constructor () {
		return {
			nome: 'guildMemberAdd',
			run: this.run
		};
	}
	async run (guild, member) {
		try {
			const autorolebot = await global.zuly.db.get(`autorolebot-${guild.id}`);
			const autoroleuser = await global.zuly.db.get(`autoroleuser-${guild.id}`);
			// dê os cargos aos membros
			if (autorolebot) {
				autorolebot.map((id) => {
					member.addRole(id);
				});
			}
			else {
				autoroleuser.map((id) => {
					member.addRole(id);
				});
			}
		}
		catch (e) {
			console.log(e);
		}
	}
};
