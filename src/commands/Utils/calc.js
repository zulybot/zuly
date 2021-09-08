module.exports = class CalcCommand {
  constructor () {
    return {
      permissoes: {
        membro: [], // Permissoes que o usuario necessita
        bot: ['embedLinks'], // Permissoes que o bot necessita
        dono: false // Se apenas nos devs podem usar o comando
      },
      pt: {
        nome: 'calc',
        categoria: '🕰️ » Utilidades',
        desc: ' Calcula uma expressão aritmética'
      },
      en: {
        nome: 'calc',
        categoria: '🕰️ » Utility',
        desc: 'Calculates an arithmetic expression'
      },
      aliases: ['math', 'calcular', 'calculadora'],
      run: this.run
    }
  }

  async run (ctx) {
    if (!ctx.args[0]) return ctx.send(`:x: ${ctx.message.author.mention} **|** ${ctx.idioma.calc.ex.replace('%p', ctx.prefix)}`)
    const math = require('math-expression-evaluator')
    let val
    try {
      val = math.eval(ctx.args.join(' '))
    } catch (err) {
      return ctx.send(`:x: ${ctx.message.author.mention} **|** ${ctx.idioma.calc.inv}`)
    }
    ctx.send(`<:zu_calc:880851703442833408> ${ctx.message.author.mention} **|** ${ctx.idioma.calc.res}: \`${val}\``)
  }
}
