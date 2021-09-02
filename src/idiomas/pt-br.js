module.exports = {
  lang: 'pt',
  message: {
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
    e3: 'Provavelmente minha equipe ja sabe sobre este erro, mas que tal você ajudar? Você pode abrir um [issue](https://github.com/stardiscordbot/starbot/issues) no [github](https://github.com/stardiscordbot/starbot) ou então reportar em meu [servidor de suporte](https://discord.gg/2pFH6Yy), vamos fazer o discord um lugar melhor, juntos 🤝',
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
  botinfo: {
    texto: 'Olá, sou a %bot, um bot com funcionalidades únicas, que todo servidor precisa! Atualmente conheço **%u pessoas** diferentes que utilizam de minhas funcionalidades e estou em **%g servidores** diferentes.\n\nSou um projeto de [And.](https://github.com/andrelucas) desenvolvida em [Eris](https://abal.moe/Eris/) utilizando [Javascript](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript) & [NodeJS](https://nodejs.org/en/)'
  },
  messages: {
    tem: 'tem',
    msg: 'mensagens',
    title: 'Mensagens'
  },
  print: {
    web: 'Faltou o website'
  },
  mention: {
    response: 'Olá **%u**, veja meus comandos usando `star ajuda` ou `s!ajuda`'
  },
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
    nada: 'Estão faltando argumentos, utilize `%pplay <música | url>`',
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
  }
}
