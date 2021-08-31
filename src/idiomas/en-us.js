module.exports = {
  message: {
    P: 'Hello, human!',
    view: 'I don\'t have permission to read the message history!',
    the: 'The Command',
    unk: 'does not exist or cannot be run at the moment!',
    user: 'You don \'t have all the necessary permissions to use this command!\nNeeded permissions:',
    bot: 'I don\'t have all the necessary permissions to run this command!\nNeeded permissions:',
    dev: 'Only my developers can use this command!',
    c: 'Wait %t seconds to use another command.',
    e: 'Oops, an error happened!',
    e2: 'Report this error!',
    e3: 'My team probably already knows about this error, but how about you help? You can open an [issue](https://github.com/stardiscordbot/starbot/issues) in [github](https://github.com/stardiscordbot/starbot) or report it to my [support server](https://discord.gg/2pFH6Yy), let\'s make the discord a better place, together 🤝',
    nsfw: 'This command can only be used on nsfw channels'
  },
  host: {
    db: 'Eu utilizo [MongoDB](https://mongodb.com) para meu banco de dados, hospedados em maquinas da <:zu_azure:880536844473880617> [Azure](https://azure.microsoft.com).',
    vps: 'Eu sou hospedada na VPS, utilizando maquinas da [OVH](https://ovh.com), com sistema operacional <:zu_ubuntu:880496793740255253> Ubuntu.'
  },
  giveaway: {
    sec: 'seconds',
    min: 'minutes',
    hrs: 'hours',
    day: 'days',
    term: 'Ended at',
    host: 'Hosted by: {user}',
    win: 'winner(s)',
    wins: 'Congratulations, {winners}! You won **{prize}**!\n{messageURL}',
    addReaction: 'addReaction with 🎁 to participate!',
    restante: 'Time remaining:',
    no: 'Giveaway cancelled, no valid participations',
    give: 'GIVEAWAY',
    giveend: 'GIVEAWAY ENDED',
    start: 'You did not use the command correctly, use: `%pgiveaway [time (10s, 10m)] [winners (1, 1w)] [prize (photos of kittens)]`, do not include **[]** or **()**.',
    end: 'You didn\'t use the command correctly, use: `%pgiveaway-end [message id]`',
    reroll: 'You didn\'t use the command correctly, use: `%pgiveaway-reroll [message id]`',
    novo: 'New winner(s): {winners}! Congratulations, you won **{prize}**\n{messageURL}',
    err: 'No valid participations, no new winner(s) can be chosen!'
  },
  help: {
    title: 'Command List • ',
    creators: 'I was developed by ',
    description: '> My current prefix is: `%p`\n> If you have any questions, please enter my support server: [Click here](https://discord.gg/pyyyJpw5QW)\n> Add me by clicking [here](https://discord.com/oauth2/authorize?client_id=880173509077266483&scope=bot&permissions=805432446)',
    nsfw: 'You need to be on an NSFW channel to see nsfw commands. '
  },
  calc: {
    ex: 'Ams missing, use, `%pcalc <expression>`',
    inv: 'Invalid expression.',
    res: 'Result'
  },
  botinfo: {
    texto: 'Hi, I\'m %bot, a bot with unique features that every server needs! I currently know **%u different people** who use my features and I\'m on **%g different servers**.\n\nI am a project by [And.](https://github.com/andrelucas) developed in [Eris](https://abal.moe/Eris/) using [Javascript](https://developer.mozilla.org/en-US/docs/Web/JavaScript) & [NodeJS](https://nodejs.org/en/)'
  },
  messages: {
    tem: 'has',
    msg: 'messages',
    title: 'Messages'
  },
  print: {
    web: 'Missing the website'
  },
  mention: {
    response: 'Hello **%u**! See my commands by using `star help` or `s!help`'
  },
  together: {
    channel: 'You must be on a voice channel to execute this command.',
    done: 'Just click on the link and you will be redirected to the activity:',
    done2: '**(only works on computer)**'
  }
}
