/* eslint-disable new-cap */
module.exports = class InviteCommand {
  constructor () {
    return {
      permissoes: {
        membro: [], // Permissoes que o usuario necessita
        bot: ['embedLinks'], // Permissoes que o bot necessita
        dono: false // Se apenas nos devs podem usar o comando
      },
      pt: {
        nome: 'invite',
        categoria: '🕰️ • Utilidades',
        desc: 'Envia o link para me adicionar a outros servidores'
      },
      en: {
        nome: 'invite',
        categoria: '🕰️ • Utility',
        desc: 'Send the link to add me to other servers'
      },
      aliases: ['convidar', 'convidarbot', 'invitebot', 'convite'],
      run: this.run
    }
  }

  async run (ctx) {
    const embed = new ctx.embed()
    embed.title(`📩 ${ctx.idioma.invite.add}`)
    embed.description(ctx.idioma.invite.desc.replace('%id', global.zuly.user.id))
    embed.color('#ffcbdb')
    embed.thumbnail(global.zuly.user.avatarURL)
    ctx.send(embed.create)
  }
}
