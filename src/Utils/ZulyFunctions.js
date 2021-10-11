const config = require('../Config/config');
const fetch = require('node-fetch');
async function banner (id) {
	if(!id) new Error('Não foi fornecido o ID do usuário');
	const request = await fetch(`https://canary.discord.com/api/v9/users/${id}`, {
		headers: {
			Authorization: `Bot ${config.token}`
		}
	});
	const data = await request.json();
	let user = data.id;
	if(data.message === 'Unknown User') new Error('Usuário desconhecido.');
	if(!data.banner) return null;
	let banner = data.banner;
	let format = {};
	if(banner.startsWith('a_')) {
		format = '.gif';
	}
	else {
		format = '.png';
	}
	let size = 512;
	let url = `https://cdn.discordapp.com/banners/${user}/${banner}${format}?size=${size}`;
	return url || 'https://i.imgur.com/2dwGomm.png';
}
function uptime (lang) {
	let uptimeSecs = global.zuly.uptime / 1000;
	let days = Math.floor(uptimeSecs / 86400);
	let hours = Math.floor(uptimeSecs / 3600);
	uptimeSecs %= 3600;
	let minutes = Math.floor(uptimeSecs / 60);
	let seconds = Math.floor(uptimeSecs % 60);
	let totalUptime;
	if (lang === 'pt') {
		totalUptime = `\`${days}\` dias, \`${hours}\` horas, \`${minutes}\` minutos e \`${seconds}\` segundos`;
	}
	else {
		totalUptime = `\`${days}\` days, \`${hours}\` hours, \`${minutes}\` minutes and \`${seconds}\` seconds`;
	}
	return totalUptime;
}

global.zuly.getBotUptime = uptime;
global.zuly.getRESTBanner = banner;