/* eslint-disable */
'use strict';
let __awaiter = this && this.__awaiter || function(e, t, r, i) {
		return new (r || (r = Promise))(function(a, l) {
			function n (e) {
				try {
					s(i.next(e));
				}
				catch (e) {
					l(e);
				}
			}

			function o (e) {
				try {
					s(i.throw(e));
				}
				catch (e) {
					l(e);
				}
			}

			function s (e) {
				let t;
				e.done ? a(e.value) : (t = e.value, t instanceof r ? t : new r(function(e) {
					e(t);
				})).then(n, o);
			}
			s((i = i.apply(e, t || [])).next());
		});
	},
	__importDefault = this && this.__importDefault || function(e) {
		return e && e.__esModule ? e : {
			default: e
		};
	};
Object.defineProperty(exports, '__esModule', {
	value: !0
}), exports.AppleMusic = void 0;
const cheerio = require('cheerio'),
	axios = require('axios'),
	erela_js_1 = require('erela.js'),
	axios_1 = __importDefault(require('axios')),
	REGEXTRACK = /(http(s|):\/\/music\.apple\.com\/..\/.....\/.*\/([0-9]){1,})\?i=([0-9]){1,}/gim,
	REGEX = /(?:https:\/\/music\.apple\.com\/)(?:\w{2}\/)?(track|album|playlist)/g,
	buildSearch = (e, t, r, i) => ({
		loadType: e,
		tracks: t != null ? t : [],
		playlist: i ? {
			name: i,
			duration: t.reduce((e, t) => e + (t.duration || 0), 0)
		} : null,
		exception: r ? {
			plugin: 'AppleMusic',
			message: r,
			severity: 'COMMON'
		} : null
	}),
	check = e => {
		if (void 0 !== e.convertUnresolved && typeof e.convertUnresolved != 'boolean') throw new TypeError('AppleMusic option "convertUnresolved" must be a boolean.');
		if (void 0 !== e.playlistLimit && typeof e.playlistLimit != 'number') throw new TypeError('AppleMusic option "playlistLimit" must be a number.');
		if (void 0 !== e.albumLimit && typeof e.albumLimit != 'number') throw new TypeError('AppleMusic option "albumLimit" must be a number.');
	};
