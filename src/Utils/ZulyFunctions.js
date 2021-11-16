/* eslint-disable no-useless-concat */
const config = require('../Config/config');
const API = require('../API/keys');
const fetch = require('node-fetch');
const byteSize = require('byte-size');
const deepai = require('deepai');
deepai.setApiKey(API.deep);
async function getPremium (typename, user) {
	const tipo = typename.toLowerCase();
	if (tipo === 'doador') {
		const guild = await global.zuly.getRESTGuild('880174783294214184');
		const membro = await guild.getRESTMember(user);
		if (!membro) {
			return false;
		}
		else if (membro.roles.includes('903708588806119465') || membro.roles.includes('880399661184200725')) {
			return true;
		}
	}
	if (tipo === 'essencial') {
		const guild = await global.zuly.getRESTGuild('880174783294214184');
		const membro = await guild.getRESTMember(user);
		if (!membro) {
			return false;
		}
		else if (membro.roles.includes('903710903420223548')) {
			return true;
		}
	}
}
async function banner (id) {
	if (!id) new Error('Não foi fornecido o ID do usuário');
	const request = await fetch(`https://canary.discord.com/api/v9/users/${id}`, {
		headers: {
			Authorization: `Bot ${config.token}`
		}
	});
	const data = await request.json();
	let user = data.id;
	if (data.message === 'Unknown User') new Error('Usuário desconhecido.');
	if (!data.banner) return null;
	let banner = data.banner;
	let format = {};
	if (banner.startsWith('a_')) {
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
async function isNsfw (url) {
	const response = await deepai.callStandardApi('nsfw-detector', {
	  image: url,
	});
	console.log(response);
}
function bytes (size) {
	return byteSize(size);
}
function time2 (s) {
	function pad (n, z) {
		z = z || 2;
		return ('00' + n).slice(-z);
	}
	let ms = s % 1000;
	s = (s - ms) / 1000;
	let secs = s % 60;
	s = (s - secs) / 60;
	let mins = s % 60;
	let hrs = (s - mins) / 60;

	let days = parseInt(Math.floor(hrs / 24));
	hrs = parseInt(hrs % 24);

	let meses = parseInt(Math.floor(days / 30));
	days = parseInt(days % 30);

	return (meses > 0 ? `\`${pad(meses)}\`` + 'meses, ' : '') + (days > 0 ? `\`${pad(days)}\`` + 'dias, ' : '') + (hrs > 0 ? `\`${pad(hrs)}\`` + 'horas, ' : '') + (mins > 0 ? `\`${pad(mins)}\`` + 'minutos, ' : '') + (`\`${pad(secs)}\`` + 'segundos');
};
global.zuly.getPremium = getPremium;
global.zuly.time2 = time2;
global.zuly.bytes = bytes;
global.zuly.isNsfw = isNsfw;
global.zuly.deepai = deepai;
global.zuly.getBotUptime = uptime;
global.zuly.getRESTBanner = banner;