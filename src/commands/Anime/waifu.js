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
        nome: 'waifu',
        categoria: '💖 • Waifu-rolls',
        desc: 'Waifu aleatória'
      },
      en: {
        nome: 'waifu',
        categoria: '💖 • Waifu-rolls',
        desc: 'Random waifu.'
      },
      aliases: ['wa', 'wai'],
      run: this.run
    }
  }

  async run (ctx) {
    const ReactionCollector = require('../../Helpers/ReactionCollector')
    const waifudb = require('../../Database/WaifuDB')
    const rand = Math.floor(Math.random() * waifudb.waifus.length)
    const waifu = waifudb.waifus[rand]
    const dono = await global.db.get(`waifu-${ctx.message.channel.guild.id}-${waifu.id}`, ctx.message.author.id)
    const timeout = 7200000

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
    if (!dono) {
      embed.footer(ctx.idioma.waifu.casar, global.zuly.user.avatarURL)
    }
    ctx.message.channel.createMessage(embed.create).then(async message => {
      if (!dono) {
        const MarryCollector = new ReactionCollector(message, {
          user: ctx.message.author,
          ignoreBot: true,
          emoji: '💖',
          time: 60000,
          max: 1,
          acceptReactionRemove: false,
          stopOnCollect: true
        })
        message.addReaction('💖')
        MarryCollector.on('collect', async (msg) => {
          const date = Date.now()
          const marrytime = await global.db.get(`timeout-${ctx.message.channel.guild.id}-${ctx.message.author.id}`, Date.now())
          if (marrytime !== null && timeout - (date - marrytime) > 0) return ctx.send('')

          const ryos = await global.db.get(`ryos-${ctx.message.author.id}`)
          if (ryos) {
            global.db.set(`ryos-${ctx.message.channel.guild.id}-${ctx.message.author.id}`, ryos + waifu.valor)
          } else {
            global.db.set(`ryos-${ctx.message.channel.guild.id}-${ctx.message.author.id}`, waifu.valor)
          }
          global.db.set(`waifu-${ctx.message.channel.guild.id}-${waifu.id}`, ctx.message.author.id)
          global.db.set(`timeout-${ctx.message.channel.guild.id}-${ctx.message.author.id}`, Date.now())

          const embed = new ctx.embed()
          embed.title(`♡︰𓂃 [${waifu.name}] ₊˚ฅ `)
          embed.description(`>>> ๑☕﹕ **Ryos:** ${waifu.valor}\n๑☕﹕ **Anime:** ${waifu.anime}`)
          embed.color('#ffcbdb')
          embed.image(waifu.image)
          embed.footer(ctx.idioma.waifu.casou.replace('%w', waifu.name), waifu.image)
          message.edit(embed.create)
        })
      }
    })
  }
}
