module.exports = {
	lang: 'fr',
	bateau: {
		nou: 'Mentionnez un utilisateur à expédier',
		d1 : 'Vous n\'êtes pas compatibles, vous êtes très différents les uns des autres 😔',
		d2: 'Vous pouvez être amis, mais je ne vois pas de meilleur avenir entre vous, vous vous ressemblez 🤝',
		j3 : 'Vous pouvez être en couple, les goûts sont quasiment les mêmes et vous vous connaissez beaucoup 👀',
		d4 : 'Vous êtes parfaits, faits l\'un pour l\'autre, allez-y, vous avez tout pour vous débrouiller ❤️'
	},
	dashboard: 'La configuration du bot a été migrée vers le tableau de bord, accédez à ce lien : https://zulybot.xyz/dashboard/%g',
	backup: {
		create: {
			success: 'Sauvegarde créée avec succès !\n⤷ ID : `%id`, temps de création : `%t`',
		},
		list: {
			noBackups: 'Vous n\'avez pas de sauvegardes.',
			backupList: 'Liste de sauvegarde :',
			backupID : 'ID : %id',
		},
		load: {
			success: 'Sauvegarde chargée avec succès !',
			error: 'Sauvegarde introuvable.',
			confirm: 'Voulez-vous charger la sauvegarde ? Sachez que tous vos paramètres seront remplacés par la sauvegarde, **messages, positions et canaux** ne seront pas récupérés après ce processus.\n> Pour charger, réagissez avec `✅`.',
		}
	},
	clusters: {
		desc: '> Ce serveur est dans le cluster `%id`\n- Nom : `%name`\n- Ping : `%ping`',
		field: 'Clusters d\'informations :',
		fielDesc: '- Cluster %id\n- Ping : %p\n- PingDB : %pd\n- Consommation : %ram'
	},
	gender: {
		title: 'Genre',
		desc: 'Bonjour %u, j\'aimerais mieux te connaître, qui es-tu ? Garçon? Fille? Ou ni l\'un ni l\'autre ? J\'ai besoin de savoir pour mieux adapter mes réponses !\n>>> - 🚹 Garçon\n- 🚺 Fille\n- 🚻 Ni',
		change: 'Le genre a été remplacé par `%g` avec succès !',
		male: 'garçon',
		female: 'fille'
	},
	anagramWords: ['étage', 'apprécier', 'reconnaître', 'avoir', 'annonce', 'télévision', 'trou', 'érudit', 'paquet',
		'résident', 'tirer', 'tragédie', 'coup d\'œil', 'compact', 'méchant', 'couteau', 'poursuite', 'pompe', 'biscuit', 'enchères', 'régal',
	 'attirer', 'employer', 'épave', 'incertitude', 'rumeur', 'formel', 'noble', 'plaisanterie', 'original', 'couverture', 'ballet', 'odeur',
	  'lien', 'réfléchir', 'fort', 'ignorant', 'pain', 'évanoui', 'verre', 'pièce', 'désordre', 'hall', 'matin', 'connexion',
	   'innocent', 'condamné', 'suggérer', 'film', 'minimum', 'cours', 'favorable', 'fente', 'record', 'torche', 'mineur', 'laitier',
		'remercier', 'stylo', 'attribution', 'qualifié', 'soeur', 'tour', 'esprit', 'protection', 'voir', 'transaction', 'harmonie',
		'précédent'],
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
		message: {
			title: 'Journaux des messages'
		},
		bans: {
			title: 'Bannir les journaux'
		},
		user: 'Utilisateur:',
		reason: 'Raison:',
		mod: 'Modérateur:',
		bani: 'Banni',
		unbani: 'Non Banni',
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
	labels: { recalc: 'Recalculer' },
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
		hello: 'Bonjour %user!',
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
		wins: 'Félicitations, {winners}! Vous avez gagné **{this.prize}**!\n{this.messageURL}',
		react: 'Réagissez avec 🎉 pour participer!',
		restante: 'Temps restant:',
		no: 'Giveawy annulé, aucune participation valide.',
		give: 'DONNÉE',
		giveend: 'DONNÉE TERMINÉ',
		start: 'Vous n\'avez pas utilisé la commande correctement, utilisez : `%pgiveaway [temps (10s, 10m)] [gagnants (1, 1w)] [prix (photos de chats)]`, n\'incluez pas **[]** ou **()**.',
		end: 'Você não usou o comando corretamente, utilize: `%pgiveaway-end [id da mensagem]`',
		reroll: 'Vous n\'avez pas utilisé la commande correctement, utilisez : `%pgiveaway-reroll [id du message]`',
		novo: 'Nouveau(x) gagnant(s) : {winners}! Félicitations, vous avez gagné **{this.prize}**\n{this.messageURL}',
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
		texto: 'Bonjour, je suis **%bot**, un bot avec des fonctionnalités uniques dont chaque serveur a besoin ! Je connais actuellement **%u personnes différentes ** qui utilisent mes fonctionnalités et je suis sur **%g serveurs différents ** .\n\nJe suis développé par `%devs` en utilisant [Eris](https://abal.moe/Eris/) en utilisant [Javascript](https://developer.mozilla.org/fr/docs/Web/JavaScript) & [ NodeJS](https://nodejs.org/fr/)',
		recursos: 'Ressources:',
		mem: 'ce serveur utilise %m de ma mémoire.',
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
		noharem: 'Vous n\'avez pas de waifus, utilisez `%pwaifu roll` pour en ajouter un.',
		battle: 'Bataille de Waifus',
		battleDesc: '**%u** cherche un partenaire pour un duel de waifus, qui l\'affrontera ?',
		label: 'Moi !',
		yms: 'Vous ne pouvez pas vous battre contre vous-même.',
		bat: '%u, vous combattrez %2u, vous avez 30 secondes pour choisir un waifu (jogador trouvé en `%t`).',
		select: 'Aucune sélection'
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
		num: 'Je ne peux clarifier qu\'entre 2 et 2000 messages'
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
		no: 'Vous n\'avez pas assez d\'argent pour acheter ce fond d\'écran'
	},
	filters: {
		ativado: 'Le filtre %f a été activé avec succès.',
		desativado: 'Le filtre %f a été désactivé avec succès.'
	},
	economy: {
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