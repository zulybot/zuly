const config = require('./Config/config');
const { Client } = require('discord.js');
const client = new Client({
	intents: [
		'GUILDS',
		'GUILD_BANS',
		'GUILD_MEMBERS',
		'GUILD_MESSAGES',
		'DIRECT_MESSAGES',
		'GUILD_VOICE_STATES',
		'GUILD_MESSAGE_REACTIONS',
		'GUILD_EMOJIS_AND_STICKERS'
	]
});
global.premium = client;

client.on('guildCreate', async (guild) => {
	const auditLog = await guild.getAuditLog({
		actionType: 28,
		limit: 1
	});
	console.log(auditLog);
	const userPremium = await global.zuly.getPremium('doador', auditLog.users[0].id);
	if (userPremium === true) {
		const dm = await global.zuly.getDMChannel(auditLog.users[0].id);
		const embed = new global.zuly.manager.Ebl();
		embed.setTitle(`💸 Premium | ${global.zuly.user.username}`);
		embed.setDescription(`Olá, aparentemente você adicionou minha versão premium em seu servidor **${guild.name}**, muito obrigado por seu apoio! Com sua ajuda podemos investir cada vez mais em nossos projetos!`);
		embed.setColor('#ffcbdb');
		embed.setImage('https://tenor.com/bqUXw.gif');
		embed.setThumbnail(global.zuly.user.displayAvatarURL({ dynamic: true, format: 'png', size: 4096 }));
		dm.send({
			embeds: [embed.get()]
		});
	}
	else {
		const dm = await global.premium.getDMChannel(auditLog.users[0].id);
		const embed = new global.zuly.manager.Ebl();
		embed.setTitle(`💸 Premium | ${global.zuly.user.username}`);
		embed.setDescription('Olá, aparentemente você adicionou minha versão premium, porém aparentemente você não é um usuário premium, infelizmente tive que sair de seu servidor! <:zu_lori_sob:909096109618647040>');
		embed.setColor('#ffcbdb');
		embed.setImage('https://tenor.com/bqUXw.gif');
		embed.setThumbnail(global.zuly.user.displayAvatarURL({ dynamic: true, format: 'png', size: 4096 }));
		dm.send({
			embeds: [embed.get()]
		}).then(() => {
			guild.leave();
		});
	}
});

client.on('ready', async () => {
	const {
		version
	} = require('../../../package.json');
	console.log('[PREMIUM] Estou Pronto!'.green);
	await global.premium.user.setActivity(`zulybot.xyz | ${global.premium.user.username} [v${version}]`, {
		game: global.zuly.user.username,
		type: 5
	});
});

client.login(config.token);
