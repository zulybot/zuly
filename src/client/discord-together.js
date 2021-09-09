const fetch = require('node-fetch');
const { token } = require('../config');
const defaultApplications = {
	youtube: '755600276941176913',
	poker: '755827207812677713',
	betrayal: '773336526917861400',
	fishing: '814288819477020702',
	chessdev: '832012586023256104',
	chess: '832012774040141894'
	// 'zombsroyale': '519338998791929866'  // Note : First package to offer ZombsRoyake.Io, any other package offering it will be clearly inspired by it, thanks to https://github.com/LilDerp-IsBetter thanks to whom i got the ZombsRoyale.io ID
};

/**
 * Class symbolizing a YoutubeTogether
 * @template {Object.<string, string>} T
 */
class DiscordTogether {
	/**
     * Create a new YoutubeTogether
     * @param {Client} client Discord.Client
     * @param {T} applications
     * @example
     * const { Client } = require('eris');
     * const client = new Client('token');
     * const { DiscordTogether } = require('./discord-together');
     *
     * client.discordTogether = new DiscordTogether(client);
     *
     * client.on('messageCreate', async message => {
     *      if (message.content === 'start') {
     *          client.discordTogether.createTogetherCode(message.member.voiceState.channelID.channelID, 'youtube').then(async invite => {
     *              return message.channel.createMessage(`${invite.code}`);
     *           });
     *      };
     * });
     *
     * client.connect();
     */
	constructor (client, applications = defaultApplications) {
		if (!client) throw new SyntaxError('Invalid Discord.Client !');

		/**
         * Discord.Client
         */
		this.client = client;
		this.applications = { ...defaultApplications, ...applications };
	};

	/**
     * Create a Youtube Together invite code (note: send the invite using markdown link)
     * @param {string} voiceChannelId
     * @param {keyof (defaultApplications & T)} option
     * @example
     * client.on('message', async message => {
     *      if (message.content === 'start') {
     *          client.discordTogether.createTogetherCode(message.member.voice.channelID, 'youtube').then(async invite => {
     *              return message.channel.send(`${invite.code}`); // Click the blue link
     *           });
     *      };
     * });
     */
	async createTogetherCode (voiceChannelId, option) {
		/**
         * @param {string} code The invite link (only use the blue link)
         */
		const returnData = {
			code: 'none'
		};
		if (option && this.applications[option.toLowerCase()]) {
			const applicationID = this.applications[option.toLowerCase()];
			try {
				await fetch(`https://discord.com/api/v8/channels/${voiceChannelId}/invites`, {
					method: 'POST',
					body: JSON.stringify({
						max_age: 86400,
						max_uses: 0,
						target_application_id: applicationID,
						target_type: 2,
						temporary: false,
						validate: null
					}),
					headers: {
						Authorization: `Bot ${token}`,
						'Content-Type': 'application/json'
					}
				}).then(res => res.json())
					.then(invite => {
						if (invite.error || !invite.code) throw new Error('An error occured while retrieving data !');
						if (invite.code === 50013 || invite.code === '50013') console.warn('Your bot lacks permissions to perform that action');
						returnData.code = `https://discord.com/invite/${invite.code}`;
					});
			}
			catch (err) {
				throw new Error('An error occured while starting Youtube together !');
			}
			return returnData;
		}
		else {
			throw new SyntaxError('Invalid option !');
		}
	};
};

module.exports = DiscordTogether;
