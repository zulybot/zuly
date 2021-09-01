/* eslint-disable new-cap */
module.exports = class EvalCommand {
  constructor () {
    return {
      permissoes: {
        membro: [], // Permissoes que o usuario necessita
        bot: [], // Permissoes que o bot necessita
        dono: false // Se apenas nos devs podem usar o comando
      },
      pt: {
        nome: 'waifu-info',
        categoria: '💖 • Waifu-rolls',
        desc: 'Waifu aleatória'
      },
      en: {
        nome: 'waifu-info',
        categoria: '💖 • Waifu-rolls',
        desc: 'Random waifu.'
      },
      aliases: ['wa', 'wainfo'],
      run: this.run
    }
  }

  async run (ctx) {
    const waifudb = require('../../Database/WaifuDB')
    if (!ctx.args[0]) {
      const embed = new ctx.embed()
      embed.title('♡︰𓂃 [Waifu-Info] ₊˚ฅ ')
      embed.color('#ffcbdb')
      embed.description(`${ctx.idioma.waifu.utl.replace('%p', ctx.prefix)}`)
      embed.field('Waifus:', `>>> ${waifudb.waifus.map(a => '[' + a.id + '] ' + a.name + '\n')}`)
      ctx.send(embed.create)
    } else {
      const waifu = waifudb.waifus[ctx.args[0]]
      const dono = await global.db.get(`waifu-${ctx.message.channel.guild.id}-${waifu.id}`, ctx.message.author.id)

      const embed = new ctx.embed()
      embed.title(`♡︰𓂃 [${waifu.name}] ₊˚ฅ `)
      if (!dono) {
        embed.description(`>>> ๑☕﹕ **Ryos:** ${waifu.valor}\n๑☕﹕ **Anime:** ${waifu.anime}`)
      } else {
        const owner = await global.zuly.getRESTUser(dono)
        embed.description(`>>> ๑☕﹕ **Ryos:** ${waifu.valor}\n๑☕﹕ **Anime:** ${waifu.anime}\n๑☕﹕ **${ctx.idioma.waifu.dono}:** ${owner.username}#${owner.discriminator}`)
      }
      embed.color('#ffcbdb')
      embed.image(waifu.image)
      ctx.send(embed.create)
    }
  }
}
