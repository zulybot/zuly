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
    setInterval(() => {
      console.log(`[RAM] ${process.memoryUsage().rss / 1024 / 1024}mb`.green)
      global.zuly.users.map(g => global.zuly.users.delete(g.id))
    }, 5000)
  }
}
