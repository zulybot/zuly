/* eslint-disable */
const API = require('../API/keys');
const deepai = require('deepai');
deepai.setApiKey(API.deep);
/*
global.ramUsed = {};

for (const key of Object.keys(process.memoryUsage())) {
	const mem = Math.round(process.memoryUsage()[key]);
	global.zuly.ramUsed[key] = {
		gigabytes: mem / (1024 * 1024 * 1024),
		megabyes: mem / (1024 * 1024),
		kilobytes: mem / 1024,
		bytes: mem
	};
}

const totalMem =
global.zuly.ramUsed.heapTotal.bytes |
global.zuly.ramUsed.external.bytes |
global.zuly.ramUsed.heapUsed.bytes |
global.zuly.ramUsed.arrayBuffers.bytes |
global.zuly.ramUsed.rss.bytes;

global.zuly.ramUsed.total = {
	gigabytes: totalMem / (1024 * 1024 * 1024),
	megabyes: totalMem / (1024 * 1024),
	kilobytes: totalMem / 1024,
	bytes: totalMem
};
*/
async function getWebhook (channel) {
	const webhooks = await global.zuly.getChannelWebhooks(channel.id);
	if (webhooks.length === 0) {
		const webhook = channel.createWebhook({
			avatar: global.zuly.user.displayAvatarURL({ dynamic: true, format: 'png', size: 4096 }),
			name: global.zuly.user.username,
			reason: 'Zuly | EventLog'
		});
		return webhook;
	}
	else {
		return webhooks[0];
	}
}
async function muteMember (guild, member, reason, time) {
	await global.zuly.requestHandler.request('PATCH', `/guilds/${guild.id}/members/${member.id}`, true, {
		communication_disabled_until: time,
		reason: reason,
	});
}
async function unmuteMember (guild, member, reason) {
	const time = null;
	await global.zuly.requestHandler.request('PATCH', `/guilds/${guild.id}/members/${member.id}`, true, {
		communication_disabled_until: time,
		reason: reason
	});
}
async function getPremium (typename, user) {
	const tipo = typename.toLowerCase();
	if (tipo === 'doador') {
		const guild = await global.zuly.guilds.cache.get('880174783294214184');
		const membro = await guild.members.cache.get(user);
		if (!membro) {
			return false;
		}
		else if (membro.roles.cache.has('903708588806119465') || membro.roles.cache.has('880399661184200725')) {
			return true;
		}
	}
	if (tipo === 'essencial') {
		const guild = await global.zuly.guilds.cache.get('880174783294214184');
		const membro = await guild.members.cache.get(user);
		if (!membro) {
			return false;
		}
		else if (membro.roles.cache.has('903710903420223548')) {
			return true;
		}
	}
}
async function getBugHunter (user) {
	const guild = await global.zuly.guilds.cache.get('880174783294214184');
	const membro = await guild.members.cache.get(user);
	if (!membro) {
		return false;
	}
	else if (membro.roles.cache.has('912014349277737051')) {
		return true;
	}
}
async function nqn (message) {
	let { client } = message;
	if (message.author.bot) return;
	let msg = message.content;

	let emojis = msg.match(/(?<=:)([^:\s]+)(?=:)/g);
	if (!emojis) return;

	const hasEmoteRegex = /<a?:.+:\d+>/gm;
	const emoteRegex = /<:.+:(\d+)>/gm;

	const emoj = message.content.match(hasEmoteRegex);

	emojis.forEach((m) => {
		let emoji =
			message.guild.emojis.cache.find((x) => x.name === m) ||
			client.emojis.cache.find((x) => x.name === m);

		if (!emoji) return;

		if (emo = emoteRegex.exec(emoj)) {
			if (emoji !== undefined && emoji.id !== emo[1]) return;
		}

		let temp = emoji.toString();
		if (new RegExp(temp, 'g').test(msg))
			{msg = msg.replace(new RegExp(temp, 'g'), emoji.toString())}
		else {msg = msg.replace(new RegExp(':' + m + ':', 'g'), emoji.toString())};
	});

	if (msg === message.content) return;

	let webhook = await message.channel.fetchWebhooks();
	webhook = webhook.find((x) => x.name === `${global.zuly.user.username} | NQN`);

	if (!webhook) {
		webhook = await message.channel.createWebhook(`${global.zuly.user.username} | NQN`, {
			avatar: client.user.displayAvatarURL({ dynamic: true, size: 4096 })
		});
	}

	message.delete().catch((err) => {});
	webhook.send({
		content: msg,
		username: message.member.nickname
			? message.member.nickname
			: message.author.username,
		avatarURL: message.author.displayAvatarURL({ dynamic: true, size: 4096 }),
		allowedMentions: {
			users: [],
			roles: [],
			everyone: false
		}
	}).catch((err) => {});
}
async function banner (id) {
	if (!id) new Error('Não foi fornecido o ID do usuário');
	const user = await global.zuly.users.fetch(id);

	let hexString;
	let userBanner;

	if (user.banner == null || user.accentColor == null || user.accentColor == null) {
		if (user.accentColor === null) {
			userBanner = 'https://singlecolorimage.com/get/ffcbdb/600x240';
		}
		else {
			hexString = user.accentColor ? user.accentColor.toString(16) : 'ffcbdb';
			userBanner = `https://singlecolorimage.com/get/${hexString}/600x240`;
		}
	}
	else {
		userBanner = user.bannerURL({ dynamic: true, size: 4096 });
	}
	// const url = user.bannerURL || `https://singlecolorimage.com/get/${hexString}/960x540`;
	return userBanner;
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
global.zuly.nqn = nqn;
global.zuly.getWebhook = getWebhook;
global.zuly.muteMember = muteMember;
global.zuly.unmuteMember = unmuteMember;
global.zuly.download = download;
global.zuly.getBugHunter = getBugHunter;
global.zuly.getPremium = getPremium;
global.zuly.time2 = time2;
// global.zuly.bytes = bytes;
global.zuly.isNsfw = isNsfw;
global.zuly.deepai = deepai;
global.zuly.getBotUptime = uptime;
global.zuly.getRESTBanner = banner;
