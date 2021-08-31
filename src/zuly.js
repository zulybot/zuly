require('colors')
const {
  Client,
  Collection
} = require('eris')

const {
  token
} = require('./config')

const client = new Client(token, {
  allowedMentions: {
    everyone: false,
    roles: false
  },
  autoreconnect: true,
  defaultImageFormat: 'png',
  defaultImageSize: 4096,
  // disableEvents: []
  // firstShardID: 0
  getAllUsers: false,
  // guildCreateTimeout: 2000
  // guildSubscriptions: true
  intents: [
    'guilds',
    'guildMessages',
    'guildMessageReactions',
    'guildMembers'
  ],
  largeThreshold: 200,
  // lastShardID
  // latencyThreshold
  // maxReconnectAttempts: Infinity
  maxResumeAttempts: 20,
  maxShards: 'auto',
  messageLimit: 100,
  opusOnly: false,
  // ratelimiterOffset
  // reconnectDelay
  // requestTimeout: 15000
  rest: {
    // agent
    baseURL: '/api/v9',
    // decodeReasons
    // disableLatencyCompensation
    domain: 'canary.discord.com',
    latencyThreshold: 40000
    // ratelimiterOffset
    // requestTimeout
  },
  restMode: true
  // seedVoiceConnections
  // ws
})

client.commands = new Collection()
client.aliases = new Collection()
// client.events = new Collection()

const Zuly = require('./client/zulybot.js')
const ZulyBot = new Zuly(client)

ZulyBot.iniciar().then((zuly) => {
  console.log(`[CLIENT] ${zuly}, Tudo Carregado!`.dim.brightMagenta)
})

global.zuly = client
global.zuly.manager = ZulyBot

require('./client/handler/eventos')
require('./client/handler/comandos')
require('./mongo/mongo')
