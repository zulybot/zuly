const fs = require('fs');

class DenkyDatabase {
	constructor (local) {
		if (!local) return this._throwMissing('local', 'criação de database');
		if (!fs.existsSync(local)) fs.writeFileSync(local, '{"_denkyDatabaseVersion":2}');
		// this.conteudo
		this.local = local;
		try {
			this.conteudo = JSON.parse(fs.readFileSync(local));
		}
		catch (e) {
			throw new Error('Erro ao carregar banco de dados ' + e);
		}
	}

	// Listagem
	get storage () {
		return this.conteudo;
	}

	all (modo = 'all') {
		switch (modo) {
			case 'all':
				return Object.entries(this.conteudo);
			case 'object':
				return this.storage;
			case 'keys':
				return Object.keys(this.conteudo);
			case 'values':
				return Object.values(this.conteudo);
			default:
				throw new Error(`Tipo inválido no metódo all() Esperava all, object, keys, values porém foi recebido ${modo}.`);
		}
	}

	// Geral
	set (nome, valor) {
		if (!nome) return this._throwMissing('nome', 'set');
		if (typeof valor === 'undefined') return this._throwMissing('valor', 'set');
		this.conteudo[nome] = valor;
		this._escrever();
	}

	delete (nome) {
		if (!nome) return this._throwMissing('nome', 'delete');
		delete this.conteudo[nome];
		this._escrever();
	}

	exists (nome) {
		if (!nome) return this._throwMissing('nome', 'exists');
		return !!this._obter(nome);
	}

	get (nome) {
		if (!nome) return this._throwMissing('nome', 'get');
		return this._obter(nome);
	}

	// Números
	add (nome, valor = 1) {
		if (!nome) return this._throwMissing('nome', 'add');
		if (typeof this._obter(nome) !== 'number') throw new Error('O valor já definido não é um número ou não foi definido.');
		this.conteudo[nome] = this.conteudo[nome] + valor;
		this._escrever();
		return this.conteudo[nome];
	}

	remove (nome, valor = 1) {
		if (!nome) return this._throwMissing('nome', 'remove');
		if (typeof this._obter(nome) !== 'number') throw new Error('O valor já definido não é um número ou não foi definido.');
		this.conteudo[nome] = this.conteudo[nome] - valor;
		this._escrever();
		return this.conteudo[nome];
	}

	// Array
	push (nome, valor) {
		if (!nome) return this._throwMissing('nome', 'push');
		if (!valor) return this._throwMissing('valor', 'push');
		if (!Array.isArray(this.conteudo[nome])) throw new Error('O valor já definido não é uma array ou não foi definido.');
		this.conteudo[nome].push(valor);
		this._escrever();
	}

	unpush (nome, valor) {
		if (!nome) return this._throwMissing('nome', 'unpush');
		if (!valor) return this._throwMissing('valor', 'unpush');
		if (!Array.isArray(this.conteudo[nome])) throw new Error('O valor já definido não é uma array ou não foi definido.');
		this.conteudo[nome] = this.conteudo[nome].filter(i => i !== valor);
		this._escrever();
	}

	pull (nome, valor) {
		if (!nome) return this._throwMissing('nome', 'pull');
		if (!valor) return this._throwMissing('valor', 'pull');
		if (!Array.isArray(this.conteudo[nome])) throw new Error('O valor já definido não é uma array ou não foi definido.');
		this.conteudo[nome] = this.conteudo[nome].filter(i => i !== valor);
		this._escrever();
	}

	includes (nome, valor) {
		if (!nome) return this._throwMissing('nome', 'includes');
		if (!valor) return this._throwMissing('valor', 'includes');
		if (!Array.isArray(this.conteudo[nome])) throw new Error('O valor já definido não é uma array ou não foi definido.');
		return this._obter(nome).includes(valor);
	}

	// Outros
	get ping () {
		const inicio = Date.now();
		this.set('((((((PING))))))_internal_denkydb' + inicio, 0);
		this.delete('((((((PING))))))_internal_denkydb' + inicio);
		return Date.now() - inicio;
	}

	deleteAll () {
		this.conteudo = {};
		this._escrever();
	}

	get length () {
		return Object.keys(this.storage).length;
	}

	// Funções internas (não mexer!)
	_throwMissing (option, method) {
		throw new Error(`A opção ${option} está faltando no metódo ${method}.`);
	}

	_escrever () {
		fs.writeFileSync(this.local, JSON.stringify(this.conteudo));
	}

	_obter (nome) {
		return this.conteudo[nome];
	}
}

module.exports = DenkyDatabase;
