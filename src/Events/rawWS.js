module.exports = class rawWS {
	constructor () {
	  return {
			nome: 'rawWS',
			run: this.run
	  };
	}
	async run (packet) {
		global.zuly.music.updateVoiceState(packet);
	}
};
