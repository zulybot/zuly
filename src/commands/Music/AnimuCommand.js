module.exports = class AnimuCommand {
  constructor () {
    return {
      permissoes: {
        membro: [],
        bot: [],
        dono: false
      },
      pt: {
        nome: 'animu',
        categoria: '🎵 » Música',
        desc: 'Toca a radio de anime, Animu'
      },
      en: {
        nome: 'animu',
        categoria: '🎵 » Music',
        desc: 'Play anime radio, Animu'
      },
      aliases: ['radio'],
      run: this.run
    }
  }

  async run (ctx) {
    const play = global.zuly.music.players.get(ctx.message.channel.guild.id)
    if (!ctx.message.member.voiceState.channelID) return ctx.send(`:x: ${ctx.message.author.mention} **|** ${ctx.idioma.play.can}`)

    if (!play) {
      const player = global.zuly.music.create({
        guild: ctx.message.channel.guild.id,
        voiceChannel: ctx.message.member.voiceState.channelID,
        textChannel: ctx.message.channel.id,
        selfDeafen: true
      })
      await player.connect()
    }

    const player = global.zuly.music.players.get(ctx.message.channel.guild.id)
    const res = await player.search('https://cast.animu.com.br:9006/stream', ctx.message.author)
    if (res.loadType === 'LOAD_FAILED') {
      if (!player.queue.current) player.destroy()
      throw new Error(res.exception.message)
    }

    player.set('interaction', undefined)
    player.queue.add(res.tracks[0])
    if (!player.playing && !player.paused && !player.queue.size) player.play()
    if (player.queue.size >= 1) {
      const embed = new global.zuly.manager.Ebl()
      embed.description(`<:zu_animu:882344230515802152> **|** ${ctx.idioma.play.add} **Animu**`)
      embed.thumbnail(global.zuly.user.avatarURL)
      embed.color('#ffcbdb')
      await ctx.send(embed.create) // ctx.send
    }
  }
}
