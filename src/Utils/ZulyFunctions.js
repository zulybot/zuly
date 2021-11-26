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
async function getBugHunter (user) {
	const guild = await global.zuly.getRESTGuild('880174783294214184');
	const membro = await guild.getRESTMember(user);
	if (!membro) {
		return false;
	}
	else if (membro.roles.includes('912014349277737051')) {
		return true;
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
	const user = data.id;
	if (data.message === 'Unknown User') new Error('Usuário desconhecido.');
	if (!data.banner) return null;
	const banner = data.banner;
	let format = {};
	if (banner.startsWith('a_')) {
		format = '.gif';
	}
	else {
		format = '.png';
	}
	const size = 512;
	const url = `https://cdn.discordapp.com/banners/${user}/${banner}${format}?size=${size}`;
	return url || 'https://i.imgur.com/2dwGomm.png';
}

function uptime (lang) {
	let uptimeSecs = global.zuly.uptime / 1000;
	const days = Math.floor(uptimeSecs / 86400);
	const hours = Math.floor(uptimeSecs / 3600);
	uptimeSecs %= 3600;
	const minutes = Math.floor(uptimeSecs / 60);
	const seconds = Math.floor(uptimeSecs % 60);
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
	  image: url
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
	const ms = s % 1000;
	s = (s - ms) / 1000;
	const secs = s % 60;
	s = (s - secs) / 60;
	const mins = s % 60;
	let hrs = (s - mins) / 60;

	let days = parseInt(Math.floor(hrs / 24));
	hrs = parseInt(hrs % 24);

	const meses = parseInt(Math.floor(days / 30));
	days = parseInt(days % 30);

	return (meses > 0 ? `\`${pad(meses)}\`` + ' meses, ' : '') + (days > 0 ? `\`${pad(days)}\`` + ' dias, ' : '') + (hrs > 0 ? `\`${pad(hrs)}\`` + ' horas, ' : '') + (mins > 0 ? `\`${pad(mins)}\`` + ' minutos, ' : '') + (`\`${pad(secs)}\`` + ' segundos');
};
async function download (url, dest) {
	const http = require('https');
	const fs = require('fs');
	return new Promise((resolve, reject) => {
		const file = fs.createWriteStream(dest, { flags: 'wx' });

		const request = http.get(url, response => {
			if (response.statusCode === 200) {
				response.pipe(file);
			}
			else {
				file.close();
				fs.unlink(dest, () => {});
				reject(`Server responded with ${response.statusCode}: ${response.statusMessage}`);
			}
		});

		request.on('error', err => {
			file.close();
			fs.unlink(dest, () => {});
			reject(err.message);
		});

		file.on('finish', () => {
			resolve();
		});

		file.on('error', err => {
			file.close();

			if (err.code === 'EEXIST') {
				reject('File already exists');
			}
			else {
				fs.unlink(dest, () => {});
				reject(err.message);
			}
		});
	});
};
global.zuly.download = download;
global.zuly.getBugHunter = getBugHunter;
global.zuly.getPremium = getPremium;
global.zuly.time2 = time2;
global.zuly.bytes = bytes;
global.zuly.isNsfw = isNsfw;
global.zuly.deepai = deepai;
global.zuly.getBotUptime = uptime;
global.zuly.getRESTBanner = banner;
