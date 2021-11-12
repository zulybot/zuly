/* eslint-disable */
'use strict';
const __awaiter = this && this.__awaiter || function(e, t, r, a) {
	return new (r || (r = Promise))(function(l, n) {
		function i (e) {
			try {
				c(a.next(e));
			}
			catch (e) {
				n(e);
			}
		}

		function o (e) {
			try {
				c(a.throw(e));
			}
			catch (e) {
				n(e);
			}
		}

		function c (e) {
			let t;
			e.done ? l(e.value) : (t = e.value, t instanceof r ? t : new r(function(e) {
				e(t);
			})).then(i, o);
		}
		c((a = a.apply(e, t || [])).next());
	});
};
Object.defineProperty(exports, '__esModule', {
	value: !0
}), exports.Facebook = void 0;
const erela_js_1 = require('erela.js'),
	REGEX = /(?:https?:\/\/)?(?:www.|web.|m.)?(facebook|fb).(com|watch)\/(?:video.php\?v=\d+|(\S+)|photo.php\?v=\d+|\?v=\d+)|\S+\/videos\/((\S+)\/(\d+)|(\d+))\/?/g,
	{
		get: get
	} = require('axios'),
	cheerio = require('cheerio'),
	buildSearch = (e, t, r) => ({
		loadType: e,
		tracks: t != null ? t : [],
		playlist: null,
		exception: r ? {
			message: r,
			severity: 'COMMON'
		} : null
	});
class Facebook extends erela_js_1.Plugin {
	constructor () {
		super();
	}
	load (e) {
		this.manager = e, this._search = e.search.bind(e), e.search = this.search.bind(this);
	}
	search (e, t) {
		let r, a, l;
		return __awaiter(this, void 0, void 0, function*() {
			const n = e.query || e,
				[, i, o] = (r = n.match(REGEX)) !== null && void 0 !== r ? r : [];
			if (n.match(REGEX)) {
				try {
					const r = yield get(e.replace('/m.', '/')), n = cheerio.load(r.data)('script[type=\'application/ld+json\']'), i = JSON.parse(n[0].children[0].data), o = {
						title: i.name || 'null',
						thumbnail: i.thumbnailUrl || 'null',
						streamURL: i.url || 'null',
						url: e || 'null',
						author: i.author.name || 'null'
					};
					if (o.streamURL) {
						const e = yield this.manager.search(o.streamURL, t);
						return e.tracks[0].title = o.title, e.tracks[0].thumbnail = o.thumbnail, e.tracks[0].uri = o.url, buildSearch('TRACK_LOADED', e.tracks, null);
					}
					return buildSearch('LOAD_FAILED', null, 'Incorrect type for Facebook URL.');
				}
				catch (e) {
					return console.log(e.message), buildSearch((a = e.loadType) !== null && void 0 !== a ? a : 'LOAD_FAILED', null, (l = e.message) !== null && void 0 !== l ? l : null, null);
				}
			}
			return this._search(e, t);
		});
	}
}
exports.Facebook = Facebook;