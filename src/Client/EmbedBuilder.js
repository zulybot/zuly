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
		
	}

	setImage (e, t, i) {
		
	}

	setThumbnail (e, t, i) {
		
	}

	setVideo (e, t, i) {
		
	}

	setProvider (e, t) {
		
	}

	setAuthor (e, t, i) {
		
	}

	addField (e, t, i) {
		
	}

	get () {
		return this._embed;
	}
};
