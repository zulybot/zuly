/* eslint-disable */

const fs = require('fs');
global.zuly.commands.clear();
global.zuly.aliases.clear();
fs.readdir('./src/Commands/', (err, cat) => {
	if (err) throw err;
	cat.forEach(categoria => {
		console.log(`[CATEGORIAS] Carregando categoria ${categoria}`.brightCyan);
		fs.readdir(`./src/Commands/${categoria}`, (err, cmds) => {
			if (err) throw err;
			cmds.forEach(cmd => {
				try {
					const CmdObj = require(`../../Commands/${categoria}/${cmd}`);
					if(typeof CmdObj != 'function') throw new Error('Don\'t have anything');
					const comando = new CmdObj();
					const nome = comando.pt.nome;
					const nome2 = comando.en.nome;
					global.zuly.commands.set(nome, comando);
					global.zuly.commands.set(nome2, comando);
					if (comando.aliases) {
						comando.aliases.forEach(alia => {
							global.zuly.aliases.set(alia, comando);
						});
					}
					delete require.cache[cmd];
					console.log(`[COMANDOS] Comando ${nome} carregado com sucesso.`.brightGreen);
				}
				catch (erro) {
					const CmdObj = require(`../../Commands/${categoria}/${cmd}`);
					const comando = new CmdObj();
					const nome = comando.pt.nome;
					console.log(`[COMANDOS] Comando ${nome} não pode ser carregado :(\n\nErro: ${erro}`.bgRed);
				}
			});
		});
	});
});