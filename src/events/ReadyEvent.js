module.exports = class ReadyEvent {
  constructor () {
    return {
      nome: 'ready',
      type: 'once',
      run: this.run
    }
  }

  async run () {
  console.log(`[ZULY] ${global.zuly.user.username}#${global.zuly.user.discriminator} Ligada`.green)
  }
}