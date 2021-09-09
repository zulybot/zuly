module.exports = class LangCommand {
  constructor () {
    return {
      permissoes: {
        membro: ['manageGuild'],
        bot: []
      },
      pt: {
        nome: 'lang',
        categoria: '⚙️ » Configuração',
        desc: 'Altera o idioma do bot.'
      },
      en: {
        nome: 'lang',
        categoria: '⚙️ » Configuration',
        desc: 'Changes the bot language.'
      },
      aliases: ['idoma', 'setlang', 'guildlang', 'idioma'],
      run: this.run
    }
  }

  async run (ctx) {
    const langs = ['pt-br', 'en-us']

    if (!ctx.args[0]) {
      return ctx.send(`:x: ${ctx.message.author.mention} **|** ${ctx.idioma.multiLang.insertLang}`.replace('%p', ctx.prefix).replace('%langs', langs.join(', ')))
    }

    let langSelecionada = null
    langs.forEach(lang => {
      if (ctx.args[0] === lang) {
        langSelecionada = lang
      }
    })

    if (langSelecionada == null) {
      return ctx.send(`:x: ${ctx.message.author.mention} **|** ${ctx.idioma.multiLang.unknownLanguage}`.replace('%langs', '`' + langs.join(', ') + '`'))
    } else {
      switch (langSelecionada) {
        case langs[0]:
          await global.db.set(`idioma-${ctx.message.guildID}`, langs[0])
          return ctx.send(':white_check_mark: **|** Agora irei falar `português-brasileiro` neste servidor!')
        case langs[1]:
          await global.db.set(`idioma-${ctx.message.guildID}`, langs[1])
          return ctx.send(':white_check_mark: **|** Now I will speak `english-us` on this guild!')
      }
    }
  }
}
