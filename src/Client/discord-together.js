const fetch = require('node-fetch');
const {
	token
} = require('../Config/config');
const defaultApplications = {
	youtube: '755600276941176913',
	poker: '755827207812677713',
	betrayal: '773336526917861400',
	fishing: '814288819477020702',
	chessdev: '832012586023256104',
	chess: '832012774040141894'
};
class DiscordTogether {
	constructor (client, applications = defaultApplications) {
		if (!client) throw new SyntaxError('Invalid Discord.Client !');
		this.client = client;
		this.applications = {
			...defaultApplications,
			...applications
		};
	};
	async createTogetherCode (voiceChannelId, option) {
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
						temporary: !1,
						validate: null
					}),
					headers: {
						Authorization: `Bot ${token}`,
						'Content-Type': 'application/json'
					}
				}).then(res => res.json()).then(invite => {
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
	}
};
module.exports = DiscordTogether;