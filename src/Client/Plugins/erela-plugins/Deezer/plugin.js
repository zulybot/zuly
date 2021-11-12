'use strict';
const __awaiter = this && this.__awaiter || function(e, t, r, i) {
		return new (r || (r = Promise))(function(n, a) {
			function o (e) {
				try {
					s(i.next(e));
				}
				catch (e) {
					a(e);
				}
			}

			function l (e) {
				try {
					s(i.throw(e));
				}
				catch (e) {
					a(e);
				}
			}

			function s (e) {
				let t;
				e.done ? n(e.value) : (t = e.value, t instanceof r ? t : new r(function(e) {
					e(t);
				})).then(o, l);
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
}), exports.Deezer = void 0;
const erela_js_1 = require('erela.js'),
	axios_1 = __importDefault(require('axios')),
	BASE_URL = 'https://api.deezer.com',
	REGEX = /^(?:https?:\/\/|)?(?:www\.)?deezer\.com\/(?:\w{2}\/)?(track|album|playlist)\/(\d+)/,
	buildSearch = (e, t, r, i) => ({
		loadType: e,
		tracks: t != null ? t : [],
		playlist: i ? {
			name: i,
			duration: t.reduce((e, t) => e + (t.duration || 0), 0)
		} : null,
		exception: r ? {
			message: r,
			severity: 'COMMON'
		} : null
	}),
	check = e => {
		if (void 0 !== e.convertUnresolved && typeof e.convertUnresolved != 'boolean') throw new TypeError('Deezer option "convertUnresolved" must be a boolean.');
		if (void 0 !== e.playlistLimit && typeof e.playlistLimit != 'number') throw new TypeError('Deezer option "playlistLimit" must be a number.');
		if (void 0 !== e.albumLimit && typeof e.albumLimit != 'number') throw new TypeError('Deezer option "albumLimit" must be a number.');
	};
class Deezer extends erela_js_1.Plugin {
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
		let r, i, n;
		return __awaiter(this, void 0, void 0, function*() {
			const a = e.query || e,
				[, o, l] = (r = a.match(REGEX)) !== null && void 0 !== r ? r : [];
			if (o in this.functions) {
				try {
					const e = this.functions[o];
					if (e) {
						const r = yield e(l), i = o === 'track' ? 'TRACK_LOADED' : 'PLAYLIST_LOADED', n = ['playlist', 'album'].includes(o) ? r.name : null;
						if (!r || !r.tracks || !r.tracks[0]) return buildSearch('NO_MATCHES', null, null, null);
						const a = r.tracks.map(e => {
							const r = erela_js_1.TrackUtils.buildUnresolved(e, t);
							return this.options.convertUnresolved && r.resolve(), r;
						});
						return buildSearch(i, a, null, n);
					}
					return buildSearch('LOAD_FAILED', null, 'Incorrect type for Deezer URL, must be one of "track", "album" or "playlist".', null);
				}
				catch (e) {
					return buildSearch((i = e.loadType) !== null && void 0 !== i ? i : 'LOAD_FAILED', null, (n = e.message) !== null && void 0 !== n ? n : null, null);
				}
			}
			return this._search(e, t);
		});
	}
	getAlbumTracks (e) {
		return __awaiter(this, void 0, void 0, function*() {
			const {
				data: t
			} = yield axios_1.default.get(`${BASE_URL}/album/${e}`);
			return {
				tracks: t.tracks.data.map(e => Deezer.convertToUnresolved(e)).splice(0, this.options.albumLimit),
				name: t.title
			};
		});
	}
	getPlaylistTracks (e) {
		return __awaiter(this, void 0, void 0, function*() {
			const {
				data: t
			} = yield axios_1.default.get(`${BASE_URL}/playlist/${e}`);
			return {
				tracks: t.tracks.data.map(e => Deezer.convertToUnresolved(e)).splice(0, this.options.playlistLimit),
				name: t.title
			};
		});
	}
	getTrack (e) {
		return __awaiter(this, void 0, void 0, function*() {
			const {
				data: t
			} = yield axios_1.default.get(`${BASE_URL}/track/${e}`);
			return {
				tracks: [Deezer.convertToUnresolved(t)]
			};
		});
	}
	static convertToUnresolved (e) {
		if (!e) throw new ReferenceError('The Deezer track object was not provided');
		if (!e.artist) throw new ReferenceError('The track artist array was not provided');
		if (!e.title) throw new ReferenceError('The track title was not provided');
		if (typeof e.title != 'string') throw new TypeError(`The track title must be a string, received type ${typeof e.name}`);
		return {
			title: e.title,
			author: e.artist.name,
			duration: 1e3 * e.duration
		};
	}
}
exports.Deezer = Deezer;