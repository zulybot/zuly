const config = require('./Config/config');
const { Client } = require('eris');
const client = new Client(config.token, {
	restMode: true,
	intents: ['guilds', 'guildMembers', 'guildMessages', 'guildVoiceStates', 'guildMessageReactions', 'directMessages']
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
		embed.setThumbnail(global.zuly.user.avatarURL);
		dm.createMessage({
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
		embed.setThumbnail(global.zuly.user.avatarURL);
		dm.createMessage({
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
	await global.premium.editStatus('dnd', {
		game: global.premium.user.username,
		name: `zulybot.xyz | ${global.premium.user.username} [v${version}]`,
		type: 5
	});
});

client.connect();
