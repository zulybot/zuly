module.exports = {
	lang: 'pt',
	div: '<:zu_minecraft:980194995485175809> {{user}} **|** Are you looking for a Minecraft server? Come join [ZulyMC](https://discord.gg/mcbu7wsX8W)\n>> ⤷ **`IP:` **mc.zulybot.xyz;\n⤷ **`Versions:`** Java (1.17.1/Original/Pirate).',
	afk: {
		set: ':zzz: {{user}} **|** You are afk, reason: `{{status}}',
		remove: ':zzz: {{user}} **|** You are no longer afk',
		mention: ':zzz: {{user}} **|** Went afk [{{time}}], reason: `{{status}}`.'
	},
	image: {
		editing: '✍️ %u **|** editing',
		args: '✍️ %u **|** I need you to give me some argument so I can edit',
		long: '✍️ %u **|** Your message is too long, try shortening it to 300 characters',
		achivment: 'Progress Made!'
	},
	actions: {
		kiss: {
			description: '%u1 kissed %u2.',
			labels: { rt: 'Hit back' }
		},
		slap: {
			description: '%u1 punched %u2.',
			labels: { rt: 'Hit back' }
		},
		hug: {
			description: '%u1 gave %u2 a hug.',
			labels: { rt: 'Hit back' }
		},
		pat: {
			description: '%u1 patted %u2.',
			labels: { rt: 'Hit back' }
		}
	},
	unbanall: {
		title: 'Unbanall',
		description: 'Do you really want to unban all members of your server? This action will take a long time, but it can be undone with the command `/desunbanall`.',
		confirm: 'Yes, unban all.',
		done: 'All members have been unbanned, time spent: `%t`.'
	},
	desunban: {
		title: 'Desunban',
		description: 'Do you really want to ban all unbanned members from your server? This action will take a long time, but it can be undone with the command `/unbanall`.',
		confirm: 'Yes, ban all.',
		done: 'All members banned, time spent: `%t`.'
	},
	report: {
		p1: 'Are you wanting to report some people? You\'ve come to the right place! To make the report just click on the form!',
		id: 'Form ID:',
		dm: 'See your direct messages!'
	},
	daily: {
		coletado: 'You have collected **%m** daily, come back tomorrow and collect again.',
		coletou: 'You have already collected your daily reward, collect it again in **%time**'
	},
	premium: 'You have discovered a premium feature, to be a premium user join my [support server](<https://discord.gg/pyyyJpw5QW>)!',
	ball: {
		title: '🎱 Magic Ball',
		field1: '**Question:**',
		field2: '**Answer:**'
	},
	ship: {
		nou: 'Mention some user to ship',
		d1: 'You are not compatible, you are very different from each other 😔',
		d2: 'You can be friends, but I don\'t see a better future between you, you are similar to each other 🤝',
		d3: 'You can be a couple, the tastes are almost the same and you know each other a lot 👀',
		d4: 'You are perfect, made for each other, go ahead, you have everything to work out ❤️'
	},
	dashboard: 'The Bot configuration has been migrated to the dashboard, access this link: https://zulybot.xyz/dashboard/%g',
	backup: {
		create: { success: 'Backup created successfully!\n⤷ ID: `%id`, time taken to create: `%t`' },
		list: {
			noBackups: 'You don\'t have backups.',
			backupList: 'Backup List:',
			backupID: 'ID: %id'
		},
		load: {
			success: 'Backup successfully loaded!',
			error: 'Backup not found.',
			confirm: 'Do you want to load the backup? Please be aware that all your settings will be overwritten by the backup, **messages, roles & channels** will not be recovered after this process.\n> To upload click on the **button** below.'
		}
	},
	clusters: {
		desc: '> This server is in cluster `%id`\n- Name: `%name`\n- Ping: `%ping`',
		field: 'Info Clusters:',
		fielDesc: '- Cluster %id\n- Ping: %p\n- PingDB: %pd\n- Consumption: %ram'
	},
	gender: {
		title: 'Genre',
		desc: 'Hello %u, I\'d like to get to know you better, what are you? Boy? Girl? Or neither? I need to know so I can better adapt my answers!\n>>> - 🚹 Boy\n- 🚺 Girl\n- 🚻 Neither',
		change: 'Genre changed to `%g` successfully!',
		male: 'boy',
		female: 'girl'
	},
	anagramWords: [
		'floor',
		'appreciate',
		'recognize',
		'have',
		'announcement',
		'television',
		'hole',
		'scholar',
		'packet',
		'resident',
		'pull',
		'tragedy',
		'glance',
		'compact',
		'mean',
		'knife',
		'pursuit',
		'pump',
		'biscuit',
		'auction',
		'treat',
		'attract',
		'employ',
		'wreck',
		'uncertainty',
		'rumor',
		'formal',
		'noble',
		'jest',
		'original',
		'cover',
		'ballet',
		'smell',
		'bond',
		'reflect',
		'loud',
		'ignorant',
		'bread',
		'faint',
		'glass',
		'room',
		'disorder',
		'hall',
		'morning',
		'connection',
		'innocent',
		'convict',
		'suggest',
		'film',
		'minimum',
		'course',
		'favorable',
		'slot',
		'record',
		'torch',
		'minor',
		'dairy',
		'thank',
		'pen',
		'allocation',
		'qualified',
		'sister',
		'tower',
		'spirit',
		'protection',
		'see',
		'transaction',
		'harmony',
		'precedent'
	],
	botban: {
		title: 'You are banned!',
		description: '↳ You have been banned from using `%z` by: `%r`\n> <:zu_info:911303533859590144> You can file an appeal on our [support server](https://discord.gg/pyyyJpw5QW).'
	},
	customCommand: 'Command created successfully, use `/%n` to execute.',
	alreadyExists: 'The command already exists.',
	ticket: {
		sus: 'Success!',
		already: 'Sorry, you already have a ticket.',
		await: 'Wait until one of the attendants answers you.',
		created: 'Your ticket has been created.',
		delete: 'Your ticket has been closed and will be deleted in 10 seconds.',
		create: 'To create a ticket click on the button below,',
		labels: {
			delete: 'Close',
			create: 'Open Ticket'
		}
	},
	logs: {
		bulkDelete: 'There were deleted %n messages in #%c (%id).',
		oldMessage: 'Old Message:',
		newMessage: 'New Message:',
		deleted: 'Message Deleted:',
		channel: 'Channel:',
		url: 'Link:',
		message: { title: 'Message Logs' },
		bans: { title: 'Ban Logs' },
		user: 'User:',
		reason: 'Reason:',
		mod: 'Moderator:',
		bani: 'Banned',
		unbani: 'Unbanned',
		jump: 'Go to message',
		set: 'Channel set to `%c`'
	},
	aki: {
		reg: 'pt',
		q: 'Question:',
		r: 'Answers:',
		i: 'Starting Akinator',
		is: 'Is this your character?',
		win: 'Great! I got it right once more.',
		nowin: 'Uh, you won',
		yay: 'I loved playing with you!',
		res: '[yes (**y**) / no (**n**)]'
	},
	labels: {
		recalc: 'Recalculate',
		unban: 'Desbanir',
		buy: 'Buy',
		load: 'Load'
	},
	guess: {
		start: 'The Game will start in **5 seconds** with a number between `%min` and `%max`.',
		started: 'It\'s started!',
		number: 'The chosen Number was `%num`, users must guess it in order to win the event.',
		win: 'You got it right! The chosen Number was `%num`!'
	},
	lockdown: {
		pass: 'To start lockdown, send `lock` in chat.\n> ⚠️ If you want to cancel, send something else in chat.',
		cancel: 'Lockdown has been successfully cancelled.',
		success: 'Lockdown was successfully executed.',
		locking: 'Lockdown is in progress.',
		noCanal: 'No channels have been locked.'
	},
	print: { website: 'Print from website:' },
	mention: {
		hello: 'Hello %user!',
		about: 'I am a multifunctional bot for discord!',
		help: 'To know my commands, type **/help**.',
		labels: {
			support: 'Support Server',
			invite: 'Invite',
			website: 'Website'
		}
	},
	reactionRole: {
		invalidMessage: 'Could not find message with id `%id%`',
		sucess: 'ReactionRole created successfully!'
	},
	eventLog: {
		fields: {
			deletedMessage: 'Deleted Message:',
			oldMessage: 'Old Message:',
			newMessage: 'New Message:'
		},
		channel: 'Channel:'
	},
	docs: { args: 'Say what will be searched for in the documentation.' },
	fnshop: {
		args: 'Include the channel ID that will be sent to the fortnite store.',
		channel: 'I don\'t have permission to send messages on the mentioned channel.',
		sucess: 'Channel set successfully!'
	},
	message: {
		mod: 'This command can only be used by my moderators!',
		P: 'Привет, человек!',
		view: 'У меня нет разрешения на чтение истории сообщений!',
		the: 'Команда',
		unk: 'не существует или не может быть запущен в данный момент!',
		user: 'У вас нет всех необходимых разрешений для использования этой команды!\nНеобходимые разрешения:',
		bot: 'Eu não tenho todas as permissões necessárias para executar este comando! \n Permissões necessárias:',
		dev: 'Только мои разработчики могут использовать эту команду!',
		c: 'Подождите %t секунд, чтобы использовать другую команду.',
		e: 'К сожалению, произошла ошибка!',
		e2: 'Сообщите об этой ошибке!',
		e3: 'My team probably already knows about this error, but how about you help? You can open an [issue](https://github.com/zulybot/zuly/issues) in [github](https://github.com/zulybot/zuly) or report it to my [support server](https://discord.gg/pyyyJpw5QW), let\'s make the discord a better place, together 🤝',
		nsfw: 'Эта команда может использоваться только на каналах nsfw.'
	},
	host: {
		db: 'Eu utilizo [MongoDB](https://mongodb.com) para meu banco de dados, hospedados em maquinas da <:zu_azure:880536844473880617> [Azure](https://azure.microsoft.com).',
		vps: 'Eu sou hospedada na VPS, utilizando maquinas da [OVH](https://ovh.com), com sistema operacional <:zu_ubuntu:880496793740255253> Ubuntu.'
	},
	giveaway: {
		sec: 'segundos',
		min: 'minutos',
		hrs: 'horas',
		day: 'dias',
		term: 'Terminou ás',
		host: 'Sorteio de: {user}',
		win: 'ganhador(es)',
		wins: 'Congratulations, {winners}! You won **{this.prize}**!\n{this.messageURL}',
		react: 'react with 🎁 to participate!',
		restante: 'Tempo Restante:',
		no: 'Sorteio cancelado, sem participações válidas',
		give: 'SORTEIO',
		giveend: 'SORTEIO ENCERRADO',
		start: 'Você não usou o comando corretamente, utilize: `%pgiveaway-start [tempo(10s, 10m)] [ganhadores(1, 1w)] [prêmio(fotos de gatinhos)]`, não inclua **[]** ou **()**.',
		end: 'Você não usou o comando corretamente, utilize: `%pgiveaway-end [id da mensagem]`',
		reroll: 'Você não usou o comando corretamente, utilize: `%pgiveaway-reroll [id da mensagem]`',
		novo: 'New winner(s): {winners}! Congratulations, you won **{this.prize}**\n{this.messageURL}',
		err: 'Sem participações válidas, nenhum(s) novo(s) vencedor(es) escolhidos!'
	},
	help: {
		title: 'Lista de Comandos • ',
		creators: 'Eu fui desenvolvida por ',
		description: '> Meu prefixo atual é: `%p`\n> Caso tenha alguma dúvida entre em meu servidor de suporte: [Clique Aqui](https://discord.gg/pyyyJpw5QW)\n> Me adicione clicando [aqui](https://discord.com/oauth2/authorize?client_id=880173509077266483&scope=bot&permissions=805432446)',
		nsfw: 'Você precisa estar em um canal NSFW para ver os comandos nsfw. '
	},
	calc: {
		ex: 'Estão faltando argumentos, utilize, `%pcalc <expressão>`',
		inv: 'Expressão invalida.',
		res: 'Resultado'
	},
	botinfo: {
		texto: 'Hi, I\'m **%bot**, a bot with unique features that every server needs! I currently know **%u different people** who use my features and I\'m on **%g different servers**.\n\nI\'m developed by `%devs` using [Eris](https://abal.moe/Eris/) using [Javascript](https://developer.mozilla.org/en-US/docs/Web/JavaScript) & [ NodeJS](https://nodejs.org/en/)',
		recursos: 'Resources:',
		mem: 'this server is using %m of my memory.'
	},
	messages: {
		tem: 'tem',
		msg: 'mensagens',
		title: 'Mensagens'
	},
	together: {
		channel: 'Você precisa estar em um canal de voz para executar este comando.',
		done: 'Basta clicar no link e você será redirecionado para a atividade:',
		done2: '**(só funciona no computador)**'
	},
	erela: {
		np: 'Tocando agora',
		end: 'A música acabou, estou saindo',
		skip: 'The song was successfully skipped.',
		not: 'Não estou tocando nada no servidor.',
		voice: 'I was alone on the voice channel, I\'m leaving!',
		duration: 'Duration:',
		loop: {
			ativado: 'Current Song Loop has been enabled.',
			desativado: 'Current Song Loop has been turned off.'
		}
	},
	play: {
		nada: 'Arguments are missing, use `%pplay <music | url>`',
		add: 'Adicionado a fila',
		can: 'Você precisa estar em um canal de voz para ouvir música.'
	},
	waifu: {
		casar: 'Reaja com 💖 para se casar',
		casou: 'Você se casou com %w',
		dono: 'Dono',
		utl: 'Utilize: %pwaifu-info [ID]',
		casado: 'Você já casou recentemente, você pode casar a cada 2 horas',
		noharem: 'You don\'t have waifus, use `%pwaifu roll` to add one.',
		battle: 'Battle of Waifus',
		battleDesc: '**%u** is looking for a partner for a waifus duel, who will face it?',
		label: 'Me!',
		yms: 'You cannot battle with yourself.',
		bat: '%u, you will battle %2u, you have 30 seconds to choose a waifu (player found in `%t`).',
		select: 'Nothing Selected.'
	},
	tradutor: {
		lang: 'Você precisa especificar a linguagem, examplo: %translator **en** Oi',
		text: 'Você precisa especificar o texto, examplo: %translator en  **Oi** '
	},
	invite: {
		add: 'Me Adicione ao seu servidor!',
		desc: 'Yay, did you like my commands? Or my features? [Add me](https://discord.com/oauth2/authorize?client_id=719524114536333342&scope=bot%20applications.commands&permissions=805432446)\n\nYou need Help or something? Log into my [support server](https://discord.gg/pyyyJpw5QW), yay'
	},
	ban: {
		noarg: '**Mencione** algum usuário ou dê o **ID** do mesmo.',
		vc: 'Você deseja mesmo punir',
		r: '✅',
		r2: '✅',
		mot: 'Não Definido',
		mot2: 'Punido por:',
		mot3: 'Motivo:',
		the: 'O Usuário',
		foi: 'foi punido com sucesso.',
		dev: 'You cannot punish the bot developer.'
	},
	clear: {
		msg: 'mensagens** limpas com sucesso',
		no: 'Insira a quantidade de mensagens a serem limpas',
		p: 'Procurando mensagens, isso pode levar 30 segundos...',
		num: 'I can only clear between 2 to 100 messages'
	},
	baninfo: {
		user: 'Usuário:',
		reason: 'Motivo',
		noreason: 'No reason.',
		desban: 'Para desbanir reaja com 🐹.'
	},
	multiLang: {
		unknownLanguage: 'Idioma desconhecido.\n<:zu_info:880812942713573396> Idiomas disponíveis: %langs',
		insertLang: 'Você não específicou um idioma. Para alterar o idioma do bot, utilize `%pidioma %langs`'
	},
	autorole: {
		insertRole: 'Você não especificou um cargo, utilize: `%pautorole <@cargo | cargo id | desativar>.`',
		success: 'Certo, agora membros que entrarem no servidor terão o cargo `%cargo` adicionado automaticamente.',
		disabled: 'Autorole foi desativado com sucesso.',
		noset: 'Não Setado',
		bot: 'Mencione o cargo que será dado quando algum BOT entrar no servidor.',
		botset: 'O Autorole de bots foi setado para os cargos:',
		user: 'Mencione o cargo que será dado quando algum usuário entrar no servidor.',
		userset: 'O Autorole de usuários foi setado para os cargos:',
		mem: 'Membros',
		del: 'Desativar',
		del2: 'Reaja com ❌ para desativar/deletar'
	},
	userinfo: {
		inf: 'Information from:',
		tag: 'Tag from:',
		badges: 'Badges of:',
		id: 'ID from:',
		create: 'Account created on:',
		join: 'Joined on:',
		more: 'More info',
		perms: 'Permissions:',
		roles: 'Roles:',
		hash: 'Avatar hash:',
		off: 'User off server.'
	},
	slash: 'devido a alguns problemas de compatibilidade, mudei completamente para **Comandos Slash**, se os comandos não aparecerem, adicione-me novamente clicando aqui: [adicionar](https://zulybot.xyz/add), não é necessário remover o bot, caso os comandos ainda não foram atualizados em seu servidor, pode levar até uma hora para que sejam atualizados em todos os servidores, devido ao discord.',
	avatar: {
		title: 'Avatar de:',
		download: 'Link para download:',
		hex: 'Hex to use in your profile:',
		click: 'Clique Aqui',
		footer: 'If the plan doesn\'t work, change the plan, not the goal.'
	},
	perfil: {
		ngm: 'NINGUÉM',
		desc: 'A Zuly é minha amiga, sabia que você pode alterar isso usando "%psobremim"?',
		comp: 'Click on **button** to buy',
		succ: 'Background comprado com sucesso',
		sep: 'Background set successfully',
		no: 'Você não tem dinheiro suficiente para comprar este background'
	},
	filters: {
		ativado: 'The filter %f has been successfully enabled.',
		desativado: 'Filter %f was successfully disabled.'
	},
	economy: {
		carteira: 'Wallet:',
		banco: 'Bank:',
		jacoletou: 'Сегодня вы уже получили свою ежедневную награду! Попробуйте еще раз:',
		recebeu: 'Ты получил:',
		noarg: 'Estão faltando argumentos, utilize: `%presgatar <codigo>.`',
		resgatado: 'Você já resgatou esse código.',
		nocode: 'Esse código não existe.',
		sucesso: 'Você resgatou o promocode **%p** e ganhou **%v ryos** 🥳'
	},
	sobre: {
		nada: 'Preciso de algum argumento, utilize: `%psobremim <texto>`',
		alt: 'Sobre alterado para: `%t`'
	},
	nsfw: {
		activated: 'System activated successfully!',
		disabled: 'System successfully disabled!',
		nonsfw: 'Не отправляйте контент NSFW за пределы каналов NSFW.'
	}
};