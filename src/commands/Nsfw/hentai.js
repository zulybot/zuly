module.exports = class HentaiCommand {
    constructor() {
        return {
            permissoes: {
                membro: [],
                bot: ['embedLinks'],
                dono: false,
                nsfw: true
            },
            pt: {
                nome: 'hentai',
                categoria: '⛔ • NSFW',
                desc: 'Exibe uma imagem aleatoria de hentai'
            },
            en: {
                nome: 'hentai',
                categoria: '⛔ • NSFW',
                desc: 'Display a random image of hentai'
            },
            aliases: ['hent'],
            run: this.run
        }
    }

    async run(ctx) {
      const {get} = require('axios')
      await get('https://nekos.life/api/v2/img/hentai').then(async response => {
        const res = response.data
        const embed = new ctx.embed()
        embed.color('#dd3af0')
        embed.image(res.url)
        embed.footer(`Executed by: ${ctx.message.author.username}#${ctx.message.author.discriminator}`)
        return ctx.send(embed.create)
      })
  }
}