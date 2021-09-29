module.exports = class rawWS {
	constructor () {
	  return {
			nome: 'rawWS',
			run: this.run
	  };
	}

	async run (packet) {
		const interaction = packet.d;
		global.zuly.music.updateVoiceState(packet);
		if (packet.t == 'INTERACTION_CREATE') {
			const { Collection, User, Message } = require('eris');
			const command = global.zuly.commands.get(packet.d.data.name);
			if (!command) return;
			interaction.mentions = [];
			interaction.mention_everyone = false;
			interaction.mention_roles = new Collection();

			if (interaction.data && interaction.data.resolved && interaction.data.resolved.users) {
			  for (const membro in interaction.data.resolved.users) {
					interaction.data.resolved.users[membro].member =
							interaction.data.resolved.members[membro];
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

			const prefix = await global.db.get(`prefix-${msg.channel.guild.id}`) ? global.db.get(`prefix-${msg.channel.guild.id}`) : '/';

			msg.channel.createMessage = function(txt) {
				global.zuly.requestHandler.request('POST', `/interactions/${packet.d.id}/${packet.d.token}/callback`, false, {
					type: 4,
					data: {
						...txt
					}
				});
			};

			if (command.permissoes) {
				if (command.permissoes.membro.length) {
					if (!command.permissoes.membro.every(p => msg.channel.guild.members.get(msg.author.id).permissions.has(p))) {
						return msg.channel.createMessage({
							content: `:x: ${msg.author.mention} **|** ${idioma.message.user} \`${command.permissoes.membro}\`.`,
							flags: 64
						});
					}
				}
				if (command.permissoes.bot.length) {
					if (!command.permissoes.bot.every(p => msg.channel.guild.members.get(global.zuly.user.id).permissions.has(p))) {
						return msg.channel.createMessage({
							content: `:x: ${msg.author.mention} **|** ${idioma.message.bot} \`${command.permissoes.bot}\`.`,
							flags: 64
						});
					}
				}
				if (command.permissoes.nsfw) {
					if (!msg.channel.nsfw) {
						return msg.channel.createMessage({
							content: `:x: ${msg.author.mention} **|** ${idioma.message.nsfw}`,
							flags: 64
						});
					}
				}
				if (command.permissoes.dono) {
					const developers = await global.db.get('devs');
					if (!developers) {
						await global.db.set('devs', ['726449359167684734', '392087996821667841', '699416429338034268']);
					}

					if (!developers.includes(msg.member.id)) {
						return msg.channel.createMessage({
							content: `:x: ${msg.author.mention} **|** ${idioma.message.dev}.`,
							flags: 64
						});
					}
				}
			}
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
				ephemeral: 64,
				embed: require('../Client/EmbedBuilder').Embed,
				// Functions
				send: function(texto) {
				  msg.channel.createMessage(...texto);
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
			await command.run(this.ctx);
		}
	}
};
