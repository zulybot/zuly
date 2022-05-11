module.exports = {
	lang: 'pl',
	actions: {
		kiss: {
			description: '%u1 całuje %u2.',
			labels: { rt: 'Hit back' }
		},
		slap: {
			description: '%u1 uderza %u2.',
			labels: { rt: 'Hit back' }
		},
		hug: {
			description: '%u1 przytula %u2.',
			labels: { rt: 'Hit back' }
		}
	},
	unbanall: {
		title: 'Odbanuj wszystkich',
		description: 'Czy na pewno chcesz odbanować wszystkich członków swojego serwera? Ta czynność zajmie trochę czasu, ale można ją cofnąć za pomocą polecenia `/desunbanall`.',
		confirm: 'Tak, odbanuj wszystkich.',
		done: 'Wszyscy użytkownicy zostali odbanowani w czasie: `%t`.'
	},
	desunban: {
		title: 'Nieodbanowywuj',
		description: 'Czy na pewno chcesz zbanować wszystkich odbanowanych członków swojego serwera? Ta czynność zajmie trochę czasu, ale można ją cofnąć za pomocą polecenia `/unbanall`.',
		confirm: 'Tak, zbanuj wszystkich.',
		done: 'Wszyscy członkowie zbanowani w czasie: `%t`.'
	},
	report: {
		p1: 'Czy chcesz kogoś zgłosić? Jesteś we właściwym miejscu! Aby utworzyć zgłoszenie, naciśnij na formularz!',
		id: 'ID formularza:',
		dm: 'Sprawdź swoje wiadomości!'
	},
	daily: {
		coletado: 'You have collected **%m** daily, come back tomorrow and collect again.',
		coletou: 'You have already collected your daily reward, collect it again in **%time**'
	},
	premium: 'You have discovered a premium feature, to be a premium user join my [support server](<https://discord.gg/pyyyJpw5QW>)!',
	ball: {
		title: '🎱 Magiczna Kula',
		field1: '**Pytanie:**',
		field2: '**Odpowiedź:**'
	},
	ship: {
		nou: 'Mention some user to ship',
		d1: 'Nie pasujecie do siebie, bardzo się od siebie różnicie 😔',
		d2: 'Możecie być przyjaciółmi, ale nie widzę dla Was czegoś poważniejszego, macie ze sobą trochę wspólnego 🤝',
		d3: 'Pasujecie do siebie, Wasze upodobania są niemalże takie same i wiecie o sobie bardzo dużo 👀',
		d4: 'Jesteście dla siebie idealni, jesteście dla siebie stworzeni, nie wahajcie się zacząć czegoś wyjątkowego ❤️'
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
		title: 'Płeć',
		desc: 'Witaj %u, chcę poznać Cię trochę bliżej, więc kim jesteś? Chłopcem? Dziewczyną? Czy żadnym z tych? Dzięki tej wiedzy mogę lepiej dostosować swoje odpowiedzi\n>>> - 🚹 Chłopiec\n- 🚺 Dziewczyna\n- 🚻 Żadne z tych',
		change: 'Zmieniono płeć na `%g`!',
		male: 'chłopiec',
		female: 'dziewczyna'
	},
	anagramWords: [
		'podłoga',
		'doceniać',
		'rozpoznawać',
		'mieć',
		'ogłoszenie',
		'telewizja',
		'dziura',
		'scholar',
		'packet',
		'resident',
		'ciągnąć',
		'tragedia',
		'rzut oka',
		'kompatkowe',
		'niemiłe',
		'nóż',
		'gonić',
		'pompa',
		'ciastko',
		'aukcja',
		'leczyć',
		'przyciągać',
		'zatrudniać',
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
		'nabiał',
		'dziękować',
		'długopis',
		'allocation',
		'qualified',
		'siostra',
		'wieża',
		'żywioł',
		'ochrona',
		'widzieć',
		'transakcja',
		'harmonia',
		'precedent'
	],
	botban: {
		title: 'Zbanowano Cię!',
		description: '↳ You have been banned from using `%z` by: `%r`\n> <:zu_info:911303533859590144> You can file an appeal on our [support server](https://discord.gg/pyyyJpw5QW).'
	},
	customCommand: 'Polecenie zostało utworzone, użyj `/%n`, aby wykonać.',
	alreadyExists: 'Polecenie już istnieje.',
	ticket: {
		sus: 'Udało się!',
		already: 'Zgłoszenie zostało już utworzone.',
		await: 'Zaczekaj, aż jedna z osób odpowie na Twoje zgłoszenie.',
		created: 'Twoje zgłoszenie zostało utworzone.',
		delete: 'Twoje zgłoszenie zostało zamknięte i zostanie usunięte za 10 sekund.',
		create: 'Aby utworzyć zgłoszenie, naciśnij na poniższy przycisk,',
		labels: {
			delete: 'Zamknij',
			create: 'Utwórz zgłoszenie'
		}
	},
	logs: {
		oldMessage: 'Starsza wiadomość:',
		newMessage: 'Nowa wiadomość:',
		deleted: 'Wiadomość usunięta:',
		channel: 'Kanał:',
		url: 'Odnośnik:',
		message: { title: 'Rejestr wiadomości' },
		bans: { title: 'Rejestr banów' },
		user: 'Użytkownik:',
		reason: 'Powód:',
		mod: 'Moderator:',
		bani: 'Zbanowano',
		unbani: 'Odbanowano',
		jump: 'Przejdź do wiadomości',
		set: 'Kanał ustawiony na `%c`'
	},
	aki: {
		reg: 'pt',
		q: 'Pytanie:',
		r: 'Odpowiedzi:',
		i: 'Uruchamianie Akinator',
		is: 'Czy to Twoja postać?',
		win: 'Świetnie! Znów zgadłem.',
		nowin: 'Ah, gratuluję Ci',
		yay: 'Świetnie się z Tobą grało!',
		res: '[yes (**y**) / no (**n**)]'
	},
	labels: {
		recalc: 'Recalculate',
		unban: 'Desbanir',
		buy: 'Kup',
		load: 'Wczytaj'
	},
	guess: {
		start: 'Gra zostanie rozpoczęta za **5 sekund** z liczbą z przedziału od `%min` do `%max`.',
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
		hello: 'Witaj %user!',
		about: 'Jestem wielofunkcyjnym botem dla Discorda!',
		help: 'Aby poznać moje polecenia, wpisz **/help**.',
		labels: {
			support: 'Serwer wsparcia',
			invite: 'Zaproś',
			website: 'Strona WWW'
		}
	},
	reactionRole: {
		invalidMessage: 'Nie znaleziono wiadomości o ID `%id%`',
		sucess: 'ReactionRole created successfully!'
	},
	eventLog: {
		fields: {
			deletedMessage: 'Usunięta wiadomość:',
			oldMessage: 'Old Message:',
			newMessage: 'New Message:'
		},
		channel: 'Kanał:'
	},
	docs: { args: 'Say what will be searched for in the documentation.' },
	fnshop: {
		args: 'Include the channel ID that will be sent to the fortnite store.',
		channel: 'I don\'t have permission to send messages on the mentioned channel.',
		sucess: 'Channel set successfully!'
	},
	message: {
		mod: 'This command can only be used by my moderators!',
		P: 'Hello, human!',
		view: 'I don\'t have permission to read the message history!',
		the: 'The Command',
		unk: 'does not exist or cannot be run at the moment!',
		user: 'Nie posiadasz wszystkich wymaganych uprawnień do użycia tego polecenia!\nWymagane uprawnienia:',
		bot: 'Nie posiadam wszystkich wymaganych uprawnień do uruchomienia tego polecenia!\nWymagane uprawnienia:',
		dev: 'Tylko moi programiści mogą używać tego polecenia!',
		c: 'Zaczekaj %t sekund przed użyciem kolejnego polecenia.',
		e: 'Ups, wystąpił błąd!',
		e2: 'Zgłoś ten błąd!',
		e3: 'My team probably already knows about this error, but how about you help? You can open an [issue](https://github.com/zulybot/zuly/issues) in [github](https://github.com/zulybot/zuly) or report it to my [support server](https://discord.gg/pyyyJpw5QW), let\'s make the discord a better place, together 🤝',
		nsfw: 'Tego polecenia można użyć tylko na kanałach z treściami dla dorosłych'
	},
	host: {
		db: 'Eu utilizo [MongoDB](https://mongodb.com) para meu banco de dados, hospedados em maquinas da <:zu_azure:880536844473880617> [Azure](https://azure.microsoft.com).',
		vps: 'Eu sou hospedada na VPS, utilizando maquinas da [OVH](https://ovh.com), com sistema operacional <:zu_ubuntu:880496793740255253> Ubuntu.'
	},
	giveaway: {
		sec: 'sekundy',
		min: 'minuty',
		hrs: 'godziny',
		day: 'dni',
		term: 'Ended at',
		host: 'Hosted by: {user}',
		win: 'zwycięzca/y',
		wins: 'Congratulations, {winners}! You won **{this.prize}**!\n{this.messageURL}',
		react: 'react with 🎁 to participate!',
		restante: 'Pozostały czas:',
		no: 'Rozdanie anulowane z powodu braku uczestników',
		give: 'ROZDANIE',
		giveend: 'ROZDANIE ZAKOŃCZONE',
		start: 'You did not use the command correctly, use: `%pgiveaway [time (10s, 10m)] [winners (1, 1w)] [prize (photos of kittens)]`, do not include **[]** or **()**.',
		end: 'You didn\'t use the command correctly, use: `%pgiveaway-end [message id]`',
		reroll: 'You didn\'t use the command correctly, use: `%pgiveaway-reroll [message id]`',
		novo: 'New winner(s): {winners}! Congratulations, you won **{this.prize}**\n{this.messageURL}',
		err: 'No valid participations, no new winner(s) can be chosen!'
	},
	help: {
		title: 'Lista poleceń • ',
		creators: 'Stworzyli mnie ',
		description: '> My current prefix is: `%p`\n> If you have any questions, please enter my support server: [Click here](https://discord.gg/pyyyJpw5QW)\n> Add me by clicking [here](https://discord.com/oauth2/authorize?client_id=880173509077266483&scope=bot&permissions=805432446)',
		nsfw: 'You need to be on an NSFW channel to see nsfw commands. '
	},
	calc: {
		ex: 'Ams missing, use, `%pcalc <expression>`',
		inv: 'Invalid expression.',
		res: 'Result'
	},
	botinfo: {
		texto: 'Hi, I\'m **%bot**, a bot with unique features that every server needs! I currently know **%u different people** who use my features and I\'m on **%g different servers**.\n\nI\'m developed by `%devs` using [Eris](https://abal.moe/Eris/) using [Javascript](https://developer.mozilla.org/en-US/docs/Web/JavaScript) & [ NodeJS](https://nodejs.org/en/)',
		recursos: 'Resources:',
		mem: 'this server is using %m of my memory.'
	},
	messages: {
		tem: 'has',
		msg: 'messages',
		title: 'Messages'
	},
	together: {
		channel: 'You must be on a voice channel to execute this command.',
		done: 'Just click on the link and you will be redirected to the activity:',
		done2: '**(only works on computer)**'
	},
	erela: {
		np: 'Playing now',
		end: 'The song is over, I\'m leaving',
		skip: 'The song was successfully skipped.',
		not: 'I\'m not playing anything on the server.',
		voice: 'I was alone on the voice channel, I\'m leaving!',
		duration: 'Duration:',
		loop: {
			ativado: 'Current Song Loop has been enabled.',
			desativado: 'Current Song Loop has been turned off.'
		}
	},
	play: {
		nada: 'Arguments are missing, use `%pplay <music | url>`',
		add: 'Added to queue',
		can: 'Należy dołączyć do kanału głosowego, aby słuchać muzyki.'
	},
	waifu: {
		casar: 'React with 💖 to get married',
		casou: 'You married with %w',
		dono: 'Owner',
		utl: 'Utilize: %pwaifu-info [ID]',
		casado: 'Have you recently got married, you can get married every 2 hours',
		noharem: 'You don\'t have waifus, use `%pwaifu roll` to add one.',
		battle: 'Battle of Waifus',
		battleDesc: '**%u** is looking for a partner for a waifus duel, who will face it?',
		label: 'Me!',
		yms: 'You cannot battle with yourself.',
		bat: '%u, you will battle %2u, you have 30 seconds to choose a waifu (player found in `%t`).',
		select: 'Nic nie wybrano.'
	},
	tradutor: {
		lang: 'Należy określić język, przykład: %translator **en** Oi',
		text: 'Należy wpisać tekst, przykład: %translator en  **Oi** '
	},
	invite: {
		add: 'Dodaj mnie do swojego serwera!',
		desc: 'Yay, did you like my commands? Or my features? [Add me](https://discord.com/oauth2/authorize?client_id=719524114536333342&scope=bot%20applications.commands&permissions=805432446)\n\nYou need Help or something? Log into my [support server](https://discord.gg/pyyyJpw5QW), yay'
	},
	ban: {
		noarg: '**Mention** some user or give the **ID** of the same.',
		vc: 'You really want to punish',
		r: '✅',
		r2: '✅',
		mot: 'Not Defined',
		mot2: 'Punished for:',
		mot3: 'Powód:',
		the: 'Użytkownik',
		foi: 'został ukarany.',
		dev: 'Nie możesz ukarać programisty bota.'
	},
	clear: {
		msg: 'messages** cleared successfully',
		no: 'Enter the amount of messages to be cleaned',
		p: 'Looking for messages, this could take 30 seconds...',
		num: 'I can only clear between 2 to 100 messages'
	},
	baninfo: {
		user: 'Użytkownik:',
		reason: 'Powód:',
		noreason: 'Brak powodu.',
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
		badges: 'Badges of:',
		id: 'ID of: ',
		create: 'Account created day: '
	},
	slash: 'due to some compatibility issues, I was completely switched to **Slash Commands**, if the commands don\'t appear, add me again by clicking here: [add](https://zulybot.xyz/add), it is not necessary to remove the bot for this and if the commands have not yet updated on your server, it can take up to an hour for them to update on all servers, due to discord.',
	avatar: {
		title: 'Avatar from:',
		download: 'Download link:',
		hex: 'Hex to use in your profile:',
		click: 'Click Here'
	},
	perfil: {
		ngm: 'NOBODY',
		desc: 'Zuly is my friend, did you know that you can change this using "%paboutme"?',
		comp: 'Click on **button** to buy',
		succ: 'Background purchased successfully',
		sep: 'Background set successfully',
		no: 'You don\'t have enough money to buy this background'
	},
	filters: {
		ativado: 'The filter %f has been successfully enabled.',
		desativado: 'Filter %f was successfully disabled.'
	},
	economy: {
		carteira: 'Wallet:',
		banco: 'Bank:',
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