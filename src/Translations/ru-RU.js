module.exports = {
	lang: 'pt',
	labels: {
		add: 'Me Adicione!',
		support: 'Servidor de Suporte!',
		vote: 'Vote em mim!'
	},
	message: {
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
		e3: 'Моя команда, вероятно, уже знает об этой ошибке, но как насчет вашей помощи? Вы можете открыть [проблему] (https://github.com/zulybot/zuly/issues) на [github] (https://github.com/zulybot/zuly) или сообщить об этом на мой [сервер поддержки] (https://discord.gg/2pFH6Yy) давайте вместе сделаем Discord лучше 🤝',
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
		wins: 'Parabéns, {winners}! Você ganhou **{prize}**!\n{messageURL}',
		addReaction: 'Reaja com 🎁 para participar!',
		restante: 'Tempo Restante:',
		no: 'Sorteio cancelado, sem participações válidas',
		give: 'SORTEIO',
		giveend: 'SORTEIO ENCERRADO',
		start: 'Você não usou o comando corretamente, utilize: `%pgiveaway-start [tempo(10s, 10m)] [ganhadores(1, 1w)] [prêmio(fotos de gatinhos)]`, não inclua **[]** ou **()**.',
		end: 'Você não usou o comando corretamente, utilize: `%pgiveaway-end [id da mensagem]`',
		reroll: 'Você não usou o comando corretamente, utilize: `%pgiveaway-reroll [id da mensagem]`',
		novo: 'Novo ganhador(es): {winners}! Parabéns, vocês ganharam **{prize}**\n{messageURL}',
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
	botinfo: { texto: 'Olá, sou a %bot, um bot com funcionalidades únicas, que todo servidor precisa! Atualmente conheço **%u pessoas** diferentes que utilizam de minhas funcionalidades e estou em **%g servidores** diferentes.\n\nSou um projeto de [And.](https://github.com/andrelucaas) e [Dexy](https://github.com/eiandremoreira) desenvolvida em [Eris](https://abal.moe/Eris/) utilizando [Javascript](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript) & [NodeJS](https://nodejs.org/en/)' },
	messages: {
		tem: 'tem',
		msg: 'mensagens',
		title: 'Mensagens'
	},
	print: { web: 'Faltou o website' },
	mention: { response: 'Olá **%u**, veja meus comandos usando `star ajuda` ou `s!ajuda`' },
	together: {
		channel: 'Você precisa estar em um canal de voz para executar este comando.',
		done: 'Basta clicar no link e você será redirecionado para a atividade:',
		done2: '**(só funciona no computador)**'
	},
	erela: {
		np: 'Tocando agora',
		end: 'A música acabou, estou saindo',
		not: 'Não estou tocando nada no servidor.'
	},
	play: {
		nothing: 'Arguments are missing, use `%pplay <music | url>`',
		add: 'Adicionado a fila',
		can: 'Você precisa estar em um canal de voz para ouvir música.'
	},
	waifu: {
		casar: 'Reaja com 💖 para se casar',
		casou: 'Você se casou com %w',
		dono: 'Dono',
		utl: 'Utilize: %pwaifu-info [ID]',
		casado: 'Você já casou recentemente, você pode casar a cada 2 horas'
	},
	tradutor: {
		lang: 'Você precisa especificar a linguagem, examplo: %translator **en** Oi',
		text: 'Você precisa especificar o texto, examplo: %translator en  **Oi** '
	},
	invite: {
		add: 'Me Adicione ao seu servidor!',
		desc: 'Yay, gostou de meus comandos? Ou de minhas funcionalidades? Me [adicione](https://discord.com/oauth2/authorize?client_id=%id&scope=bot%20applications.commands&permissions=805432446)\n\nPrecisa de ajuda ou algo do tipo? Entre em meu [servidor de suporte](https://discord.gg/pyyyJpw5QW), yay'
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
		foi: 'foi punido com sucesso.'
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
		id: 'ID de:',
		create: 'Conta criada dia:'
	},
	slash: 'devido a alguns problemas de compatibilidade, mudei completamente para **Comandos Slash**, se os comandos não aparecerem, adicione-me novamente clicando aqui: [adicionar](https://zulybot.xyz/add), não é necessário remover o bot, caso os comandos ainda não foram atualizados em seu servidor, pode levar até uma hora para que sejam atualizados em todos os servidores, devido ao discord.',
	avatar: {
		title: 'Avatar de:',
		download: 'Link para download:',
		click: 'Clique Aqui'
	},
	perfil: {
		ngm: 'NINGUÉM',
		desc: 'A Zuly é minha amiga, sabia que você pode alterar isso usando "%psobremim"?',
		comp: 'Clique no `🛒` para comprar',
		succ: 'Background comprado com sucesso',
		no: 'Você não tem dinheiro suficiente para comprar este background'
	},
	filtros: {
		ativado: 'O Filtro %f foi ativado com sucesso.',
		desativado: 'O Filtro %f foi desativado com sucesso.'
	},
	economy: {
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