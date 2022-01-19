module.exports = {
	lang: 'fr',
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
		wins: 'Félicitations, {winners}! Vous avez gagné **{prize}**!\n{messageURL}',
		addReaction: 'Réagissez avec 🎉 pour participer!',
		restante: 'Temps restant:',
		no: 'Giveawy annulé, aucune participation valide.',
		give: 'DONNÉE',
		giveend: 'DONNÉE TERMINÉ',
		start: 'Vous n\'avez pas utilisé la commande correctement, utilisez : `%pgiveaway [temps (10s, 10m)] [gagnants (1, 1w)] [prix (photos de chats)]`, n\'incluez pas **[]** ou **()**.',
		end: 'Você não usou o comando corretamente, utilize: `%pgiveaway-end [id da mensagem]`',
		reroll: 'Vous n\'avez pas utilisé la commande correctement, utilisez : `%pgiveaway-reroll [id du message]`',
		novo: 'Nouveau(x) gagnant(s) : {winners}! Félicitations, vous avez gagné **{prize}**\n{messageURL}',
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
		texto: 'Bonjour, je suis %bot, un bot avec des fonctionnalités uniques dont chaque serveur a besoin ! Je connais actuellement **%u personnes différentes ** qui utilisent mes fonctionnalités et je suis sur **%g serveurs différents ** .\n\nJe suis développé par `%devs` en utilisant [Eris](https://abal.moe/Eris/) en utilisant [Javascript](https://developer.mozilla.org/fr/docs/Web/JavaScript) & [ NodeJS](https://nodejs.org/fr/)',
		recursos: 'Ressources:'
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
		add: 'Ajouter à la file d\'attente',
		can: 'Vous devez être sur un salon vocal pour écouter de la musique.'
	},
	waifu: {
		casar: 'Réagissez avec 💖 pour vous marier',
		casou: 'Vous vous êtes marié avec %w',
		dono: 'Propriétaire',
		utl: 'Utilisation: %pwaifu-info [ID]',
		casado: 'Avez vous récemment marié, vous pouvez vous marier toutes les 2 heures'
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
		num: 'Eu só consigo limpar entre 2 a 2000 mensagens'
	},
	baninfo: {
		user: 'Usuário:',
		reason: 'Motivo',
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
		inf: 'Informações de:',
		tag: 'Tag de:',
		badges: 'Badges of:',
		id: 'ID de:',
		create: 'Conta criada dia:'
	},
	slash: 'devido a alguns problemas de compatibilidade, mudei completamente para **Comandos Slash**, se os comandos não aparecerem, adicione-me novamente clicando aqui: [adicionar](https://zulybot.xyz/add), não é necessário remover o bot, caso os comandos ainda não foram atualizados em seu servidor, pode levar até uma hora para que sejam atualizados em todos os servidores, devido ao discord.',
	avatar: {
		title: 'Avatar de:',
		download: 'Link para download:',
		hex: 'Hex to use in your profile:',
		click: 'Clique Aqui'
	},
	perfil: {
		ngm: 'NINGUÉM',
		desc: 'A Zuly é minha amiga, sabia que você pode alterar isso usando "%psobremim"?',
		comp: 'Clique no `🛒` para comprar',
		succ: 'Background comprado com sucesso',
		no: 'Você não tem dinheiro suficiente para comprar este background'
	},
	filters: {
		ativado: 'The filter %f has been successfully enabled.',
		desativado: 'Filter %f was successfully disabled.'
	},
	economy: {
		jacoletou: 'Você já coletou sua recompensa diária hoje! Tente novamente em:',
		recebeu: 'Você recebeu:',
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
		nonsfw: 'Não envie conteúdo NSFW fora de canais NSFW.'
	}
};