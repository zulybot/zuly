const config = require('../Config/config');
const f = require('node-fetch');
async function banner (id) {
	if(!id) new Error('Não foi fornecido o ID do usuário');
	const request = await f(`https://canary.discord.com/api/v9/users/${id}`, {
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
};

global.zuly.getRESTBanner = banner;