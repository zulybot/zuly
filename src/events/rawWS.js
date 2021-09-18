module.exports = class rawWS {
	constructor () {
	  return {
			nome: 'rawWS',
			run: this.run
	  };
	}

	async run (packet) {
	  // SISTEMA ORIGINAL BY: VERIC | ADAPTAÇÃO BY: LRD | ADAPTAÇÃO PT2 BY: ADG
	  if (packet.t === 'INTERACTION_CREATE') {
			const interaction = packet.d;
			const { Collection, User, Message } = require('eris');
			const command = global.zuly.commands.get(interaction.data.name) || global.zuly.aliases.get(interaction.data.name);
			if (!command) return;
			interaction.mentions = [];
			interaction.mention_everyone = false;
			interaction.mention_roles = new Collection();

			if (interaction.data && interaction.data.resolved && interaction.data.resolved.users) {
		  for (const membro in interaction.data.resolved.users) {
					// Adiciona o objeto do membro no Message.mentions.members
					interaction.data.resolved.users[membro].member =
						interaction.data.resolved.members[membro];

					// Adiciona o objeto do usuário no Message.mentions.users
					interaction.mentions.push(interaction.data.resolved.users[membro]);
		  }
			}

			const args = interaction.data.options
		  ? interaction.data.options.map((i) => {
					switch (i.type) {
			  case 8:
							return `<@&${i.value}>`;
			  case 6:
							return `<@!${i.value}>`;
			  case 7:
							return `<#${i.value}>`;
			  default:
							return i.value;
					}
		  })
		  : [];

			interaction.content = (interaction.data.name + ' ' + args.join(' ')).trim();

			interaction.author = new User(interaction.member.user, global.zuly);

			interaction.mentions[0] = global.zuly.user;

			const msg = new Message(interaction, global.zuly);

			let idioma = require('../Config/idiomas.js');
			let lang = await global.db.get(`idioma-${msg.guildID}`) || 'pt_br';
			lang = lang.replace(/-/g, '_');
			idioma = idioma[lang];

			const prefix = global.db.get(`prefix-${msg.channel.guild.id}`) ? global.db.get(`prefix-${msg.channel.guild.id}`) : '/';

			await global.zuly.requestHandler.request('POST', `/interactions/${interaction.id}/${interaction.token}/callback`, false, {
		  type: 4,
		  data: {
					content: idioma.slash.replace('{user}', msg.member.user.mention)
		  }
			});

			this.ctx = {
		  id: msg.id,
		  user: msg.author,
		  userTag: msg.author.tag,
		  userId: msg.author.id,
		  member: msg.member,
		  memberTag: msg.member.tag,
		  memberId: msg.member.id,
		  idioma: idioma,
		  prefix: prefix,
		  args: args,
		  message: msg,
		  embed: require('../Client/lyaEmbedBuilder'),
		  // Functions
		  send: function(texto) {
					msg.channel.createMessage(texto);
		  },
		  reply: function(texto, mencionar) {
					msg.channel.createMessage(texto, mencionar);
		  },
		  addReaction: function(emoji) {
					msg.addReaction(emoji);
		  },
		  fetch: async function(url) {
					await global.zuly.manager.fetch(url);
		  }
			};

			return command.run(this.ctx);
	  }
	}
};
