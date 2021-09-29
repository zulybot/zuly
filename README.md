# Hey there! Welcome to my official GitHub repository!

<p align="center">
Howdy, I'm zuly, just a simple bot to discord!
Well... As you can see, I'm a bot with many features like fun, moderation and utility.
</p>

## 💻 Self-Hosting
- Install nodejs 14 or higher. You can download and install here: https://nodejs.org
- Rename **all** .example files to name.js
> ⚙️ config.js
```js
// config.js
module.exports = {
	token: 'you discord bot token',
	client: {
		id: 'you discord bot id',
		secret: 'you discord bot secret'
	},
    deployslash: true, // set this to true if you want to create slash-commands and false if you just want to update.
	deploy: 'yes', // if this is how it is, it won't do any updates to slash-commands
	mongodb: 'you mongodb url https://mongodb.com/',
	prefix: ['bot-prefixes', 'bot-prefixes']
};
```
> 🎵 nodes.json
```js
// nodes.js
module.exports = [{
	name: 'node-name', // can be anyone
	host: 'localhost', // your lavalink ip, or if it is with your bot, localhost
	port: 2333, // your lavalink password, by default 2333
	password: 'youshallnotpass' // lavalink password, by default youshallnotpass
}]
```
## ⬆️ Starting:
- Install the packages:
```bash
yarn
```
- Start the bot:
```
yarn start
```
> And done, your own version of zuly online!
## 🤝 Partners:
- Thanks [www.openode.io](https://www.openode.io) for the hosting!
## 🔗 Links:
> Official Website:
- [Zulybot.xyz](https://zulybot.xyz/)
> Botlists:
- [Discord.Bots](https://discord.bots.gg/bots/880173509077266483)
- [Top.gg](https://top.gg/bot/880173509077266483)
- [Bestlist.Online](https://bestlist.online/bots/880173509077266483)
- [Bluephoenixlist.xyz](https://bluephoenixlist.xyz/bot/880173509077266483)
## 🐦 Github Status:
<p align="center">
[![Node Version](https://img.shields.io/badge/Node.JS-43853D.svg?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/en/download/) [![Issues](https://img.shields.io/github/issues/zulybot/zuly?style=for-the-badge&color=green)](https://github.com/zulybot/zuly/issues) [![](https://img.shields.io/github/issues-pr/zulybot/zuly?style=for-the-badge&color=green)](https://github.com/zulybot/zuly/pulls)
</p>
## ✨ Stargazers:
[![Stargazers](https://reporoster.com/stars/zulybot/zuly)](https://github.com/zulybot/zuly/stargazers)
## ✨ Forkers:
[![Forkers](https://reporoster.com/forks/zulybot/zuly)](https://github.com/zulybot/zuly/network/members)