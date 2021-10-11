module.exports = class voiceChannelSwitch {
	constructor () {
		return {
			nome: 'voiceChannelSwitch',
			run: this.run
		};
	}
	async run (member, newChannel, oldChannel) {
		const player = global.zuly.music.players.get(member.guild.id);
		if (!player || member.bot) return;

		if (oldChannel.id === player.voiceChannel && !oldChannel.voiceMembers.filter(m => !m.bot).length && newChannel.id !== player.voiceChannel) {
			player.destroy();
			await global.zuly.createMessage(player.textChannel, ':warning: Parei a música porque fiquei sozinho no canal de voz.');
			return;
		}

		if (newChannel.id === player.voiceChannel && this.client.music.channelTimeouts.has(member.guild.id) && newChannel.voiceMembers.filter(m => !m.bot).length) {
			player.pause(false);
		}
	}
};
