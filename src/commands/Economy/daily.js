module.exports = class DailyCommand {
  constructor () {
    return {
      permissoes: {
        membro: [], // Permissoes que o usuario necessita
        bot: [], // Permissoes que o bot necessita
        dono: false // Se apenas nos devs podem usar o comando
      },
      pt: {
        nome: 'daily',
        categoria: '💰 • Economia',
        desc: 'Pegue seu dinheiro diário.'
      },
      en: {
        nome: 'daily',
        categoria: '💰 • Economy',
        desc: 'take your daily money.'
      },
      aliases: ['diario'],
      run: this.run
    }
  }

  async run (ctx) {
    const daily = Math.floor(Math.random() * 80) + 18

    const date = Date.now()

    const moneyUser = await global.zuly.db.get(`money-${ctx.id}`)

    const dailyTime = await global.zuly.db.get(`dailytime-${ctx.id}`)

    const timeout = 86400000

    if (!moneyUser || !dailyTime) {
      global.zuly.db.set(`money-${ctx.id}`, daily)
      global.zuly.db.set(`dailytime-${ctx.id}`, date)

      ctx.message.channel.createMessage(`Você ganhou ${daily}`)
    } else {
      if (dailyTime !== null && timeout - (date - dailyTime) > 0) {
        ctx.message.channel.createMessage('Você já pegou seu daily')
      } else {
        const totalMoney = await global.zuly.db.get(`money-${ctx.id}`)
        global.zuly.db.set(`money-${ctx.id}`, totalMoney + daily)
        global.zuly.db.set(`dailytime-${ctx.id}`, date)
      }
    }
  }
}
