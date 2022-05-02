module.exports = {
	lang: 'es',
	report: {
		p1: '¿Quieres denunciar a algunas personas? ¡Has venido al lugar correcto! ¡Para hacer el informe solo haz clic en el formulario!',
		id: 'ID del formulario:',
		dm: '¡Vea sus mensajes directos!'
	},
	daily: {
		coletado: 'Ha recolectado **%m** diariamente, regrese mañana y recaude de nuevo.',
		coletou: 'Ya has recogido tu recompensa diaria, vuelve a recogerla en **%time**'
	},
	premium: '¡Has descubierto una función premium, para ser un usuario premium, únete a mi [servidor de soporte] (<https://discord.gg/pyyyJpw5QW>)!',
	ball: {
		title: '🎱 Bola Mágica',
		field1: '**Pregunta:**',
		field2: '**Responder:**'
	},
	ship: {
		nou: 'Menciona a algún usuario para enviar',
		d1: 'No sois compatibles, sois muy diferentes entre vosotros 😔',
		d2: 'Pueden ser amigos, pero no veo mejor futuro entre ustedes, son similares entre ustedes 🤝',
		d3: 'Podéis ser pareja, los gustos son casi iguales y os conocéis mucho 👀',
		d4: 'Sois perfectos, hechos el uno para el otro, adelante, tenéis todo por resolver ❤️'
	},
	dashboard: 'La configuración del Bot se ha migrado al tablero, acceda a este enlace: https://zulybot.xyz/dashboard/%g',
	backup: {
		create: { success: 'Copia de seguridad creada con éxito! \n⤷ ID: `%id`, tiempo de creación: `%t`' },
		list: {
			noBackups: 'No tienes copias de seguridad.',
			backupList: 'Lista de copia de seguridad:',
			backupID: 'ID: %id'
		},
		load: {
			success: 'Copia de seguridad cargada con éxito!',
			error: 'Copia de seguridad no encontrada.',
			confirm: '¿Quieres cargar la copia de seguridad? Tenga en cuenta que la copia de seguridad sobrescribirá todas sus configuraciones, **mensajes, posiciones y canales** no se recuperarán después de este proceso. > Para cargar reaccionar con `✅`.'
		}
	},
	clusters: {
		desc: 'Este servidor está en el cluster `%id`\n- Nombre: `%name`\n- Ping: `%ping`',
		field: 'Información de los clusters:',
		fielDesc: '- Cluster %id\n- Ping: %p\n- PingDB: %pd\n- Consumido: %ram'
	},
	gender: {
		title: 'Género',
		desc: 'Hola %u, me gustaría saber más de ti. ¿Qué eres, chico, chica, o ninguno? ¡Lo necesito saber para que pueda adaptar mis respuestas!\n>>> - 🚹 Chico\n- 🚺 Chica\n- 🚻 Ninguno',
		change: '¡Género cambiado a `%g` con éxito!',
		male: 'chico',
		female: 'chica'
	},
	anagramWords: [
		'suelo',
		'aprecio',
		'reconocer',
		'tener',
		'anuncio',
		'televisión',
		'agujero',
		'escolar',
		'paquete',
		'residente',
		'empujar',
		'tragedia',
		'mirada',
		'compacto',
		'medio',
		'cuchillo',
		'búsqueda',
		'bomba',
		'galleta',
		'subasta',
		'trato',
		'atraer',
		'emplear',
		'naufragio',
		'incertidumbre',
		'rumor',
		'formal',
		'noble',
		'broma',
		'original',
		'cubrir',
		'ballet',
		'oler',
		'vínculo',
		'reflejo',
		'ruidoso',
		'ignorante',
		'pan',
		'tenue',
		'vidrio',
		'habitación',
		'desorden',
		'salón',
		'mañana',
		'conexión',
		'inocente',
		'convicto',
		'sugerencia',
		'película',
		'mínimo',
		'curso',
		'favorable',
		'espacio',
		'grabación',
		'antorcha',
		'menor',
		'lácteos',
		'gracias',
		'lápiz',
		'asignación',
		'calificado',
		'hermana',
		'torre',
		'espíritu',
		'protección',
		'ver',
		'transacción',
		'harmonía',
		'precedente'
	],
	botban: {
		title: '¡Has sido baneado!',
		description: '↳ Has sido baneado de usar `%z` por: `%r`\n> <:zu_info:911303533859590144> Puedes hacer una apelación en nuestro [servidor de soporte](https://discord.gg/pyyyJpw5QW).'
	},
	customCommand: 'Comando creado con éxito, usa `/%n` para ejecutarlo.',
	alreadyExists: 'El comando ya existe.',
	ticket: {
		sus: '¡Éxito!',
		already: 'Lo siento, tú ya tienes un ticket.',
		await: 'Espere hasta que uno de los asistentes te respondan.',
		created: 'Su ticket ha sido creado.',
		delete: 'Su ticket ha sido cerrado y será borrado en 10 segundos.',
		create: 'Para crear un ticket haga clic en el botón de abajo,',
		labels: {
			delete: 'Cerrar',
			create: 'Abrir Ticket'
		}
	},
	logs: {
		oldMessage: 'Mensaje Viejo:',
		newMessage: 'Mensaje Nuevo:',
		deleted: 'Mensaje Eliminado:',
		channel: 'Canal:',
		url: 'Enlace:',
		message: { title: 'Registros de Mensajes' },
		bans: { title: 'Ban Logs' },
		user: 'Usuario:',
		reason: 'Razón:',
		mod: 'Moderadores:',
		bani: 'Prohibido',
		unbani: 'Desbaneado',
		jump: 'Ir a mensajes',
		set: 'Canal puesto a `%c`'
	},
	aki: {
		reg: 'pt',
		q: 'Pregunta:',
		r: 'Respuestas:',
		i: 'Empezando Akinator',
		is: '¿Es este tu carácter?',
		win: '¡Bien! Lo tuve bien una vez más.',
		nowin: 'Uh, ganaste',
		yay: '¡Me encantó jugar contigo!',
		res: '[sí (**y**) / no (**n**)]'
	},
	labels: { recalc: 'Recalcular' },
	guess: {
		start: 'El Juego empezará en **5 segundos** con un número entre `%min` y `%max`.',
		started: '¡Ha empezado!',
		number: 'El Número elegido fue `%num`, los usuarios deben averiguarlo para ganar el evento.',
		win: '¡Lo conseguiste! El Número elegido fue `%num`!'
	},
	lockdown: {
		pass: 'Para empezar el bloqueo de canales, envíe `lock` en el chat.\n> ⚠️ Si quieres cancelarlo, envíe otra cosa en el chat.',
		cancel: 'El bloqueo de canales se ha cancelado con éxito.',
		success: 'El bloqueo de canales fue ejecutado con éxito.',
		locking: 'El bloqueo de canales está en progreso.',
		noCanal: 'Ningún canal fue bloqueado.'
	},
	print: { website: 'Imprento del sitio web:' },
	mention: {
		hello: '¡Hola %user!',
		about: 'Soy un bot de Discord multifuncional!',
		help: 'Para saber mis comandos, escriba **/help**.',
		labels: {
			support: 'Servidor de Soporte',
			invite: 'Invitación',
			website: 'Sitio web'
		}
	},
	reactionRole: {
		invalidMessage: 'No he podido encontrar ningún mensaje con el id `%id%`',
		sucess: '¡ReactionRole creado con éxito!'
	},
	eventLog: {
		fields: {
			deletedMessage: 'Mensaje Eliminado:',
			oldMessage: 'Mensaje Viejo:',
			newMessage: 'Mensaje Nuevo:'
		},
		channel: 'Canal:'
	},
	docs: { args: 'Di que quieres buscar en la documentación.' },
	fnshop: {
		args: 'Incluye el ID del canal que será enviado en la tienda de fortnite.',
		channel: 'No tengo permisos para enviar mensajes en el canal mencionado.',
		sucess: '¡Canal puesto con éxito!'
	},
	message: {
		mod: '¡Este comando solo puede ser utilizado por mis moderadores!',
		P: '¡Hola humano!',
		view: '¡No tengo permiso para leer el historial de mensajes!',
		the: 'El Comando',
		unk: '¡no existe o no se puede ejecutar en este momento!',
		user: '¡No tiene todos los permisos necesarios para usar este comando!\n Permisos requeridos:',
		bot: '¡No tiene todos los permisos necesarios para usar este comando!\n Permisos requeridos:',
		dev: '¡Solo mis desarrolladores pueden usar este comando!',
		c: 'Espere %t segundos para usar otro comando.',
		e: '¡Ups, algo salió mal!',
		e2: 'Notificar este error!',
		e3: 'Mi equipo probablemente ya sabe sobre este error, pero ¿qué tal si tu ayudas? Puede abrir un [issue](https://github.com/zulybot/zuly/issues) en [github](https://github.com/zulybot/zuly) o reportarlo en mi [servidor de soporte](https://discord.gg/pyyyJpw5QW), hagamos el discord un lugar mejor, juntos 🤝',
		nsfw: 'Este comando sólo se puede usar en canales nsfw'
	},
	host: {
		db: 'Yo utilizo [MongoDB](https://mongodb.com) para mi base de datos, hospedados en máquinas de <:zu_azure:880536844473880617> [Azure](https://azure.microsoft.com).',
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
		sep: 'Background set successfully',
		no: 'Você não tem dinheiro suficiente para comprar este background'
	},
	filters: {
		ativado: 'El filtro %f se ha habilitado correctamente.',
		desativado: 'El filtro %f se deshabilitó correctamente.'
	},
	economy: {
		carteira: 'Cartera:',
		banco: 'Bank:',
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