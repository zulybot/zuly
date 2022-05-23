module.exports = {
	lang: 'ro',
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
	dashboard: 'Configurația bot-ului a fost migrată pe panel, accesați acest link: https://zulybot.xyz/dashboard/%g',
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
			support: 'Server de asistență',
			invite: 'Invită',
			website: 'Website'
		}
	},
	reactionRole: {
		invalidMessage: 'Nu s-a putut găsi mesajul cu id-ul `%id%`',
		sucess: 'Categoria a fost creata.'
	},
	eventLog: {
		fields: {
			deletedMessage: 'Mesaje șterse:',
			oldMessage: 'Mesaje vechi:',
			newMessage: 'Mesaje noi:'
		},
		channel: 'Canal:'
	},
	docs: { args: 'Spuneți ce se va căuta în documentație.' },
	fnshop: {
		args: 'Include ID-ul canalului care va fi trimis la magazinul fortnite.',
		channel: 'Nu am permisiunea de a trimite mesaje pe canalul menționat.',
		sucess: 'Canalul setat cu succes!'
	},
	message: {
		mod: 'This command can only be used by my moderators!',
		P: 'Bună, omule!',
		view: 'Nu am permisiunea să citesc istoria mesajelor!',
		the: 'Comanda',
		unk: 'nu există sau nu poate fi rulat în acest moment!',
		user: 'Nu ai toate permisiunile necesare pentru a utiliza această comandă!\nPermesiunile necesare:',
		bot: 'Nu am toate permisiunile necesare pentru a rula această comandă!\nPermisiunile necesare:',
		dev: 'Doar fondatorii mei pot folosi această comandă!',
		c: 'Așteptați %t secunde pentru a utiliza o altă comandă.',
		e: 'Oops, s-a produs o eroare!',
		e2: 'Raporteaza aceasta eroare!',
		e3: 'Echipa mea probabil ştie deja despre această eroare, dar ce zici de ajutor? Puteţi deschide un [issue](https://github.com/zulybot/zuly/issues) în [github](https://github. om/zulybot/zuly) sau raportați-l [serverului meu de suport](https://discord.gg/pyyJpw5QW), hai să facem discord-ul un loc mai bun, împreună :handshak:',
		nsfw: 'Această comandă poate fi utilizată numai pe canalele nsfw.'
	},
	host: {
		db: 'Baza de date folosita este [MongoDB](https://mongodb.com) si hostat pe servere de la <:zu_azure:880536844473880617> [Azure](https://azure.microsoft.com).',
		vps: 'Sunt hostat pe un VPS hostat de [OVH](https://ovh.com), sistemul operativ este <:zu_ubuntu:880496793740255253> Ubuntu.'
	},
	giveaway: {
		sec: 'secunde',
		min: 'minute',
		hrs: 'ore',
		day: 'zile',
		term: 'încheiat la',
		host: 'Găzduit de: {user}',
		win: 'câştigător(i)',
		wins: 'Felicitări, {winners}! Ai câștigat **{this.prize}**!\n{this.messageURL}',
		react: 'reacționează cu 🎁 pentru a participa!',
		restante: 'Timpul rămas',
		no: 'Giveaway a fost anulat, nicio participare valabilă',
		give: 'GIVEWAY',
		giveend: 'GIVEAWAY FINALIZAT',
		start: 'Nu ai folosit comanda corect, utilizează:%pgiveaway [timp (10), 10m)] [câștigători (1, 1w)] [premiu (fotografii de pisici)]", nu include **[]** sau **()**.',
		end: 'Nu ai folosit comanda corect, foloseşte:%pgiveaway-end [message id]`',
		reroll: 'Nu ai folosit comanda corect, foloseşte:%pgiveaway-reroll [message id]`',
		novo: 'Câștigători noi: {winners}! Felicitări, ai câștigat **{this.prize}**\n{this.messageURL}',
		err: 'Nu se pot alege nici o participare validă, nici un câștigător/câștigători noi!'
	},
	help: {
		title: 'Listă de comenzi • ',
		creators: 'Am fost dezvoltat de ',
		description: '> Prefixul meu actual este: `%p`\n> Dacă ai întrebări, te rog introdu serverul meu de suport: [Click aici](https://discord. g/pyyyJpw5QW)\n> Adaugă prin click pe [here](https://discord.com/oauth2/authorize?client_id=880173509077266483&scope=bot&permissions=805432446)',
		nsfw: 'Trebuie să fii pe un canal NSFW pentru a vedea comenzile nsfw. '
	},
	calc: {
		ex: 'Ams lipsește, folosiți, `%pcalc <expression>`',
		inv: 'Expresia nu este validă.',
		res: 'Rezultat'
	},
	botinfo: {
		texto: 'Salut, eu sunt **%bo**, un bot cu caracteristici unice de care are nevoie fiecare server! Cunosc în prezent **%u persoane diferite** care folosesc caracteristicile mele şi sunt pe **%g servere diferit**.\n\nSunt dezvoltat de `%devs` folosind [Eris](https://abal.moe/Eris/) folosind [Javascript](https://developer.mozilla.org/en-US/docs/Web/JavaScript) & [ NodeJS](https://nodejs.org/en/)',
		recursos: 'Resurse:',
		mem: 'acest server folosește %m din memoria mea.'
	},
	messages: {
		tem: 'are',
		msg: 'mesaje',
		title: 'Messages'
	},
	together: {
		channel: 'Trebuie să fii pe un canal de voce pentru a executa această comandă.',
		done: 'Doar apăsați pe link și veți fi redirecționat către activitate:',
		done2: '**(funcţionează doar pe calculator)**'
	},
	erela: {
		np: 'Canta acum',
		end: 'Cântecul s-a terminat, inchid redarea',
		skip: 'Melodia a fost omisă.',
		not: 'Nu cânt nimic pe server.',
		voice: 'Eram singur pe canalul vocal, asadar am iesit!',
		duration: 'Durată:',
		loop: {
			ativado: 'Bucla curentă a melodiilor a fost oprită.',
			desativado: 'Bucla curentă a melodiilor a fost oprită.'
		}
	},
	play: {
		nada: 'Argumentele lipsesc, folosește `%pplay <music | url>`',
		add: 'Adăugare la coadă',
		can: 'Trebuie să fii pe un canal de voce pentru a asculta muzica.'
	},
	waifu: {
		casar: 'Reactează cu 💖 pentru a te căsători',
		casou: 'Te-ai căsătorit cu %w',
		dono: 'Proprietar',
		utl: 'Utilizează: %pwaifu-info [ID]',
		casado: 'Ai fost căsătorit recent, te poți căsători la fiecare 2 ore',
		noharem: 'Nu aveți waifuri, folosiți "%pwaifu roll" pentru a adăuga unul.',
		battle: 'Battle of Waifus',
		battleDesc: '**%u** is looking for a partner for a waifus duel, who will face it?',
		label: 'Me!',
		yms: 'You cannot battle with yourself.',
		bat: '%u, you will battle %2u, you have 30 seconds to choose a waifu (player found in `%t`).',
		select: 'Nothing Selected.'
	},
	tradutor: {
		lang: 'Trebuie să specificați limba, exemplul: %translator **ro** buna',
		text: 'Trebuie să specificați limba, exemplul: %translator **ro** buna** '
	},
	invite: {
		add: 'Adaugă pe serverul tău!',
		desc: 'Yay, ți-a plăcut comenzile mele? Sau caracteristicile mele? [Adăugă-mă](https://discord.com/oauth2/authorize?client_id=719524114536333342&scope=bot%20applications.commands&permissions=805432446)\n\nAi nevoie de ajutor sau ceva? Autentifică-te pe [serverul meu de suport](https://discord.gg/pyyJpw5QW), yay'
	},
	ban: {
		noarg: '**Menționați** un utilizator sau dați **ID** aceluiași utilizator.',
		vc: 'Chiar vrei să pedepsești',
		r: '✅',
		r2: '✅',
		mot: 'Nedefinit',
		mot2: 'Pedepsit de:',
		mot3: 'Motivul:',
		the: 'Utilizatorul',
		foi: 'a fost pedepsit cu succes.',
		dev: 'Nu poți pedepsi dezvoltatorul botului.'
	},
	clear: {
		msg: 'mesaje** șterse cu succes',
		no: 'Introduceți numărul de mesaje ce vor fi curățate',
		p: 'Căutând mesaje, ar putea dura 30 de secunde...',
		num: 'I can only clear between 2 to 100 messages'
	},
	baninfo: {
		user: 'Utilizator:',
		reason: 'Motivul:',
		noreason: 'No reason.',
		desban: 'Pentru a scoate banul reacționează cu 🐹.'
	},
	multiLang: {
		unknownLanguage: 'Limbă necunoscută\n<:zu_info:880812942713573396> Limbi disponibile: %langs',
		insertLang: 'Nu ați specificat o limbă. Pentru a schimba limba botului, executați `%language %langs`'
	},
	autorole: {
		insertRole: 'Nu specificați un rol, utilizați: `%pautorole <@role | role id | disable>.`',
		success: 'Bine, acum membrii care se alătură serverului vor avea postarea `%cargo` automat adăugată.',
		disabled: 'Autorolul a fost dezactivat cu succes.',
		noset: 'Nesetat',
		bot: 'Menționați rolurile care vor fi date atunci când BOT va intra pe server.',
		botset: 'Autorolul a fost setat, roluri:',
		user: 'Menționați rolurile care vor fi date atunci când orice utilizator intră pe server.',
		userset: 'Autorolul a fost setat, roluri:',
		mem: 'Membrii',
		del: 'Dezactivat',
		del2: 'Reacție cu ❌ pentru dezactivare/ștergere'
	},
	userinfo: {
		inf: 'Informații:',
		tag: 'Etichetă de: ',
		badges: 'Insigne:',
		id: 'ID-ul lui: ',
		create: 'Contul a fost creat: '
	},
	slash: 'din cauza unor probleme de compatibilitate, am trecut complet la **comenzi slash**, dacă comenzile nu apar, adaugă-mă din nou făcând clic aici: [add](https://zulybot.xyz/add), nu este necesar să ștergi botul pentru acest lucru și dacă comenzile nu au fost încă actualizate pe server, poate dura până la o oră pentru ca ei să se actualizeze pe toate serverele, din cauza discordului.',
	avatar: {
		title: 'Poza de proful a lui:',
		download: 'Link de descărcare:',
		hex: 'Hex utilizat în profilul dvs.:',
		click: 'Click aici'
	},
	perfil: {
		ngm: 'NIMENI',
		desc: 'Zuly este prietenul meu, știai că poți schimba acest lucru folosind "%paboutme"?',
		comp: 'Click on **button** to buy',
		succ: 'Fundal cumparat cu succes',
		sep: 'Background set successfully',
		no: 'Nu ai suficienți bani pentru a cumpăra acest fundal'
	},
	filters: {
		ativado: 'Filtrul %f a fost activat cu succes.',
		desativado: 'Filtrul %f a fost dezactivat cu succes.'
	},
	economy: {
		carteira: 'Wallet:',
		banco: 'Bank:',
		jacoletou: 'Ai colectat deja recompensa zilnică astăzi! Încearcă din nou pe:',
		recebeu: 'Ai primit:',
		noarg: 'Există argumente lipsă, utilizați: `%presgate <code>.`',
		resgatado: 'Deja ai răscumpărat acest cod.',
		nocode: 'Acest cod nu există.',
		sucesso: 'Ai răscumpărat codul promoțional **%p** și ai câștigat** **%v secere**🥳'
	},
	sobre: {
		nada: 'Am nevoie de un argument, foloseşte: `%poverim <text>`',
		alt: 'Despre s-a schimbat la: `%t`'
	},
	nsfw: {
		activated: 'Sistem activat cu succes!',
		disabled: 'Sistem dezactivat cu succes!',
		nonsfw: 'Nu trimite conținut NSFW în afara canalelor NSFW.'
	}
};