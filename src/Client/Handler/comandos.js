/* eslint-disable */
const config = require('../../Config/config');
const comandos = [];
const fs = require('fs');
// Apagar comandos e aliases existentes (reload).
global.zuly.commands.clear();
global.zuly.aliases.clear();
// Carregar categorias.
fs.readdir('./src/Commands/', (err, cat) => {
	if (err) throw err;
	cat.forEach(categoria => {
		console.log(`[CATEGORIAS] Carregando categoria ${categoria}`.brightCyan);
		// Carregar comandos de tal categoria.
		fs.readdir(`./src/Commands/${categoria}`, (err, cmds) => {
			if (err) throw err;
			cmds.forEach(cmd => {
				try {
					const CmdObj = require(`../../Commands/${categoria}/${cmd}`);
					const comando = new CmdObj();
					const nome = comando.pt.nome;
					const nome2 = comando.en.nome;
					// Definir comando no client.
					global.zuly.commands.set(nome, comando);
					global.zuly.commands.set(nome2, comando);
					if (comando.aliases) {
						comando.aliases.forEach(alia => {
							global.zuly.aliases.set(alia, comando);
						});
					}
					comandos.push({
						type: 1,
						name: comando.en.nome,
						description: comando.en.desc,
						options: comando.options
					});
					delete require.cache[cmd];
					// Caso tenha carregado corretamente informar!
					console.log(`[COMANDOS] Comando ${nome} carregado com sucesso.`.brightGreen);
				}
				catch (erro) {
					const CmdObj = require(`../../Commands/${categoria}/${cmd}`);
					const comando = new CmdObj();
					const nome = comando.pt.nome;
					// Caso tenha dado algum erro ao carregar informar!
					console.log(`[COMANDOS] Comando ${nome} não pode ser carregado :(\n\nErro: ${erro}`.bgRed);
				}
			});
		});
	});
});
if (config.deployslash) {
	setTimeout(async () => {
		const commands = await global.zuly.requestHandler.request('GET', `/applications/${config.client.id}/commands`, true);
		// Atualizar comandos Antigos
		commands.forEach(async (cmd) => {
			const command = global.zuly.commands.get(cmd.name);
			if (!command) {
				await global.zuly.requestHandler.request('DELETE', `/applications/${config.client.id}/commands/${cmd.id}`, true);
			}
			else {
				await global.zuly.requestHandler.request('PATCH', `/applications/${config.client.id}/commands/${cmd.id}`, true, {
					name: command.en.nome,
					description: command.en.desc,
					options: command.options
				});
			}
		});
		// Adicionar comandos novos.
		comandos.forEach(async (cmd) => {
			await global.zuly.requestHandler.request('POST', `/applications/${config.client.id}/commands`, true, cmd);
		});
	}, 5000);
}
// Davi e LRD fez.