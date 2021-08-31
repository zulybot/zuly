module.exports = class DisconnectEvent {
  constructor () {
    return {
      nome: 'debug',
      run: this.run
    }
  }

  async run (debug) {
    console.log(`[DEBUG] ${debug}`.yellow)
  }
}
