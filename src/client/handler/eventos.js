const fs = require('fs')

global.zuly.events.clear()

fs.readdir('./src/events/', (erro, eventos) => {
  eventos.forEach(async evento => {
    delete require.cache[evento]

    const ArquivoEvento = require(`../../events/${evento}`)
    const Evento = evento.replace('.js', '')
    const event = new ArquivoEvento(global.zuly, ArquivoEvento.nome)
    await global.zuly.events.set(event.nome, event)
    global.zuly[event.type || 'on'](event.nome, async (...args) => event.run(...args))
    console.log(`[EVENTOS] Evento ${Evento} carregado usando os argumentos (${event.nome}).`.brightBlue)
  })
})