class AppleMusic extends erela_js_1.Plugin {
	constructor (e = {}) {
		super(), check(e), this.options = {
			playlistLimit: e.playlistLimit && e.playlistLimit >= 1 ? e.playlistLimit : 100,
			albumLimit: e.albumLimit && e.albumLimit >= 1 ? e.albumLimit : 50,
			convertUnresolved: !!e.convertUnresolved && e.convertUnresolved
		}, this.functions = {
			track: this.getTrack.bind(this),
			album: this.getAlbumTracks.bind(this),
			playlist: this.getPlaylistTracks.bind(this)
		};
	}
	load (e) {
		this.manager = e, this._search = e.search.bind(e), e.search = this.search.bind(this);
	}
	search (e, t) {
		let r, i;
		return __awaiter(this, void 0, void 0, function*() {
			const a = e.query || e;
			let l = a.match(REGEX) ? typeSong(e) : [];
			if (l && a.match(REGEXTRACK) && (l = 'track'), l in this.functions) {
				try {
					const a = this.functions[l];
					if (a) {
						const r = yield a(e), i = l === 'track' ? 'TRACK_LOADED' : 'PLAYLIST_LOADED', n = ['playlist', 'album'].includes(l) ? r.name : null;
						if (!r || !r.tracks || !r.tracks[0]) return buildSearch('NO_MATCHES', null, null, null);
						const o = r.tracks.map(e => {
							const r = erela_js_1.TrackUtils.buildUnresolved(e, t);
							return this.options.convertUnresolved && r.resolve(), r;
						});
						return buildSearch(i, o, null, n);
					}
					return buildSearch('LOAD_FAILED', null, 'Incorrect type for AppleMusic URL, must be one "track of album","album" or "playlist".', null);
				}
				catch (e) {
					return buildSearch((r = e.loadType) !== null && void 0 !== r ? r : 'LOAD_FAILED', null, (i = e.message) !== null && void 0 !== i ? i : null, null);
				}
			}
			return this._search(e, t);
		});
	}
	getAlbumTracks (e) {
		return __awaiter(this, void 0, void 0, function*() {
			let t = axios.get(e),
				r = yield t, i = cheerio.load(r.data), a = i('.songs-list-row__song-name').toArray(), l = i('.dt-link-to').toArray(), n = i('.product-name').toArray(), o = i('.songs-list-row__link').toArray(), s = [], c = o[0] ? o[0].children[2].prev.data : 'No existe capo', u = l[0] ? l[0].children[1].data : c, p = 0;
			for (; p < a.length; p++) {
				s.push({
					title: a[p].lastChild.prev.data,
					uri: e,
					album: n[0].children[4].data.replace(/ /g, '').replace(/\n/g, ''),
					artist: `${u}`
				});
			}
			let d = s,
				h = n[0].children[4].data.replace(/ /g, '').replace(/\n/g, '');
			return {
				tracks: d.map(e => AppleMusic.convertToUnresolved(e)).splice(0, this.options.albumLimit),
				name: h
			};
		});
	}
	getPlaylistTracks (e) {
		return __awaiter(this, void 0, void 0, function*() {
			let t = yield ApplePlayList(e), r = Titulo(e);
			return {
				tracks: t.map(e => AppleMusic.convertToUnresolved(e)).splice(0, this.options.playlistLimit),
				name: r
			};
		});
	}
	getTrack (e) {
		return __awaiter(this, void 0, void 0, function*() {
			const t = replaceTexto(e);
			let r = axios.get(e).then(r => {
					let i = cheerio.load(r.data),
						a = i('.songs-list-row__song-name').toArray(),
						l = i('.dt-link-to').toArray(),
						n = i('.songs-list-row__link').toArray(),
						o = 0,
						s = n[0] ? n[0].children[2].prev.data : 'No existe capo',
						c = l[0] ? l[0].children[1].data : s;
					try {
						for (; a[o].lastChild.prev.data.toLowerCase().replace('¡', '').replace('!', '').replace('\'', '').replace('¿', '').replace('?', '') !== t.toLowerCase();) o++;
						return {
							artist: `${c}`,
							uri: e,
							title: `${a[o].lastChild.prev.data} ${c}`
						};
					}
					catch (t) {
						return {
							artist: `${c}`,
							uri: e,
							title: `${a[0].lastChild.prev.data} ${c}`
						};
					}
				}),
				i = yield r;
			return {
				tracks: [AppleMusic.convertToUnresolved(i)]
			};
		});
	}
	static convertToUnresolved (e) {
		if (!e) throw new ReferenceError('The Apple track object was not provided');
		if (!e.artist) throw new ReferenceError('The track artist array was not provided');
		if (!e.title) throw new ReferenceError('The track title was not provided');
		if (typeof e.title != 'string') throw new TypeError(`The track title must be a string, received type ${typeof e.name}`);
		return {
			title: e.title,
			author: e.artist,
			uri: e.uri,
			duration: 1e3 * getRandom(140, 250)
		};
	}
}

function typeSong (e) {
	return e.replace(/https:\/\//i, '').split('/')[2];
}

function Titulo (e) {
	let t = e.replace(/https:\/\//i, '').split('/')[3].replace(/-/g, ' ').split(' '),
		r = '';
	for (let e of t) r += e.slice(0, 1).toUpperCase() + e.slice(1) + ' ';
	return r;
}

function getRandom (e, t) {
	return Math.random() * (t - e) + e;
}

function replaceTexto (e) {
	return e.replace(/https:\/\//i, '').split('/')[3].replace(/-/g, ' ').replace(/%C3%B3/g, 'ó').replace(/%C3%A9/g, 'é').replace(/%C3%BA/g, 'ú').replace(/%C3%AD/g, 'í').replace(/%C3%A1/g, 'á').replace(/%C3%B1/g, 'ñ');
}

function ApplePlayList (e) {
	return new Promise((t, r) => {
		e ? axios.get(e).then(e => {
			let r, i = cheerio.load(e.data),
				a = i('.songs-list-row__song-name').toArray(),
				l = i('.songs-list-row__link').toArray(),
				n = [],
				o = 0;
			for (r = 0; r < a.length; r++) {
				n.push({
					uri: l[o].children[1].parent.attribs.href,
					album: l[o + 2].firstChild.data,
					artist: l[o].children[1].data,
					title: `${a[r].children[1].data} ${l[o].children[1].data}`
				}), o += 3;
			}
			t(n);
		}).catch(e => {
			r(e);
		}) : r(new Error('Playlist url is undefined'));
	});
}
exports.AppleMusic = AppleMusic;