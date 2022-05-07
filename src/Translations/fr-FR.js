module.exports = {
	lang: 'fr',
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
			confirm: 'Do you want to load the backup? Please be aware that all your settings will be overwritten by the backup, **messages, positions & channels** will not be recovered after this process.\n> To load react with `✅`.'
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
		title: 'Vous êtes banni!',
		description: '↳ Vous avez été interdit d\'utiliser `%z` par : `%r`\n> <:zu_info:911303533859590144> Vous pouvez faire appel sur notre [serveur d\'assistance](https://discord.gg/pyyyJpw5QW).'
	},
	customCommand: 'La commande a été créée avec succès, utilisez `/%n` pour l\'exécuter.',
	alreadyExists: 'La commande existe déjà.',
	ticket: {
		sus: 'Succès!',
		already: 'Désolé, vous avez déjà un billet.',
		await: 'Attendez que l\'un des préposés vous réponde.',
		created: 'Votre billet a été créé.',
		delete: 'Votre ticket a été clôturé et sera supprimé dans 10 secondes.',
		create: 'Pour créer un ticket cliquez sur le bouton ci-dessous,',
		labels: {
			delete: 'Fermer',
			create: 'Ticket Ouvert'
		}
	},
	logs: {
		oldMessage: 'Ancien message:',
		newMessage: 'Nouveau message:',
		deleted: 'Message supprimé:',
		channel: 'Canaliser:',
		url: 'Lien:',
		message: { title: 'Journaux des messages' },
		bans: { title: 'Ban Logs' },
		user: 'User:',
		reason: 'Reason:',
		mod: 'Moderator:',
		bani: 'Banned',
		unbani: 'Unbanned',
		jump: 'Aller au message',
		set: 'Chaîne définie sur `%c`'
	},
	aki: {
		reg: 'fr',
		q: 'Question:',
		r: 'Réponses:',
		i: 'Démarrer Akinator',
		is: 'Est-ce votre personnage ?',
		win: 'Super! J\'ai bien compris une fois de plus.',
		nowin: 'Euh, tu as gagné',
		yay: 'J\'ai adoré jouer avec toi!',
		res: '[oui (**y**) / non (**n**)]'
	},
	labels: {
		recalc: 'Recalculer',
		unban: 'Desbanir'
	},
	guess: {
		start: 'Le jeu commencera dans **5 secondes** avec un nombre compris entre `%min` et `%max`.',
		started: 'C\'est commencé !',
		number: 'Le nombre choisi était `%num`, les utilisateurs doivent le deviner pour gagner l\'événement.',
		win: 'Vous avez bien compris! Le nombre choisi était `%num`!'
	},
	lockdown: {
		pass: 'Pour démarrer le verrouillage, envoyez `verrouiller` dans le chat.\n> ⚠️ Si vous souhaitez annuler, envoyez autre chose en chat.',
		cancel: 'Le confinement a été annulé avec succès.',
		success: 'Le verrouillage a été exécuté avec succès.',
		locking: 'Le confinement est en cours.',
		noCanal: 'Aucune chaîne n\'a été verrouillée.'
	},
	print: { website: 'Imprimer depuis le site Web:' },
	mention: {
		hello: 'Bonjour %utilisateur!',
		about: 'Je suis un bot multifonctionnel pour Discord !',
		help: 'Pour connaître mes commandes, tapez **/help**.',
		labels: {
			support: 'Serveur d\'assistance',
			invite: 'Inviter',
			website: 'Site Internet'
		}
	},
	reactionRole: {
		invalidMessage: 'Impossible de trouver le message avec l\'identifiant `%id%`',
		sucess: 'ReactionRole créé avec succès !'
	},
	eventLog: {
		fields: {
			deletedMessage: 'Message supprimé :',
			oldMessage: 'Ancien message:',
			newMessage: 'Nouveau message:'
		},
		channel: 'Canaliser:'
	},
	docs: { args: 'Dites ce qui sera recherché dans la documentation.' },
	fnshop: {
		args: 'Inclure l\'ID du canal qui sera envoyé au magasin fortnite.',
		channel: 'Je n\'ai pas la permission d\'envoyer des messages sur le canal mentionné.',
		sucess: 'Chaîne définie avec succès !'
	},
	message: {
		mod: 'This command can only be used by my moderators!',
		P: 'Bonjour, humain!',
		view: 'Je n\'ai pas la permission de lire l\'historique des messages !',
		the: 'La Commande',
		unk: 'n\'existe pas ou ne peut pas être exécuté pour le moment!',
		user: 'Você não tem todas as permissões necessárias para usar este comando!\nPermissões necessárias:',
		bot: 'Eu não tenho todas as permissões necessárias para executar este comando! \n Permissões necessárias:',
		dev: 'Apenas meus desenvolvedores podem usar este comando!',
		c: 'Aguarde %t segundos para usar outro comando.',
		e: 'Ops, ocorreu um erro!',
		e2: 'Reporte este erro!',
		e3: 'Mon équipe est probablement déjà au courant de cette erreur, mais qu\'en est-il de votre aide ? Vous pouvez ouvrir un [issue](https://github.com/zulybot/zuly/issues) dans [github](https://github. om/zulybot/zuly) ou rapportez-le à mon [serveur de support](https://discord.gg/pyyyJpw5QW), faisons de la discord un meilleur endroit, ensemble 🤝',
		nsfw: 'Cette commande ne peut être utilisée que sur les salons nsfw'
	},
	host: {
		db: 'Nous avons utilisé [MongoDB](https://mongodb.com) pour meu banco de dados, hospedados em maquinas da <:zu_azure:880536844473880617> [Azure](https://azure.microsoft.com).',
		vps: 'Il est hébergé sur un VPS, utilise des machines de [OVH](https://ovh.com), avec le système opérationnel <:zu_ubuntu:880496793740255253> Ubuntu.'
	},
	giveaway: {
		sec: 'secondes',
		min: 'minutes',
		hrs: 'heures',
		day: 'Jours',
		term: 'Terminé à',
		host: 'Hébergé par: {user}',
		win: 'gagnant(s)',
		wins: 'Congratulations, {winners}! You won **{this.prize}**!\n{this.messageURL}',
		react: 'react with 🎁 to participate!',
		restante: 'Temps restant:',
		no: 'Giveawy annulé, aucune participation valide.',
		give: 'DONNÉE',
		giveend: 'DONNÉE TERMINÉ',
		start: 'Vous n\'avez pas utilisé la commande correctement, utilisez : `%pgiveaway [temps (10s, 10m)] [gagnants (1, 1w)] [prix (photos de chats)]`, n\'incluez pas **[]** ou **()**.',
		end: 'Você não usou o comando corretamente, utilize: `%pgiveaway-end [id da mensagem]`',
		reroll: 'Vous n\'avez pas utilisé la commande correctement, utilisez : `%pgiveaway-reroll [id du message]`',
		novo: 'New winner(s): {winners}! Congratulations, you won **{this.prize}**\n{this.messageURL}',
		err: 'Aucune participation valide, aucun nouveau gagnant ne peut être choisi!'
	},
	help: {
		title: 'Liste de commandes • ',
		creators: 'J\'ai été développé par ',
		description: '> Mon préfixe actuel est : `%p`\n> Si vous avez des questions, veuillez entrer mon serveur de support : [Cliquez ici](https://discord. g/pyyyJpw5QW)\n> Ajoutez-moi en cliquant sur [here](https://discord.com/oauth2/authorize?client_id=880173509077266483&scope=bot&permissions=805432446)',
		nsfw: 'Vous devez être sur un canal NSFW pour voir les commandes nsfw. '
	},
	calc: {
		ex: 'Ams manquant, utiliser, `%pcalc <expression>`',
		inv: 'Expressão invalida.',
		res: 'Résultats'
	},
	botinfo: {
		texto: 'Hi, I\'m **%bot**, a bot with unique features that every server needs! I currently know **%u different people** who use my features and I\'m on **%g different servers**.\n\nI\'m developed by `%devs` using [Eris](https://abal.moe/Eris/) using [Javascript](https://developer.mozilla.org/en-US/docs/Web/JavaScript) & [ NodeJS](https://nodejs.org/en/)',
		recursos: 'Ressources:',
		mem: 'this server is using %m of my memory.'
	},
	messages: {
		tem: 'a',
		msg: 'messages',
		title: 'Messages'
	},
	together: {
		channel: 'Vous devez être sur un salon vocal pour exécuter cette commande.',
		done: 'Cliquez simplement sur le lien et vous serez redirigé vers l\'activité:',
		done2: '**(ne fonctionne que sur ordinateur)**'
	},
	erela: {
		np: 'En cours de lecture',
		end: 'A música acabou, estou saindo',
		skip: 'La chanson a été ignorée avec succès.',
		not: 'Je ne joue rien sur le serveur.',
		voice: 'J\'étais seul sur le canal vocal, je pars !',
		duration: 'Durée :',
		loop: {
			ativado: 'La boucle actuelle de la chanson a été activée.',
			desativado: 'La boucle actuelle de musique a été désactivée.'
		}
	},
	play: {
		nada: 'Les arguments sont manquants, utilisez `%pplay <music | url>`',
		add: 'Ajouter à la file d\'attente',
		can: 'Vous devez être sur un salon vocal pour écouter de la musique.'
	},
	waifu: {
		casar: 'Réagissez avec 💖 pour vous marier',
		casou: 'Vous vous êtes marié avec %w',
		dono: 'Propriétaire',
		utl: 'Utilisation: %pwaifu-info [ID]',
		casado: 'Avez vous récemment marié, vous pouvez vous marier toutes les 2 heures',
		noharem: 'You don\'t have waifus, use `%pwaifu roll` to add one.',
		battle: 'Battle of Waifus',
		battleDesc: '**%u** is looking for a partner for a waifus duel, who will face it?',
		label: 'Me!',
		yms: 'You cannot battle with yourself.',
		bat: '%u, you will battle %2u, you have 30 seconds to choose a waifu (player found in `%t`).',
		select: 'Nothing Selected.'
	},
	tradutor: {
		lang: 'Vous devez spécifier la langue, exemple : %translator **fr** hello',
		text: 'Vous devez spécifier la langue, exemple : %translator **fr** hello** '
	},
	invite: {
		add: 'Invite-moi sur ton serveur!',
		desc: 'Yay, avez-vous aimé mes commandes ? Ou mes fonctionnalités ? [Ajoutez-moi](https://discord.com/oauth2/authorize?client_id=719524114536333342&scope=bot%20applications.commands&permissions=805432446)\n\nVous avez besoin d\'aide ou quelque chose ? Connectez-vous à mon [serveur de support](https://discord.gg/pyyyJpw5QW), yay'
	},
	ban: {
		noarg: '**Mention** un utilisateur ou donnez l\'**ID** du même.',
		vc: 'Voulez-vous vraiment supprimer',
		r: '✅',
		r2: '✅',
		mot: 'Non défini',
		mot2: 'Pensé pour:',
		mot3: 'Raison:',
		the: 'L\'utilisateur(trice)',
		foi: 'a été punie avec succès.',
		dev: 'Vous ne pouvez pas punir le développeur du bot.'
	},
	clear: {
		msg: 'entrées effacées avec succès',
		no: 'Entrez le nombre de messages à nettoyer',
		p: 'Recherche de messages, cela peut prendre 30 secondes...',
		num: 'I can only clear between 2 to 100 messages'
	},
	baninfo: {
		user: 'Utilisateur:',
		reason: 'Raison:',
		desban: 'Pour dé-bannir réagissent avec 🐹.'
	},
	multiLang: {
		unknownLanguage: 'Langue inconnue.\n<:zu_info:880812942713573396> Langues disponibles : %langs',
		insertLang: 'Vous n\'avez pas spécifié de langue. Pour changer la langue du bot, exécutez `%plangue %langs`'
	},
	autorole: {
		insertRole: 'Vous n\'avez pas spécifié de rôle, utilisez: `%pautorole <@role | id de rôle | disable>.`',
		success: 'Ok, maintenant les membres qui rejoignent le serveur auront le message `%cargo` automatiquement ajouté.',
		disabled: 'Le profile a été correctement mis à jour.',
		noset: 'Valeur non définie',
		bot: 'Mentionnez les rôles qui seront donnés quand un BOT entre dans le serveur.',
		botset: 'Les bots Autorole ont été configurés sur les rôles :',
		user: 'Mentionnez les rôles qui seront donnés quand un utilisateur entre sur le serveur.',
		userset: 'L\'utilisateur Autorole a été défini pour les rôles :',
		mem: 'Membres',
		del: 'Désactiver',
		del2: 'Réagir avec ❌ pour désactiver/supprimer'
	},
	userinfo: {
		inf: 'Informations :',
		tag: 'Étiquette de : ',
		badges: 'Insignes de :',
		id: 'Identifiant de : ',
		create: 'Compte créé dans: '
	},
	slash: 'en raison de problèmes de compatibilité, j\'ai été complètement passé à **Commandes Slash**, si les commandes n\'apparaissent pas, ajoutez-moi en cliquant ici : [add](https://zulybot. yz/add), il n\'est pas nécessaire de supprimer le bot pour cela et si les commandes n\'ont pas encore été mises à jour sur votre serveur, il peut prendre jusqu\'à une heure pour les mettre à jour sur tous les serveurs, en raison de la discord.',
	avatar: {
		title: 'Avatar depuis:',
		download: 'Lien de téléchargement :',
		hex: 'Hex à utiliser dans votre profil :',
		click: 'Cliquez ici'
	},
	perfil: {
		ngm: 'NON-BODY',
		desc: 'C\'est vraiment mon ami, saviez-vous que vous pouvez changer cela en utilisant "%paboutme " ?',
		comp: 'Cliquez sur `🛒` pour acheter',
		succ: 'Fond d\'écran acheté avec succès',
		sep: 'Background set successfully',
		no: 'Vous n\'avez pas assez d\'argent pour acheter ce fond d\'écran'
	},
	filters: {
		ativado: 'Le filtre %f a été activé avec succès.',
		desativado: 'Le filtre %f a été désactivé avec succès.'
	},
	economy: {
		carteira: 'Wallet:',
		banco: 'Bank:',
		jacoletou: 'Vous avez déjà collecté votre récompense quotidienne aujourd\'hui! Réessayez sur:',
		recebeu: 'Vous avez reçu:',
		noarg: 'Il y a des arguments manquants, utilisez: `%presgate <code>.`',
		resgatado: 'Vous avez déjà utilisé ce code.',
		nocode: 'Ce guide n\'existe pas.',
		sucesso: 'Vous avez racheté le code promotionnel **%p** et gagné **%v ryos** 🥳'
	},
	sobre: {
		nada: 'J\'ai besoin d\'un argument, utilisez: `%poverim <text>`',
		alt: 'A propos de changé en : `%t`'
	},
	nsfw: {
		activated: 'Système activé avec succès !',
		disabled: 'Système désactivé avec succès !',
		nonsfw: 'N\'envoyez pas de contenu NSFW en dehors des canaux NSFW.'
	}
};