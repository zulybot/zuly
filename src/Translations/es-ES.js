module.exports = {
	lang: 'es',
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
		p1: '¿Quieres denunciar a algunas personas? ¡Has venido al lugar correcto! ¡Para hacer el informe solo haz clic en el formulario!',
		id: 'ID del formulario:',
		dm: '¡Vea sus mensajes directos!'
	},
	daily: {
		coletado: 'Ha recolectado **%m** diariamente, regrese mañana y recaude de nuevo.',
		coletou: 'Ya has recogido tu recompensa diaria, vuelve a recogerla en **%time**'
	},
	premium: 'You have discovered a premium feature, to be a premium user join my [support server](<https://discord.gg/8SA5sfyR7g>)!',
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
			confirm: 'Do you want to load the backup? Please be aware that all your settings will be overwritten by the backup, **messages, roles & channels** will not be recovered after this process.\n> To upload click on the **button** below.'
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
		description: '↳ You have been banned from using `%z` by: `%r`\n> <:zu_info:911303533859590144> You can file an appeal on our [support server](https://discord.gg/8SA5sfyR7g).'
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
		bulkDelete: 'There were deleted %n messages in #%c (%id).',
		oldMessage: 'Mensaje Viejo:',
		newMessage: 'Mensaje Nuevo:',
		deleted: 'Mensaje Eliminado:',
		channel: 'Canal:',
		url: 'Enlace:',
		message: { title: 'Registros de Mensajes' },
		bans: { title: 'Registros de bloqueo' },
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
	labels: {
		recalc: 'Recalcular',
		unban: 'Desbanir',
		buy: 'Buy',
		load: 'Load'
	},
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
		e3: 'My team probably already knows about this error, but how about you help? You can open an [issue](https://github.com/zulybot/zuly/issues) in [github](https://github.com/zulybot/zuly) or report it to my [support server](https://discord.gg/8SA5sfyR7g), let\'s make the discord a better place, together 🤝',
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
		wins: '¡Felicidades, {winners}! ¡Has ganado **{this.prize}**! {this.messageURL}',
		react: 'reaccionar con 🎁 para participar!',
		restante: 'Tempo Restante:',
		no: 'Sorteio cancelado, sem participações válidas',
		give: 'SORTEIO',
		giveend: 'SORTEIO ENCERRADO',
		start: 'Você não usou o comando corretamente, utilize: `%pgiveaway-start [tempo(10s, 10m)] [ganhadores(1, 1w)] [prêmio(fotos de gatinhos)]`, não inclua **[]** ou **()**.',
		end: 'Você não usou o comando corretamente, utilize: `%pgiveaway-end [id da mensagem]`',
		reroll: 'Você não usou o comando corretamente, utilize: `%pgiveaway-reroll [id da mensagem]`',
		novo: 'Nuevos ganador(es): {winners}! Felicidades, has ganado **{this.prize}**\n{this.messageURL}',
		err: 'Sem participações válidas, nenhum(s) novo(s) vencedor(es) escolhidos!'
	},
	help: {
		title: 'Lista de Comandos • ',
		creators: 'Eu fui desenvolvida por ',
		description: '> My current prefix is: `%p`\n> If you have any questions, please enter my support server: [Click here](https://discord.gg/8SA5sfyR7g)\n> Add me by clicking [here](https://discord.com/oauth2/authorize?client_id=880173509077266483&scope=bot&permissions=805432446)',
		nsfw: 'Você precisa estar em um canal NSFW para ver os comandos nsfw. '
	},
	calc: {
		ex: 'Estão faltando argumentos, utilize, `%pcalc <expressão>`',
		inv: 'Expressão invalida.',
		res: 'Resultado'
	},
	botinfo: {
		texto: 'Hola, soy **%bot**, ¡un bot con características únicas que todo servidor necesita! Actualmente conozco a **%u personas diferentes** que usan mis funciones y estoy en **%g servidores diferentes**.\n\n Estoy desarrollado por `%devs` usando [Eris](https://abal.moe/Eris/) usando [Javascript](https://developer.mozilla.org/en-US/docs/Web/JavaScript) & [NodeJS](https://nodejs.org/en/)',
		recursos: 'Recursos:',
		mem: 'este servidor está usando %m de mi memoria.'
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
		skip: 'La canción fue saltada con éxito.',
		not: 'Não estou tocando nada no servidor.',
		voice: 'Yo estaba solo en el canal de voz, ¡estoy saliendo!',
		duration: 'Duración:',
		loop: {
			ativado: 'Se ha habilitado el bucle de canción actual.',
			desativado: 'El bucle de la canción actual se ha desactivado.'
		}
	},
	play: {
		nada: 'Faltan argumentos, usa `%preproducción <music | url>`',
		add: 'Adicionado a fila',
		can: 'Você precisa estar em um canal de voz para ouvir música.'
	},
	waifu: {
		casar: 'Reaja com 💖 para se casar',
		casou: 'Você se casou com %w',
		dono: 'Dono',
		utl: 'Utiliza: %pwaifu-info [ID]',
		casado: 'Você já casou recentemente, você pode casar a cada 2 horas',
		noharem: 'No tienes waifus, usa `%pwaifu roll` para añadir uno.',
		battle: 'Batalla de Waifus',
		battleDesc: '**%u** está buscando un compañero para un duelo de waifus, ¿a quién le enfrentará?',
		label: '¡Yo!',
		yms: 'No puedes negociar contigo mismo.',
		bat: '%u, lucharás contra %2u, tienes 30 segundos para elegir un waifu (jugador encontrado en `%t`).',
		select: 'No se seleccionó nada.'
	},
	tradutor: {
		lang: 'Você precisa especificar a linguagem, examplo: %translator **en** Oi',
		text: 'Você precisa especificar o texto, examplo: %translator en  **Oi** '
	},
	invite: {
		add: 'Me Adicione ao seu servidor!',
		desc: 'Yay, did you like my commands? Or my features? [Add me](https://discord.com/oauth2/authorize?client_id=719524114536333342&scope=bot%20applications.commands&permissions=805432446)\n\nYou need Help or something? Log into my [support server](https://discord.gg/8SA5sfyR7g), yay'
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
		dev: 'No puedes castigar al desarrollador de bot.'
	},
	clear: {
		msg: 'mensagens** limpas com sucesso',
		no: 'Insira a quantidade de mensagens a serem limpas',
		p: 'Procurando mensagens, isso pode levar 30 segundos...',
		num: 'Sólo puedo borrar entre 2 y 100 mensajes'
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
		badges: 'Insignias de:',
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
		hex: 'Hexadecimal para usar en tu perfil:',
		click: 'Clique Aqui',
		footer: 'If the plan doesn\'t work, change the plan, not the goal.'
	},
	perfil: {
		ngm: 'NINGUÉM',
		desc: 'A Zuly é minha amiga, sabia que você pode alterar isso usando "%psobremim"?',
		comp: 'Click on **button** to buy',
		succ: 'Background comprado com sucesso',
		sep: 'El fondo se ha cambiado correctamente',
		no: 'Você não tem dinheiro suficiente para comprar este background'
	},
	filters: {
		ativado: 'El filtro %f se ha habilitado correctamente.',
		desativado: 'El filtro %f se deshabilitó correctamente.'
	},
	economy: {
		carteira: 'Cartera:',
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
		activated: '¡Sistema activado con éxito!',
		disabled: 'El filtro se deshabilitó correctamente!',
		nonsfw: 'Não envie conteúdo NSFW fora de canais NSFW.'
	}
};