/* eslint-disable new-cap */
module.exports = class HentaiCommand {
  constructor () {
    return {
      permissoes: {
        membro: [],
        bot: ['embedLinks'],
        dono: false,
        nsfw: true
      },
      pt: {
        nome: 'hentai',
        categoria: '⛔ » NSFW',
        desc: 'Exibir uma imagem de peito aleatória/gif'
      },
      en: {
        nome: 'hentai',
        categoria: '⛔ » NSFW',
        desc: 'Display a random boobs image/gif'
      },
      aliases: ['h', 'hent'],
      run: this.run
    }
  }

  async run (ctx) {
    const { get } = require('axios')
    await get('https://nekobot.xyz/api/image?type=hentai').then(async response => {
      const res = response.data
      const embed = new ctx.embed()
      embed.color('#ffcbdb')
      embed.image(res.message)
      embed.footer(`Executed by: ${ctx.message.author.username}#${ctx.message.author.discriminator}`)
      return ctx.send(embed.create)
    })
  }
}
