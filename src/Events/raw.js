module.exports = class DisconnectEvent {
	constructor () {
		return {
			nome: 'raw',
			run: this.run
		};
	}
	async run (d) {
		global.zuly.music.updateVoiceState(d);
	}
};
