module.exports = class BaninfoCommand {
  constructor () {
    return {
      permissoes: {
        membro: ['banMembers'], // Permissoes que o usuario necessita
        bot: ['banMembers'], // Permissoes que o bot necessita
        dono: false // Se apenas nos devs podem usar o comando
      },
      pt: {
        nome: 'baninfo',
        categoria: '<:zu_certifiedmod:885193463111483412> » Moderação',
        desc: 'Veja a informação de algum ban'
      },
      en: {
        nome: 'baninfo',
        categoria: '<:zu_certifiedmod:885193463111483412> » Moderation',
        desc: 'View a baninfo'
      },
      aliases: ['checkban', 'infoban', 'informação-ban', 'ban-info'],
      run: this.run
    }
  }

  async run (ctx) {
    const ReactionCollector = require('../../Helpers/ReactionCollector')

    let member
    if (!ctx.args[0]) return ctx.send(`:x: ${ctx.message.author.mention} **|** ${ctx.idioma.ban.noarg}`)

    if (!ctx.message.mentions[0]) {
      member = await global.zuly.getRESTUser(ctx.args[0]).then(info => info)
    } else {
      member = await ctx.message.mentions[0]
    }

    let banReason = ctx.args.splice(1).join(' ')
    if (!banReason) {
      banReason = `${ctx.idioma.ban.mot}`
    }
    const motivo = `${ctx.idioma.ban.mot2} ${ctx.message.author.username}#${ctx.message.author.discriminator} - ${ctx.idioma.ban.mot3} ${banReason}`

    const banInfo = await ctx.message.channel.guild.getBan(member.id)
    const embed = new global.zuly.manager.Ebl()
    embed.title(`<:zu_certifiedmod:885193463111483412> BanInfo • ${member.username}#${member.discriminator}`)
    embed.color('#ffcbdb')
    embed.field(`${ctx.idioma.baninfo.user}`, `\`\`\`${member.username}#${member.discriminator} (${member.id})\`\`\``)
    embed.field(`${ctx.idioma.baninfo.reason}`, `\`\`\`${banInfo.reason}\`\`\``)
    embed.footer(ctx.idioma.baninfo.desban)
    embed.thumbnail(member.avatarURL)
    ctx.message.channel.createMessage(embed.create).then(message => {
      message.addReaction('🐹')
      const collector = new ReactionCollector(message, {
        user: ctx.message.author,
        ignoreBot: true,
        emoji: '🐹',
        time: 60000,
        max: 1,
        acceptReactionRemove: false,
        stopOnCollect: true
      })
      collector.on('collect', async (msg) => {
        await ctx.message.channel.guild.unbanMember(member.id, motivo)
        ctx.send(`:white_check_mark: ${ctx.message.author.mention} **|** ${ctx.idioma.ban.the} **${member.username}** ${ctx.idioma.ban.foi}`)
      })
    })
  }
}

// ADG, Davi e LRD
