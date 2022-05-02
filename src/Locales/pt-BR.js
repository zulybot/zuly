module.exports = {
	lang: 'pt',
	report: {
		p1: 'Está querendo denunciar algumas pessoas? Vieste ao lugar certo! Para realizar o report basta clicar no formulário!',
		id: 'ID do Formulário:',
		dm: 'Veja suas mensagens diretas!'
	},
	daily: {
		coletado: 'Você coletou **%m** diárias, volte amanhã e colete novamente.',
		coletou: 'Você já coletou sua recompensa diária, colete-a novamente em **%time**'
	},
	premium: 'Você descobriu uma funcionalidade premium, para ser um usuário premium entre em meu [servidor de suporte](<https://discord.gg/pyyyJpw5QW>)!',
	bola: {
		title: '🎱 Bola Mágica',
		field1: '**Pergunta:**',
		field2: '**Resposta:**',
	},
	ship: {
		nou: 'Mencione algum usuário para shippar',
		d1: 'Vocês não são compatíveis, são muito diferentes um do outro 😔',
		d2: 'Vocês podem ser amigos, mas não vejo um futuro melhor entre vocês, vocês são parecidos um com o outro 🤝',
		d3: 'Vocês podem ser um casal, os gostos são quase os mesmos e vocês se conhecem muito 👀',
		d4: 'São perfeitos, feitos um para o outro, vai em frente, vocês tem tudo para dar certo ❤️'
	},
	dashboard: 'A Configuração do bot foi migrada para o dashboard, acesse por esse link: https://zulybot.xyz/dashboard/%g',
	backup: {
		create: {
			success: 'Backup criado com sucesso!\n⤷ ID: `%id`, tempo gasto para criar: `%t`',
		},
		list: {
			noBackups: 'Você não possui backups.',
			backupList: 'Lista de backups:',
			backupID: 'ID: %id',
		},
		load: {
			success: 'Backup carregado com sucesso!',
			error: 'Backup não encontrado.',
			confirm: 'Você deseja carregar o backup? Saiba que todas as suas configurações serão substituidas pelo backup, não será recuperado **mensagens, cargos & canais** depois desse processo.\n> Para carregar reaja com `✅`.',
		}
	},
	clusters: {
		desc: '> Esse servidor está no cluster `%id`\n- Nome: `%name`\n- Ping: `%ping`',
		field: 'Info Clusters:',
		fielDesc: '- Cluster %id\n- Ping: %p\n- PingDB: %pd\n- Consumo: %ram'
	},
	gender: {
		title: 'Gênero',
		desc: 'Olá, %u, eu gostaria de te conhecer melhor, o que você é? Menino? Menina? Ou nenhum dos dois? Eu preciso saber para que eu possa me adequar mais em minhas respostas!\n>>> - 🚹 Menino\n- 🚺 Menina\n- 🚻 Nenhum dos dois',
		change: 'Gênero alterado para `%g` com sucesso!',
		male: 'menino',
		female: 'menina'
	},
	anagramWords: ['andar', 'apreciar', 'reconhecer', 'ter', 'anúncio', 'televisão', 'buraco', 'acadêmico', 'pacote',
		'residente', 'puxar', 'tragédia', 'olhar', 'compacto', 'má', 'faca', 'perseguição', 'bomba', 'biscoito', 'leilão', 'tratar',
	 'atrair', 'empregar', 'naufrágio', 'incerteza', 'rumor', 'formal', 'nobre', 'brincadeira', 'original', 'cover', 'ballet', 'cheiro',
	  'ligação', 'refletir', 'barulhento', 'ignorante', 'pão', 'fraco', 'vidro', 'quarto', 'desordem', 'hall', 'manhã', 'conexão',
	   'inocente', 'condenado', 'sugerir', 'filme', 'mínimo', 'curso', 'favorável', 'slot', 'registro', 'tocha', 'menor', 'laticínios',
		'obrigado', 'caneta', 'alocação', 'qualificado', 'irmã', 'torre', 'espírito', 'proteção', 'ver', 'transação', 'harmonia',
		'precedente'],
	botban: {
		title: 'Você está banido!',
		description: '↳ Você foi banido de utilizar a `%z` por: `%r`\n> <:zu_info:911303533859590144> Você pode pedir uma apelação em nosso [servidor de suporte](https://discord.gg/pyyyJpw5QW).',
	},
	customCommand: 'Comando criado com sucesso, use `/%n` para executar.',
	alreadyExists: 'O comando já existe.',
	ticket: {
		sus: 'Sucesso!',
		already: 'Desculpa, você já tem um ticket.',
		await: 'Aguarde até que um dos atendentes te responda.',
		created: 'Seu ticket foi criado.',
		delete: 'Seu ticket foi encerrado e será apagado em 10 segundos.',
		create: 'Para criar um ticket clique no botão abaixo.',
		labels: {
			delete: 'Fechar',
			create: 'Abrir Ticket'
		}
	},
	logs: {
		oldMessage: 'Mensagem Antiga:',
		newMessage: 'Mensagem Nova:',
		deleted: 'Mensagem Deletada:',
		channel: 'Canal:',
		url: 'Link:',
		message: {
			title: 'Logs de Mensagem'
		},
		bans: {
			title: 'Logs de Bans',
		},
		user: 'Usuário:',
		reason: 'Motivo:',
		mod: 'Moderador:',
		bani: 'Banido',
		desbani: 'Desbanido',
		jump: 'Ir para mensagem',
		set: 'Canal setado para `%c`'
	},
	aki: {
		reg: 'pt',
		q: 'Pergunta:',
		r: 'Respostas:',
		i: 'Iniciando o Akinator',
		is: 'Esse é seu personagem?',
		win: 'Ótimo! Acertei mais uma vez.',
		nowin: 'Uh, você ganhou',
		yay: 'Amei brincar com você!',
		res: '[sim (**s**) / não (**n**)]'
	},
	labels: {
		recalc: 'Recalcular'
	},
	guess: {
		start: 'O Jogo irá começar em **5 segundos** com um número entre `%min` e `%max`.',
		started: 'Valendo!',
		number: 'O Número escolhido foi `%num`, os usuários devem adivinhar ele para poder ganhar o evento.',
		win: 'Você Acertou! O Número escolhido foi `%num`!'
	},
	lockdown: {
		pass: 'Para iniciar o lockdown envie `lock` no chat.\n> ⚠️ Caso queira cancelar envie qualquer outra coisa no chat.',
		cancel: 'O Lockdown foi cancelado com sucesso.',
		sucess: 'O Lockdown foi executado com sucesso.',
		locking: 'O Lockdown está em andamento.',
		noCanal: 'Nenhum canal foi fechado.'
	},
	print: {
		site: 'Print do website:'
	},
	mention: {
		hello: 'Olá %user!',
		about: 'Sou uma bot multifuncional para o discord!',
		help: 'Para saber meus comandos, digite **/help**.',
		labels: {
			support: 'Servidor de Suporte',
			invite: 'Convite',
			website: 'Website'
		}
	},
	reactionRole: {
		invalidMessage: 'Não consegui encontrar mensagem com o id `%id%`',
		sucess: 'ReactionRole criado com sucesso!'
	},
	eventLog: {
		fields: {
			deletedMessage: 'Mensagem Deletada:',
			oldMessage: 'Mensagem Antiga:',
			newMessage: 'Mensagem Nova:'
		},
		channel: 'Canal:'
	},
	docs: {
		args: 'Diga o que será pesquisado na documentação.'
	},
	fnshop: {
		args: 'Inclua o ID do canal que será enviado a loja do fortnite.',
		channel: 'Não tenho permissão para enviar mensagens no canal citado.',
		sucess: 'Canal setado com sucesso!'
	},
	message: {
		mod: 'Esse comando só pode ser usado por meus moderadores!',
		P: 'Olá, humano!',
		view: 'Eu não tenho permissão de ler o histórico de mensagens!',
		the: 'O Comando',
		unk: 'não existe ou não pode ser executado no momento!',
		user: 'Você não tem todas as permissões necessárias para usar este comando!\nPermissões necessárias:',
		bot: 'Eu não tenho todas as permissões necessárias para executar este comando! \n Permissões necessárias:',
		dev: 'Apenas meus desenvolvedores podem usar este comando!',
		c: 'Aguarde %t segundos para usar outro comando.',
		e: 'Ops, ocorreu um erro!',
		e2: 'Reporte este erro!',
		e3: 'Provavelmente minha equipe ja sabe sobre este erro, mas que tal você ajudar? Você pode abrir um [issue](https://github.com/zulybot/zuly/issues) no [github](https://github.com/zulybot/zuly) ou então reportar em meu [servidor de suporte](https://discord.gg/pyyyJpw5QW), vamos fazer o discord um lugar melhor, juntos 🤝',
		nsfw: 'Esse comando só pode ser usado em canais nsfw'
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
		wins: 'Parabéns, {winners}! Você ganhou **{this.prize}**!\n{this.messageURL}',
		react: 'Reaja com 🎁 para participar!',
		restante: 'Tempo Restante:',
		no: 'Sorteio cancelado, sem participações válidas',
		give: 'SORTEIO',
		giveend: 'SORTEIO ENCERRADO',
		start: 'Você não usou o comando corretamente, utilize: `%pgiveaway-start [tempo(10s, 10m)] [ganhadores(1, 1w)] [prêmio(fotos de gatinhos)]`, não inclua **[]** ou **()**.',
		end: 'Você não usou o comando corretamente, utilize: `%pgiveaway-end [id da mensagem]`',
		reroll: 'Você não usou o comando corretamente, utilize: `%pgiveaway-reroll [id da mensagem]`',
		novo: 'Novo ganhador(es): {winners}! Parabéns, vocês ganharam **{this.prize}**\n{this.messageURL}',
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
		texto: 'Olá, sou a **%bot**, um bot com funcionalidades únicas, que todo servidor precisa! Atualmente conheço **%u pessoas** diferentes que utilizam de minhas funcionalidades e estou em **%g servidores** diferentes.\n\nSou desenvolvida por `%devs` utilizando [Eris](https://abal.moe/Eris/) utilizando [Javascript](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript) & [NodeJS](https://nodejs.org/en/)',
		recursos: 'Recursos:',
		mem: 'esse servidor está usando %m da minha memória.',
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
		skip: 'A música foi pulada com sucesso.',
		not: 'Não estou tocando nada no servidor.',
		voice: 'Fiquei sozinha no canal de voz, estou saindo!',
		duration: 'Duração:',
		loop: {
			ativado: 'O Loop da música atual foi ativado.',
			desativado: 'O Loop da música atual foi desativado.'
		}
	},
	play: {
		nada: 'Estão faltando argumentos, utilize `%pplay <música | url>`',
		add: 'Adicionado a fila',
		can: 'Você precisa estar em um canal de voz para ouvir música.'
	},
	waifu: {
		casar: 'Reaja com 💖 para se casar',
		casou: 'Você se casou com %w',
		dono: 'Dono',
		utl: 'Utilize: %pwaifu-info [ID]',
		casado: 'Você já casou recentemente, você pode casar a cada 2 horas',
		noharem: 'Você não tem waifus, use `%pwaifu roll` para adicionar um.',
		battle: 'Batalha de Waifus',
		battleDesc: '**%u** está procurando um parceiro para um duelo de waifus, quem vai encarar?',
		label: 'Eu!',
		yms: 'Você não pode batalhar com você mesmo.',
		bat: '%u, você irá batalhar com %2u, vocês tem 30 segundos para escolher uma waifu (jogador encontrado em `%t`).',
		select: 'Nada Selecionado.'
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
		foi: 'foi punido com sucesso.',
		dev: 'Você não pode punir o desenvolvedor do bot.'
	},
	clear: {
		msg: 'mensagens** limpas com sucesso',
		no: 'Insira a quantidade de mensagens a serem limpas',
		p: 'Procurando mensagens, isso pode levar 30 segundos...',
		num: 'Eu só consigo limpar entre 2 a 100 mensagens'
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
		badges: 'Emblemas de:',
		id: 'ID de:',
		create: 'Conta criada dia:'
	},
	slash: 'devido a alguns problemas de compatibilidade, mudei completamente para **Comandos Slash**, se os comandos não aparecerem, adicione-me novamente clicando aqui: [adicionar](https://zulybot.xyz/add), não é necessário remover o bot, caso os comandos ainda não foram atualizados em seu servidor, pode levar até uma hora para que sejam atualizados em todos os servidores, devido ao discord.',
	avatar: {
		title: 'Avatar de:',
		download: 'Link para download:',
		hex: 'Hex para usar em seu perfil:',
		click: 'Clique Aqui'
	},
	perfil: {
		ngm: 'NINGUÉM',
		desc: 'A Zuly é minha amiga, sabia que você pode alterar isso usando "%psobremim"?',
		comp: 'Clique no `🛒` para comprar',
		succ: 'Background comprado com sucesso',
		sep: 'Background setado com sucesso',
		no: 'Você não tem dinheiro suficiente para comprar este background'
	},
	filters: {
		ativado: 'O Filtro %f foi ativado com sucesso.',
		desativado: 'O Filtro %f foi desativado com sucesso.'
	},
	economy: {
		carteira: 'Carteira:',
		banco: 'Banco:',
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
		ativado: 'Sistema ativado com sucesso!',
		desativado: 'Sistema desativado com sucesso!',
		nonsfw: 'Não envie conteúdo NSFW fora de canais NSFW.'
	}
};
