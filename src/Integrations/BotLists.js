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
			const ch = await global.zuly.channels.cache.get('890316877031698464');
			const user = global.zuly.users.cache.get(data.user) ? global.zuly.users.cache.get(data.user) : await global.zuly.users.fetch(data.user);
			const embed = new global.zuly.manager.Ebl();
			embed.setTitle(`<:zu_dbl2:908072247498010654> Top.gg | ${global.zuly.user.username}`);
			embed.setUrl('https://top.gg/bot/880173509077266483');
			embed.setColor('#ffcbdb');
			embed.setThumbnail(user.displayAvatarURL({ dynamic: true, format: 'png', size: 4096 }) || global.zuly.user.displayAvatarURL({ dynamic: true, format: 'png', size: 4096 }));
			embed.setDescription(`⬆️ \`${user.username}#${user.discriminator}\` votou em mim no **[top.gg](https://top.gg/bot/880173509077266483)** e recebeu **2400 ryos** vote você também!\n🔗 **Link:** https://top.gg/bot/880173509077266483`);
			ch.send({
				content: `<@${data.user}>`,
				embeds: [embed.get()]
			}).then(msg => {
				msg.react('⬆️');
			});
			const money = await global.zuly.db.get(`money-${user.id}`);
			await (money ? global.zuly.db.set(`money-${user.id}`, Number(money) + 2400) : global.zuly.db.set(`money-${user.id}`, 2400));
			const embed2 = new global.zuly.manager.Ebl();
			embed2.setTitle(`<:zu_dbl2:908072247498010654> Top.gg | ${global.zuly.user.username}`);
			embed2.setUrl('https://top.gg/bot/880173509077266483');
			embed2.setDescription(`**${user.username}** Obrigado pelo seu voto, como recompensa você recebeu **2400 ryos**, continue votando e sendo uma pessoa incrivel <:zu_yay:890317605318058035>`);
			embed2.setColor('#ffcbdb');
			embed2.setThumbnail(global.zuly.user.displayAvatarURL({ dynamic: true, format: 'png', size: 4096 }));
			const dm = await global.zuly.getDMChannel(user.id);
			dm.send({
				content: user,
				embeds: [embed2.get()]
			}).catch(() => {
				console.log('DM Fechada');
			});
			console.log(req.body);
		}
		catch (e) {
			res.sendStatus(403);
			console.log(e);
		}
	});
};
