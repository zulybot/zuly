const { Schema, model } = require('mongoose');
const GSchema = Schema;
const ObjectId = Schema.ObjectId;

const GuildSchema = new GSchema({
	_id: ObjectId,
	GuildID: String,
	lang: String,
	AutoroleBot: Array,
	AutoroleUser: Array,
	Antinsfw: Boolean
});

module.exports = model('guilds', GuildSchema);