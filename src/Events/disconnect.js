module.exports = class DisconnectEvent {
	constructor () {
		return {
			nome: 'disconnect',
			run: this.run
		};
	}

	async run () {
		console.log('[ZULY STATUS ERROR] disconnected, in some seconds, zuly return'.red);
		global.zuly.connect();
	}
};
