/* eslint-disable */

const fs = require('fs');
const config = require('../../Config/config');
global.zuly.commands.clear();
global.zuly.aliases.clear();
fs.readdir('./src/Commands/', (err, cat) => {
	if (err) throw err;
	cat.forEach(categoria => {
		console.log(`[CATEGORIAS] Carregando categoria ${categoria}`.brightCyan);
		fs.readdir(`./src/Commands/${categoria}`, async (err, cmds) => {
			if (err) throw err;
			const commands = await global.zuly.requestHandler.request('GET', `/applications/${config.client.id}/commands`, true);
			cmds.forEach(async (cmd, index) => {
				try {
					const CmdObj = require(`../../Commands/${categoria}/${cmd}`);
					if(typeof CmdObj != 'function') throw new Error('Don\'t have anything');
					const comando = new CmdObj();
					const opte = comando.options;
					const nome = comando.pt.nome;
					const nome2 = comando.en.nome;
	
					if (config.deployslash === true) {
						if (config.deploy === 'no') {
							return
						}
						await global.zuly.requestHandler.request('POST', `/applications/${config.client.id}/commands`, true, {
							type: 1,
							name: comando.en.nome,
							description: `[${comando.en.categoria}] ${comando.en.desc || 'No Description'}`,
							options: opte,
						});
					} else if (config.deplyslash === false) {
						if (config.deploy === 'no') {
							return
						}
						commands.map(async c => {
							if (c.name === comando.en.nome) {
								await global.zuly.requestHandler.request('PATCH', `/applications/${config.client.id}/commands/${c.id}`, true, {
									type: 1,
									name: comando.en.nome,
									description: `[${comando.en.categoria}] ${comando.en.desc || 'No Description'}`,
									options: opte,
								});
							}
						})
					}

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