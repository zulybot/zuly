module.exports.Embed = class {
	constructor () {
		this._embed = {};
	}
	setTitle (e) {
		this._embed.title = e;
	}
	setDescription (e) {
		this._embed.description = e;
	}
	setUrl (e) {
		this._embed.url = e;
	}
	setColor (e) {
		this._embed.color = parseInt(e.substring(1), 16);
	}
	setFooter (e, t) {
		this._embed.footer = {}, this._embed.footer.text = e, t && (this._embed.footer.icon_url = t);
	}
	setImage (e, t, i) {
		this._embed.image = {}, this._embed.image.url = e, t && (this._embed.image.width = t), i && (this._embed.image.height = i);
	}
	setThumbnail (e, t, i) {
		this._embed.thumbnail = {}, this._embed.thumbnail.url = e, t && (this._embed.thumbnail.width = t), i && (this._embed.thumbnail.height = i);
	}
	setVideo (e, t, i) {
		this._embed.video = {}, this._embed.video.url = e, t && (this._embed.video.width = t), i && (this._embed.video.height = i);
	}
	setProvider (e, t) {
		this._embed.provider = {}, this._embed.provider.name = e, t && (this._embed.provider.url = t);
	}
	setAuthor (e, t, i) {
		this._embed.author = {}, this._embed.author.name = e, t && (this._embed.author.url = t), i && (this._embed.author.icon_url = i);
	}
	addField (e, t, i) {
		this._embed.fields || (this._embed.fields = []), this._embed.fields.push({
			name: e,
			value: t,
			inline: i
		});
	}
	get () {
		return this._embed;
	}
};