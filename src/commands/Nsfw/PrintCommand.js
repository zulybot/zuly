/* eslint-disable new-cap */
module.exports = class PrintCommand {
  constructor () {
    return {
      permissoes: {
        membro: [],
        bot: [],
        dono: false,
        nsfw: true
      },
      pt: {
        nome: 'print',
        categoria: '⛔ » NSFW',
        desc: 'Tira print de um site'
      },
      en: {
        nome: 'print',
        categoria: '⛔ » NSFW',
        desc: 'Take a print of a website'
      },
      aliases: ['foto', 'site', 'website'],
      run: this.run
    }
  }

  async run (ctx) {
    if (!ctx.args[0]) return ctx.send(`:x: ${ctx.message.author.mention} **|** ${ctx.idioma.print.web}`)
    const foto = `https://image.thum.io/get/maxAge/12/width/700/crop/900/${ctx.args.join(' ')}`
    const embed = new ctx.embed()
    embed.image(foto)
    embed.color('#ffcbdb')
    ctx.send(embed.create)
  }
}
