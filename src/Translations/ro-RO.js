module.exports = {
	lang: 'ro',
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
	docs: { args: 'Spuneți ce se va căuta în documentație.' },
	fnshop: {
		args: 'Include ID-ul canalului care va fi trimis la magazinul fortnite.',
		channel: 'Nu am permisiunea de a trimite mesaje pe canalul menționat.',
		sucess: 'Canalul setat cu succes!'
	},
	labels: {
		add: 'Adaugă-mă!',
		support: 'Server de suport!',
		vote: 'Votați pentru mine!'
	},
	message: {
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
		wins: 'Felicitări, {winners}! Ai câștigat **{prize}**!\n{messageURL}',
		addReaction: 'adauga reactie cu :wrapped_cadft: pentru a participa!',
		restante: 'Timpul rămas',
		no: 'Giveaway a fost anulat, nicio participare valabilă',
		give: 'GIVEWAY',
		giveend: 'GIVEAWAY FINALIZAT',
		start: 'Nu ai folosit comanda corect, utilizează:%pgiveaway [timp (10), 10m)] [câștigători (1, 1w)] [premiu (fotografii de pisici)]", nu include **[]** sau **()**.',
		end: 'Nu ai folosit comanda corect, foloseşte:%pgiveaway-end [message id]`',
		reroll: 'Nu ai folosit comanda corect, foloseşte:%pgiveaway-reroll [message id]`',
		novo: 'Câștigători noi: {winners}! Felicitări, ai câștigat **{prize}**\n{messageURL}',
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
		texto: 'Bună, sunt %bot, un bot cu caracteristici unice de care are nevoie fiecare server! În prezent știu **%u persoane diferite** care folosesc caracteristicile mele și sunt pe **%g servere diferite**.\n\nSunt dezvoltat de către `%devs` folosind [Eris](https://abal.moe/Eris/) folosind [Javascript](https://developer.mozilla.org/en-US/docs/Web/JavaScript) & [ NodeJS](https://nodejs.org/en/)',
		recursos: 'Resources:'
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
		not: 'Nu cânt nimic pe server.',
		voice: 'Eram singur pe canalul vocal, asadar am iesit!',
		duration: 'Durată:',
		loop: {
			ativado: 'Current Song Loop has been enabled.',
			desativado: 'Current Song Loop has been turned off.'
		}
	},
	play: {
		nada: 'Arguments are missing, use `%pplay <music | url>`',
		add: 'Adăugare la coadă',
		can: 'Trebuie să fii pe un canal de voce pentru a asculta muzica.'
	},
	waifu: {
		casar: 'Reactează cu 💖 pentru a te căsători',
		casou: 'Te-ai căsătorit cu %w',
		dono: 'Proprietar',
		utl: 'Utilizează: %pwaifu-info [ID]',
		casado: 'Ai fost căsătorit recent, te poți căsători la fiecare 2 ore'
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
		foi: 'a fost pedepsit cu succes.'
	},
	clear: {
		msg: 'mesaje** șterse cu succes',
		no: 'Introduceți numărul de mesaje ce vor fi curățate',
		p: 'Căutând mesaje, ar putea dura 30 de secunde...',
		num: 'Nu pot decât să sterg între 2 și 2000 de mesaje'
	},
	baninfo: {
		user: 'Utilizator:',
		reason: 'Motivul:',
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
		id: 'ID-ul lui: ',
		create: 'Contul a fost creat: '
	},
	slash: 'din cauza unor probleme de compatibilitate, am trecut complet la **comenzi slash**, dacă comenzile nu apar, adaugă-mă din nou făcând clic aici: [add](https://zulybot.xyz/add), nu este necesar să ștergi botul pentru acest lucru și dacă comenzile nu au fost încă actualizate pe server, poate dura până la o oră pentru ca ei să se actualizeze pe toate serverele, din cauza discordului.',
	avatar: {
		title: 'Poza de proful a lui:',
		download: 'Link de descărcare:',
		click: 'Click aici'
	},
	perfil: {
		ngm: 'NIMENI',
		desc: 'Zuly este prietenul meu, știai că poți schimba acest lucru folosind "%paboutme"?',
		comp: 'Dă click pe `🛒` pentru a cumpăra',
		succ: 'Fundal cumparat cu succes',
		no: 'Nu ai suficienți bani pentru a cumpăra acest fundal'
	},
	filtros: {
		ativado: 'Filtrul %f a fost activat cu succes.',
		desativado: 'Filtrul %f a fost dezactivat cu succes.'
	},
	economy: {
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