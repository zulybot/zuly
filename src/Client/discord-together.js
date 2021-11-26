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
	constructor (t, e = defaultApplications) {
		if (!t) throw new SyntaxError('Invalid Discord.Client !');
		this.client = t, this.applications = {
			...defaultApplications,
			...e
		};
	}

	async createTogetherCode (t, e) {
		const o = {
			code: 'none'
		};
		if (e && this.applications[e.toLowerCase()]) {
			const r = this.applications[e.toLowerCase()];
			try {
				await fetch(`https://discord.com/api/v8/channels/${t}/invites`, {
					method: 'POST',
					body: JSON.stringify({
						max_age: 86400,
						max_uses: 0,
						target_application_id: r,
						target_type: 2,
						temporary: !1,
						validate: null
					}),
					headers: {
						Authorization: `Bot ${token}`,
						'Content-Type': 'application/json'
					}
				}).then(t => t.json()).then(t => {
					if (t.error || !t.code) throw new Error('An error occured while retrieving data !');
					t.code !== 50013 && t.code !== '50013' || console.warn('Your bot lacks permissions to perform that action'), o.code = `https://discord.com/invite/${t.code}`;
				});
			}
			catch (t) {
				throw new Error('An error occured while starting Youtube together !');
			}
			return o;
		}
		throw new SyntaxError('Invalid option !');
	}
}
module.exports = DiscordTogether;
