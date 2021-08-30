require('colors')
const {
  Client,
  Collection
} = require('eris')

const config = require('./config')
const client = new Client(`Bot ${config.token}`, {
  autoreconnect: true,
  restMode: true,
  defaultImageSize: 2048,
  defaultImageFormat: 'png',
  maxShards: 'auto',
  messageLimit: 100,
  rest: {
    baseURL: '/api/v9',
    domain: 'canary.discord.com'
  },
  intents: [
    'guilds',
    'guildMessages',
    'guildMessageReactions',
    'guildMembers'
  ]
})

setInterval(() => console.log(`[RAM] ${process.memoryUsage().rss / 1024 / 1024}mb`.green), 5000)

client.commands = new Collection()
client.aliases = new Collection()
client.events = new Collection()

const Zuly = require('./client/zulybot.js')
const ZulyBot = new Zuly(client)

ZulyBot.iniciar().then((star) => {
  console.log(`[CLIENT] ${star}, Tudo Carregado!`.dim.brightMagenta)
})

global.zuly = client
global.zuly.manager = ZulyBot

require('./client/handler/eventos')
require('./client/handler/comandos')
require('./mongo/mongo')
// require('./giveaways')

client.connect()
