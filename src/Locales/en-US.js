module.exports = {
	lang: 'en',
	labels: {
		add: 'Add me!',
		support: 'Support Server!',
		vote: 'Vote for me!'
	},
	message: {
		P: 'Hello, human!',
		view: 'I don\'t have permission to read the message history!',
		the: 'The Command',
		unk: 'does not exist or cannot be run at the moment!',
		user: 'You don \'t have all the necessary permissions to use this command!\nNeeded permissions:',
		bot: 'I don\'t have all the necessary permissions to run this command!\nNeeded permissions:',
		dev: 'Only my developers can use this command!',
		c: 'Wait %t seconds to use another command.',
		e: 'Oops, an error happened!',
		e2: 'Report this error!',
		e3: 'My team probably already knows about this error, but how about you help? You can open an [issue](https://github.com/zulybot/starbot/issues) in [github](https://github.com/zulybot/starbot) or report it to my [support server](https://discord.gg/2pFH6Yy), let\'s make the discord a better place, together 🤝',
		nsfw: 'This command can only be used on nsfw channels'
	},
	host: {
		db: 'Eu utilizo [MongoDB](https://mongodb.com) para meu banco de dados, hospedados em maquinas da <:zu_azure:880536844473880617> [Azure](https://azure.microsoft.com).',
		vps: 'Eu sou hospedada na VPS, utilizando maquinas da [OVH](https://ovh.com), com sistema operacional <:zu_ubuntu:880496793740255253> Ubuntu.'
	},
	giveaway: {
		sec: 'seconds',
		min: 'minutes',
		hrs: 'hours',
		day: 'days',
		term: 'Ended at',
		host: 'Hosted by: {user}',
		win: 'winner(s)',
		wins: 'Congratulations, {winners}! You won **{prize}**!\n{messageURL}',
		addReaction: 'addReaction with 🎁 to participate!',
		restante: 'Time remaining:',
		no: 'Giveaway cancelled, no valid participations',
		give: 'GIVEAWAY',
		giveend: 'GIVEAWAY ENDED',
		start: 'You did not use the command correctly, use: `%pgiveaway [time (10s, 10m)] [winners (1, 1w)] [prize (photos of kittens)]`, do not include **[]** or **()**.',
		end: 'You didn\'t use the command correctly, use: `%pgiveaway-end [message id]`',
		reroll: 'You didn\'t use the command correctly, use: `%pgiveaway-reroll [message id]`',
		novo: 'New winner(s): {winners}! Congratulations, you won **{prize}**\n{messageURL}',
		err: 'No valid participations, no new winner(s) can be chosen!'
	},
	help: {
		title: 'Command List • ',
		creators: 'I was developed by ',
		description: '> My current prefix is: `%p`\n> If you have any questions, please enter my support server: [Click here](https://discord.gg/pyyyJpw5QW)\n> Add me by clicking [here](https://discord.com/oauth2/authorize?client_id=880173509077266483&scope=bot&permissions=805432446)',
		nsfw: 'You need to be on an NSFW channel to see nsfw commands. '
	},
	calc: {
		ex: 'Ams missing, use, `%pcalc <expression>`',
		inv: 'Invalid expression.',
		res: 'Result'
	},
	botinfo: {
		texto: 'Hi, I\'m %bot, a bot with unique features that every server needs! I currently know **%u different people** who use my features and I\'m on **%g different servers**.\n\nI\'m developed by `%devs` using [Eris](https://abal.moe/Eris/) using [Javascript](https://developer.mozilla.org/en-US/docs/Web/JavaScript) & [ NodeJS](https://nodejs.org/en/)',
		recursos: 'Recursos:'
	},
	messages: {
		tem: 'has',
		msg: 'messages',
		title: 'Messages'
	},
	print: {
		web: 'Missing the website'
	},
	mention: {
		response: 'Hello **%u**! See my commands by using `star help` or `s!help`'
	},
	together: {
		channel: 'You must be on a voice channel to execute this command.',
		done: 'Just click on the link and you will be redirected to the activity:',
		done2: '**(only works on computer)**'
	},
	erela: {
		np: 'Playing now',
		end: 'The song is over, I\'m leaving',
		not: 'I\'m not playing anything on the server.'
	},
	play: {
		nothing: 'Arguments are missing, use `%pplay <music | url>`',
		add: 'Added to queue',
		can: 'You need to be on a voice channel to listen to music.'
	},
	waifu: {
		casar: 'React with 💖 to get married',
		casou: 'You married with %w',
		dono: 'Owner',
		utl: 'Utilize: %pwaifu-info [ID]',
		casado: 'Have you recently got married, you can get married every 2 hours'
	},
	tradutor: {
		lang: 'You need to specify the language, example: %translator **en** Oi',
		text: 'You need to specify the text, example: %translator en  **Oi** '
	},
	invite: {
		add: 'Add me to your server!',
		desc: 'Yay, did you like my commands? Or my features? [Add me](https://discord.com/oauth2/authorize?client_id=719524114536333342&scope=bot%20applications.commands&permissions=805432446)\n\nYou need Help or something? Log into my [support server](https://discord.gg/2pFH6Yy), yay'
	},
	ban: {
		noarg: '**Mention** some user or give the **ID** of the same.',
		vc: 'You really want to punish',
		r: '✅',
		r2: '✅',
		mot: 'Not Defined',
		mot2: 'Punished for:',
		mot3: 'Reason:',
		the: 'The User',
		foi: 'has been successfully punished.'
	},
	clear: {
		msg: 'messages** cleared successfully',
		no: 'Enter the amount of messages to be cleaned',
		p: 'Looking for messages, this could take 30 seconds...',
		num: 'I can only clear between 2 to 2000 messages'
	},
	baninfo: {
		user: 'User:',
		reason: 'Reason:',
		desban: 'To unban react with 🐹.'
	},
	multiLang: {
		unknownLanguage: 'Unknown language.\n<:zu_info:880812942713573396> Available languages: %langs',
		insertLang: 'You did not specify a language. To change the bot language, run `%planguage %langs`'
	},
	autorole: {
		insertRole: 'You did not specify a role, use: `%pautorole <@role | role id | disable>.`',
		success: 'Okay, now members who join the server will have the `%cargo` post automatically added.',
		disabled: 'Autorole has been successfully disabled.',
		noset: 'Not Set',
		bot: 'Mention the roles that will be given when any BOT enters the server.',
		botset: 'The bots Autorole has been set to the roles:',
		user: 'Mention the roles that will be given when any user enters the server.',
		userset: 'Users Autorole has been set for the roles:',
		mem: 'Members',
		del: 'Disable',
		del2: 'React with ❌ to disable/delete'
	},
	userinfo: {
		inf: 'Information:',
		tag: 'Tag of: ',
		id: 'ID of: ',
		create: 'Account created day: '
	},
	slash: 'due to some compatibility issues, I was completely switched to **Slash Commands**, if the commands don\'t appear, add me again by clicking here: [add](https://zulybot.xyz/add), it is not necessary to remove the bot for this and if the commands have not yet updated on your server, it can take up to an hour for them to update on all servers, due to discord.',
	avatar: {
		title: 'Avatar from:',
		download: 'Download link:',
		click: 'Click Here'
	},
	perfil: {
		ngm: 'NOBODY',
		desc: 'Zuly is my friend, did you know that you can change this using "%paboutme"?',
		comp: 'Click on `🛒` to buy',
		succ: 'Background purchased successfully',
		no: 'You don\'t have enough money to buy this background'
	},
	filtros: {
		ativado: 'The filter %f has been successfully enabled.',
		desativado: 'Filter %f was successfully disabled.'
	},
	economy: {
		jacoletou: 'You\'ve already collected your daily reward today! Try again on:',
		recebeu: 'You received:',
		noarg: 'There are missing arguments, use: `%presgate <code>.`',
		resgatado: 'You already redeemed this code.',
		nocode: 'This code does not exist.',
		sucesso: 'You redeemed the promocode **%p** and won **%v ryos** 🥳'
	},
	sobre: {
		nada: 'I need some argument, use: `%poverim <text>`',
		alt: 'About changed to: `%t`'
	},
	nsfw: {
		activated: 'System activated successfully!',
		disabled: 'System successfully disabled!',
		nonsfw: 'Do not send NSFW content outside of NSFW channels.'
	}
};
