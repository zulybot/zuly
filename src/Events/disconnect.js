module.exports = class DisconnectEvent {
	constructor () {
		return {
			nome: 'disconnect',
			run: this.run
		};
	}
	async run () {
		console.log('[DISCONNECT] disconnected, in some seconds, zuly return'.red);
		global.zuly.connect();
	}
};