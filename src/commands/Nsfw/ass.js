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
                nome: 'ass',
                categoria: '⛔ • NSFW',
                desc: 'Exibir uma imagem de bunda aleatória/gif'
            },
            en: {
                nome: 'ass',
                categoria: '⛔ • NSFW',
                desc: 'Display a random ass image/gif'
            },
            aliases: ['bunda', 'butts'],
            run: this.run
        }
    }

    async run(ctx) {
      const {get} = require('axios')
      await get('http://api.obutts.ru/butts/0/1/random').then(async response => {
        const res = response.data
        const embed = new ctx.embed()
        embed.color('#ffcbdb')
        embed.image('http://media.obutts.ru/' + res[0].preview)
        embed.footer(`Executed by: ${ctx.message.author.username}#${ctx.message.author.discriminator}`)
        return ctx.send(embed.create)
      })
  }
}