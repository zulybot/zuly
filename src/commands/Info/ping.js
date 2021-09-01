module.exports = class PingCommand {
  constructor () {
    return {
      permissoes: {
        membro: [], // Permissoes que o usuario necessita
        bot: [], // Permissoes que o bot necessita
        dono: false // Se apenas nos devs podem usar o comando
      },
      pt: {
        nome: 'ping',
        categoria: '📖 • Informação',
        desc: 'Veja a latência do bot'
      },
      en: {
        nome: 'ping',
        categoria: '📖 • Information',
        desc: 'See bot latency'
      },
      aliases: ['latency', 'ws', 'pong'],
      run: this.run
    }
  }

  async run (ctx) {
    const ping = await global.db.ping
    return ctx.send(`🏓 **|** ${ctx.message.author.mention} Pong!\n- **API Ping:** \`${global.star.shards.random().latency}ms\`\n- **Database:** \`${ping}ms\``)
  }
}

// ADG, Davi e LRD
