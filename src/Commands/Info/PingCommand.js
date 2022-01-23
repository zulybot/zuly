module.exports = class PingCommand {
	constructor () {
		return {
			permissoes: {
				membro: [],
				bot: [],
				dono: false
			},
			pt: {
				nome: 'ping',
				categoria: '📖 » Informação',
				desc: 'Veja a latência do bot.'
			},
			en: {
				nome: 'ping',
				categoria: '📖 » Information',
				desc: 'See bot latency.'
			},
			fr: {
				nome: 'ping',
				categoria: '📖 » Information',
				desc: 'Voir la latence du bot.'
			},
			/*
            SUB_COMMAND	1 = SubCommand
            SUB_COMMAND_GROUP: 2 = SubCommandGroup
            STRING: 3 = String
            INTEGER: 4 = Any integer between -2^53 and 2^53
            BOOLEAN: 5 = True or False
            USER: 6 = User Mention
            CHANNEL: 7 = Includes all channel types + categories
            ROLE: 8 = Role Mention
            MENTIONABLE: 9 = Includes users and roles
            NUMBER: 10 = Any double between -2^53 and 2^53
            */
			options: [
				{
					type: 3,
					name: 'option',
					description: 'Choose an option to perform',
					required: false,
					choices: [
						{
							name: 'clusters',
							value: 'clusters'
						}
					]
				}
			],
			aliases: ['latency', 'ws', 'pong'],
			run: this.run
		};
	}

	async run (ctx) {
		if (ctx.args[0] === 'clusters') {
			const { cluster, domain } = require('../../Config/config');
			const { get } = require('axios');

			const mongoose = require('mongoose');
			const date = Date.now();
			const pingDB = new Promise((r) =>
				mongoose.connection.db.admin().ping(() => r(Date.now() - date))
			);

			const res = await get(domain + 'api/status');
			const status = res.data;

			const embed = new ctx.embed();
			embed.setTitle(`Clusters | ${global.zuly.user.username}`);
			embed.setDescription(`${ctx.idioma.clusters.desc.replace('%id', cluster.id).replace('%name', cluster.nome).replace('%ping', global.zuly.shards.random().latency + 'ms')}`);
			embed.addField(ctx.idioma.clusters.field, `\`\`\`${ctx.idioma.clusters.fielDesc.replace('%id', status.id).replace('%name', status.name).replace('%p', status.ping + 'ms').replace('%pd' + status.pingDB).replace('%ram', status.ram)}\`\`\`\n\`\`\`${ctx.idioma.clusters.fielDesc.replace('%id', cluster.id).replace('%name', cluster.nome).replace('%p', global.zuly.shards.random().latency + 'ms').replace('%pd', await pingDB + 'ms').replace('%ram', (process.memoryUsage().rss / 1024 / 1024).toFixed(0) + 'mb')}\`\`\``);
			embed.setColor('#ffcbdb');
			embed.setThumbnail(global.zuly.user.avatarURL);
			embed.setFooter('⤷ zulybot.xyz', global.zuly.user.avatarURL);
			ctx.message.channel.slashReply({
				content: ctx.message.author.mention,
				embeds: [embed.get()]
			});
		}
		else {
			const { cluster } = require('../../Config/config');
			const mongoose = require('mongoose');
			const date = Date.now();
			const pingDB = new Promise((r) =>
				mongoose.connection.db.admin().ping(() => r(Date.now() - date))
			);
			return ctx.message.channel.slashReply({
				content: `🏓 **|** ${ctx.message.author.mention} Pong!\n- **API Ping:** \`${global.zuly.shards.random().latency}ms\`\n- **Database:** \`${await pingDB}ms\`\n- **Cluster:** \`(${cluster.id} ${cluster.nome})\``,
			});
		}
	}
};
// ADG, Davi e LRD
