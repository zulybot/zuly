module.exports = class DailyCommand {
  constructor () {
    return {
      permissoes: {
        membro: [], // Permissoes que o usuario necessita
        bot: ['attachFiles'], // Permissoes que o bot necessita
        dono: false // Se apenas nos devs podem usar o comando
      },
      pt: {
        nome: 'ship',
        categoria: '💰 • Economia',
        desc: 'Pegue seu dinheiro diário.'
      },
      en: {
        nome: 'ship',
        categoria: '💰 • Economy',
        desc: 'Take your daily money.'
      },
      aliases: ['diario'],
      run: this.run
    }
  }

  async run (ctx) {
    let porcentagem
    const user1 = ctx.message.author
    const user2 = ctx.message.mentions[0] || await global.star.getRESTUser(ctx.args[0])

    if (!user2) return

    const ship1 = await global.zuly.db.get(`ship-${user1.id}-${user2.id}`)
    const ship2 = await global.zuly.db.get(`ship-${user1.id}-${user2.id}`)

    const nome = user1.username.slice(0, 4) + user2.username.slice(0, 4)

    if (!ship1 && !ship2) {
      porcentagem = Math.floor(Math.random() * 101)
    } else {
      porcentagem = ship1
    }

    if (user1.id === user2.id) {
      porcentagem = 50
    }

    const { createCanvas, loadImage } = require('canvas')

    const base = await loadImage('./assets/ship.png')

    const edit = createCanvas(base.width, base.height)
    const foto = edit.getContext('2d')

    const avatar1 = user1.avatarURL
    const avatar2 = user2.avatarURL

    const img1 = await loadImage(avatar1)
    const img2 = await loadImage(avatar2)

    foto.drawImage(base, 0, 0)
    foto.drawImage(img1, 225, 125, 1024, 1080)
    foto.drawImage(img2, 2080, 480, 1024, 1100)
    foto.drawImage(base, 0, 0)

    ctx.message.channel.createMessage(`💖 ${ctx.message.author.mention} 💖`, {
      file: edit.toBuffer(),
      name: 'ship.png'
    }).then(async msg => {
      if (!ship1 && !ship2) {
        await global.zuly.db.set(`ship-${user1.id}-${user2.id}`, porcentagem)
        await global.zuly.db.set(`ship-${user2.id}-${user1.id}`, porcentagem)
      }
    })
  }
}
