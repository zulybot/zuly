module.exports = (app) => {
	const config = require('../Config/config');
	app.get('/api/dbl', (req, res) => {
		res.sendStatus(200);
	});
	app.post('/api/dbl', async (req, res) => {
		try {
			if (req.headers.authorization !== config.secrets.topgg) return;
			res.sendStatus(200);
			const data = req.body;
			const ch = await global.zuly.getRESTChannel('890316877031698464');
			const user = await global.zuly.getRESTUser(data.user);
			const embed = new global.zuly.manager.Ebl();
			embed.setTitle(`<:zu_dbl:894926317819138049> Top.gg | ${global.zuly.user.username}`);
			embed.setUrl('https://top.gg/bot/880173509077266483');
			embed.setColor('#ffcbdb');
			embed.setThumbnail(user.avatarURL || global.zuly.user.avatarURL);
			embed.setDescription(`⬆️ \`${user.username}#${user.discriminator}\` votou em mim no **[top.gg](https://top.gg/bot/880173509077266483)** e recebeu **2400 ryos** vote você também!\n🔗 **Link:** https://top.gg/bot/880173509077266483`);
			ch.createMessage({
				content: `<@${data.user}>`,
				embed: embed.get()
			}).then(msg => {
				msg.addReaction('⬆️');
			});
			console.log(req.body);
		}
		catch (e) {
			res.sendStatus(403);
			console.log(e);
		}
	});
};