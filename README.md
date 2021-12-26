# Hey there! Welcome to my official GitHub repository!

<p align="center">
<h3>I'm zuly, just a simple bot to discord!</h3>
<h3>Hi! I'm zuly, a 100% Brazilian bot focused on anime for otakus!</h3>

  <a href="https://jetbrains.com/?from=ZulyBot">
    <img src="https://img.shields.io/badge/Powered_by_WebStorm-gray.svg?logo=webstorm&style=for-the-badge" />
  </a>
  <a href="https://crowdin.com/project/zuly">
    <img src="https://img.shields.io/badge/Powered_by_Crowdin-gray.svg?logo=crowdin&style=for-the-badge" />
    <img src="https://badges.crowdin.net/zuly/localized.svg">
  </a>
</p>

### 💻 Self-Hosting

- Install nodejs 14 or higher. You can download and install here: https://nodejs.org
- Rename **all** .example files to name.js
  > ⚙️ config.js

```js
// config.js
module.exports = {
  token: "you discord bot token",
  client: {
    id: "you discord bot id",
    secret: "you discord bot secret",
  },
  deployslash: true, // set this to true if you want to create slash-commands and false if you just want to update.
  deploy: "yes", // if this is how it is, it won't do any updates to slash-commands
  mongodb: "you mongodb url https://mongodb.com/",
  prefix: ["bot-prefixes", "bot-prefixes"],
};
```

> 🎵 nodes.json

```js
// nodes.js
module.exports = [
  {
    name: "node-name", // can be anyone
    host: "localhost", // your lavalink ip, or if it is with your bot, localhost
    port: 2333, // your lavalink password, by default 2333
    password: "youshallnotpass", // lavalink password, by default youshallnotpass
  },
];
```

### ⬆️ Starting:

- Install the packages:

```bash
yarn
```

- Start the bot:

```
yarn start
```

> And done, your own version of zuly online!

### 🥳 Contributing:

Ah! So you would like to contribute to my repository, right? Great! We love new contributors who help us!

- Fork this repository and make your desired changes
- Once they're done, make a pull request to the master branch if you are contributing to the new version or the master branch if you are contributing to the stable and running version

### 🌎 Translating:

Of course we do not support only English. We're looking to expand to a variety of new languages and for such thing we need your help! We are now working with Crowdin. Please check out our [Crowdin](https://crowdin.com/project/zuly) repo!

### ⛔ Issues:

If you have any problems, pleas open a [Issue](https://github.com/zulybot/zuly/issues) or [contact us](https://zulybot.xyz/discord)

### 👋 Thanks for using my functions!

![ZulyBot](/assets/readme/banner.jpeg)

### 🤝 Partners:

- Thanks [www.openode.io](https://www.openode.io) for the hosting!

### 🔗 Links:

> Official Website:

- [Zulybot.xyz](https://zulybot.xyz/)
  > Botlists:
- [Discord.Bots](https://discord.bots.gg/bots/880173509077266483)
- [Top.gg](https://top.gg/bot/880173509077266483)
- [Bestlist.Online](https://bestlist.online/bots/880173509077266483)
- [Bluephoenixlist.xyz](https://bluephoenixlist.xyz/bot/880173509077266483)

### 🐦 Github Status:

<p align="center">
<a href="https://nodejs.org/en/download/"><img src="https://img.shields.io/badge/Node.JS-43853D.svg?style=for-the-badge&amp;logo=node.js&amp;logoColor=white" alt="Node Version"></a> <a href="https://github.com/zulybot/zuly/issues"><img src="https://img.shields.io/github/issues/zulybot/zuly?style=for-the-badge&amp;color=green" alt="Issues"></a> <a href="https://github.com/zulybot/zuly/pulls"><img src="https://img.shields.io/github/issues-pr/zulybot/zuly?style=for-the-badge&amp;color=green" alt=""></a>
<h2 id="-stargazers-">✨ Stargazers:</h2>
<p><a href="https://github.com/zulybot/zuly/stargazers"><img src="https://reporoster.com/stars/zulybot/zuly" alt="Stargazers"></a></p>
<h2 id="-forkers-">✨ Forkers:</h2>
<p><a href="https://github.com/zulybot/zuly/network/members"><img src="https://reporoster.com/forks/zulybot/zuly" alt="Forkers"></a></p>
</p>
