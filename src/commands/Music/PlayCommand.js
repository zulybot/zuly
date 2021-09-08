module.exports = class PlayCommand {
  constructor () {
    return {
      permissoes: {
        membro: [],
        bot: ['embedLinks'],
        dono: false
      },
      pt: {
        nome: 'play',
        categoria: '🎵 » Música',
        desc: 'Ouça músicas, yay'
      },
      en: {
        nome: 'play',
        categoria: '🎵 » Music',
        desc: 'Listen musics, yay'
      },
      aliases: ['p', 'tocar', 'som', 'somzao', 'somzão', 'dj'],
      run: this.run
    }
  }

  async run (ctx) {
    if (!ctx.args[0]) return ctx.send(`:x: ${ctx.message.author.mention} **|** ${ctx.idioma.play.nada.replace('%p', ctx.prefix)}`)
    if (!ctx.message.member.voiceState.channelID) return ctx.send(`:x: ${ctx.message.author.mention} **|** ${ctx.idioma.play.can}`)

    const res = await global.zuly.music.search(ctx.args.join(' '), ctx.message.author)
    const play = global.zuly.music.players.get(ctx.message.channel.guild.id)

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
    player.queue.add(res.tracks[0])
    const track = res.tracks[0]

    if (!player.playing && !player.paused && !player.queue.size) {
      player.play()
    }
    if (!player.playing && !player.paused && player.queue.totalSize === res.tracks.length) {
      player.play()
    }
    const embed = new global.zuly.manager.Ebl()
    embed.description(`<:zu_mp3:882310253226635284> **|** ${ctx.idioma.play.add} **${track.title}**`)
    embed.color('#ffcbdb')
    ctx.send(embed.create)
  }
}

// ADG
