'use strict'
module.exports = class MessageEventCommand {
  constructor () {
    return {
      nome: 'messageUpdate',
      run: this.run
    }
  }

  async run (message, oldMessage) {
    const config = require('../config.js')
    const system = require('../system')

    global.zuly.users.map(g => global.zuly.users.delete(g.id))
    if (message.channel.type === 1) return
    if (message.content === oldMessage.content) return
    let idioma = require('../config/idiomas')
    let lang = (await global.db.get(`idioma-${message.guildID}`)) || 'pt_br'
    lang = lang.replace(/-/g, '_')
    idioma = idioma[lang]
    // ata, criei
    if (message.author.bot) return

    // Verificando se a mensagem começa com um dos prefixos
    const regexPrefix = new RegExp(`^(${config.prefix.map(prefix => prefix.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&')).join('|')}|<@!?${global.zuly.user.id}>)( )*`, 'gi')
    // q poha é essa?
    // regex para os prefix
    if (!message.content.match(regexPrefix)) return
    // adg ajuda poha, bota o ngc q vc mostrou la, aquele code ta grande to com preguiça
    const args = message.content.replace(regexPrefix, '').trim().split(/ +/g) // peguei do meu git vsfd, só mudar ai
    const commandName = args.shift().toLowerCase()
    const commandFile = global.zuly.commands.get(commandName) || global.zuly.aliases.get(commandName)

    if (!commandFile) return // se n tiver o cmd ele retorna nada

    const command = commandFile

    if (!message.channel.guild.members.get(global.zuly.user.id).permissions.has('readMessageHistory')) {
      return message.channel.createMessage(`:x: ${idioma.message.view}`)
    }

    if (!command) {
      if (await global.db.get(`mensagem-comando-${message.guildID}`)) {
        message.channel.createMessage(`:x: ${message.author} **|** ${idioma.message.the} \`${commandName.replace(/@/g, '').replace(/#/g, '').replace(/`/g, '')}\` ${idioma.message.unk}`)
      } else {
        return
      }
    }

    if (command.permissoes) {
      if (command.permissoes.membro.length) {
        if (!command.permissoes.membro.every(p => message.channel.guild.members.get(message.author.id).permissions.has(p))) {
          return message.channel.createMessage(`:x: ${message.author.mention} **|** ${idioma.message.user} \`${command.permissoes.membro}\`.`)
        }
      }
      if (command.permissoes.bot.length) {
        if (!command.permissoes.bot.every(p => message.channel.guild.members.get(global.zuly.user.id).permissions.has(p))) {
          return message.channel.createMessage(`:x: ${message.author.mention} **|** ${idioma.message.bot} \`${command.permissoes.bot}\`.`)
        }
      }
      if (command.permissoes.nsfw) {
        if (!message.channel.nsfw) return message.channel.createMessage(`:x: ${message.author.mention} **|** ${idioma.message.nsfw}`)
      }
      if (command.permissoes.dono) {
        // Verificar se o autor da mensagem é um desenvolvedor.
        const developers = await global.db.get('devs')

        if (!developers) {
          await global.db.set('devs', ['726449359167684734', '392087996821667841', '699416429338034268'])
        }

        if (!developers.includes(message.member.id)) {
          return message.channel.createMessage(`:x: ${message.author.mention} **|** ${idioma.message.dev}`)
        }
      }
    }

    try {
      this.ctx = {
        id: message.id,
        user: message.author,
        userTag: message.author.tag,
        userId: message.author.id,
        member: message.member,
        memberTag: message.member.tag,
        memberId: message.member.id,
        idioma: idioma,
        prefix: message.content.replace(message.content.replace(regexPrefix, ''), ''),
        args: args,
        message: message,
        embed: require('../client/lyaEmbedBuilder'),
        // Functions
        send: function (texto) {
          message.channel.createMessage(texto)
        },
        reply: function (texto, mencionar) {
          message.channel.createMessage(texto, mencionar)
        },
        addReaction: function (emoji) {
          message.addReaction(emoji)
        },
        fetch: async function (url) {
          await global.zuly.manager.fetch(url)
        }
      }
      await commandFile.run(this.ctx)

      const owner = await global.zuly.getRESTUser(message.channel.guild.ownerID)
      const moment = require('moment')

      global.zuly.executeWebhook(system.command.id, system.command.token, {
        avatarURL: global.zuly.user.avatarURL,
        username: global.zuly.user.username,
        embeds: [{
          title: '🌎 Log de Comandos',
          color: 14498544,
          fields: [{
            name: '🔍 Usuário:',
            value: `\`\`\`${message.author.username}#${message.author.discriminator} (${message.author.id})\`\`\``
          },
          {
            name: '<:zu_info:880812942713573396> Comando:',
            value: `\`\`\`${message.content.slice(0, 1010)}\`\`\``
          },
          {
            name: '🔗 Link da mensagem:',
            value: `\`\`\`${message.jumpLink}\`\`\``
          },
          {
            name: '👍 GuildInfo:',
            value: `\`\`\`📋 Nome: ${message.channel.guild.name}\n🧭 ID: ${message.channel.guild.id} [${message.channel.guild.shard.id}]\n👑 ${owner.username}#${owner.discriminator}\n🧑 Membros: ${message.channel.guild.memberCount}\n📅 Criado há dias/horas: ${moment(message.channel.guild.createdAt).format('📆 DD/MM/YY')}\n${moment(message.channel.guild.createdAt).format('⏰ HH:mm:ss')}\n🗺️ Região: ${message.channel.guild.region}\`\`\``
          }
          ]
        }]
      })
    } catch (e) {
      console.log(e)
      message.channel.createMessage(`:x: ${message.author.mention} **|** \`${`${e}`.replace(/`/g, '')}\``)
    }
  }
}
