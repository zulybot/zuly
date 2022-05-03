/* eslint-disable */
const config = require('../../Config/config');
const comandos = [];
const fs = require('fs');
const { command } = require('../../Config/system');
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
						'type': 1,
						'name': comando.en.nome,
						'name_localizations': {
							'pt-BR': comando.pt.nome,
							'en-US': comando.en.nome,
							'fr': comando.fr.nome
						},
						'description': comando.en.desc,
						'description_localizations': {
							'pt-BR': comando.pt.desc,
							'en-US': comando.en.desc,
							'fr': comando.fr.desc
						},
						'options': comando.options,
						'dm_permission': false
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
		global.zuly.restAPI.put(global.zuly.routes.applicationCommands(config.client.id), {
			body: comandos
		}).then(() => console.log('[SLASH] Registrados com sucesso.')).catch(console.error);
	}, 5000);
}
// Davi e LRD fez.