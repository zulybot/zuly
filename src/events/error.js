module.exports = class DisconnectEvent {
	constructor () {
		return {
			nome: 'error',
			run: this.run
		};
	}

	async run (error) {
		console.log(`[ERROR] ${error}`.red);
	}
};
