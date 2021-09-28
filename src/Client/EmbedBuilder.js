module.exports.Embed = class Embed {
	constructor () {
		this._embed = {};
	}

	setTitle (title) {
		this._embed.title = title;
	}

	setDescription (description) {
		this._embed.description = description;
	}

	setUrl (url) {
		this._embed.url = url;
	}

	setColor (color) {
		this._embed.color = parseInt(color.substring(1), 16);
	}

	setFooter (text, icon_url = undefined) {
		this._embed.footer = {};
		this._embed.footer.text = text;
		if (icon_url) {
			this._embed.footer.icon_url = icon_url;
		}
	}

	setImage (url, width = undefined, height = undefined) {
		this._embed.image = {};
		this._embed.image.url = url;
		if (width) {
			this._embed.image.width = width;
		}
		if (height) {
			this._embed.image.height = height;
		}
	}

	setThumbnail (url, width = undefined, height = undefined) {
		this._embed.thumbnail = {};
		this._embed.thumbnail.url = url;
		if (width) {
			this._embed.thumbnail.width = width;
		}
		if (height) {
			this._embed.thumbnail.height = height;
		}
	}

	setVideo (url, width = undefined, height = undefined) {
		this._embed.video = {};
		this._embed.video.url = url;
		if (width) {
			this._embed.video.width = width;
		}
		if (height) {
			this._embed.video.height = height;
		}
	}

	setProvider (name, url = undefined) {
		this._embed.provider = {};
		this._embed.provider.name = name;
		if (url) {
			this._embed.provider.url = url;
		}
	}

	setAuthor (name, url = undefined, icon_url = undefined) {
		this._embed.author = {};
		this._embed.author.name = name;
		if (url) {
			this._embed.author.url = url;
		}
		if (icon_url) {
			this._embed.author.icon_url = icon_url;
		}
	}

	addField (name, value, inline) {
		if (!this._embed.fields) {
			this._embed.fields = [];
		}
		this._embed.fields.push({
			name: name,
			value: value,
			inline: inline
		});
	}

	get () {
		return this._embed;
	}
};