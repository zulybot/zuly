/* eslint-disable */
'use strict';
const __awaiter = this && this.__awaiter || function(t, e, i, o) {
		return new (i || (i = Promise))((r, n) => {
			function s (t) {
				try {
					l(o.next(t));
				}
				catch (t) {
					n(t);
				}
			}

			function a (t) {
				try {
					l(o.throw(t));
				}
				catch (t) {
					n(t);
				}
			}

			function l (t) {
				let e;
				t.done ? r(t.value) : (e = t.value, e instanceof i ? e : new i(t => {
					t(e);
				})).then(s, a);
			}
			l((o = o.apply(t, e || [])).next());
		});
	},
	__importDefault = this && this.__importDefault || function(t) {
		return t && t.__esModule ? t : {
			default: t
		};
	};
Object.defineProperty(exports, '__esModule', {
	value: !0
}), exports.Spotify = void 0;
const erela_js_1 = require('erela.js'),
	axios_1 = __importDefault(require('axios')),
	BASE_URL = 'https://api.spotify.com/v1',
	REGEX = /(?:https:\/\/open\.spotify\.com\/|spotify:)(.+)(?:[\/:])([A-Za-z0-9]+)/,
	buildSearch = (t, e, i, o) => ({
		loadType: t,
		tracks: e != null ? e : [],
		playlist: o ? {
			name: o,
			duration: e.reduce((t, e) => t + (e.duration || 0), 0)
		} : null,
		exception: i ? {
			message: i,
			severity: 'COMMON'
		} : null
	}),
	check = t => {
		if (!t) throw new TypeError('SpotifyOptions must not be empty.');
		if (typeof t.clientID != 'string' || !/^.+$/.test(t.clientID)) throw new TypeError('Spotify option "clientID" must be present and be a non-empty string.');
		if (typeof t.clientSecret != 'string' || !/^.+$/.test(t.clientSecret)) throw new TypeError('Spotify option "clientSecret" must be a non-empty string.');
		if (void 0 !== t.convertUnresolved && typeof t.convertUnresolved != 'boolean') throw new TypeError('Spotify option "convertUnresolved" must be a boolean.');
		if (void 0 !== t.playlistLimit && typeof t.playlistLimit != 'number') throw new TypeError('Spotify option "playlistLimit" must be a number.');
		if (void 0 !== t.albumLimit && typeof t.albumLimit != 'number') throw new TypeError('Spotify option "albumLimit" must be a number.');
	};
class Spotify extends erela_js_1.Plugin {
	constructor (t) {
		super(), check(t), this.options = {
			...t
		}, this.token = '', this.authorization = Buffer.from(`${this.options.clientID}:${this.options.clientSecret}`).toString('base64'), this.axiosOptions = {
			headers: {
				'Content-Type': 'application/json',
				Authorization: this.token
			}
		}, this.functions = {
			track: this.getTrack.bind(this),
			album: this.getAlbumTracks.bind(this),
			playlist: this.getPlaylistTracks.bind(this)
		}, this.renew();
	}
	load (t) {
		this.manager = t, this._search = t.search.bind(t), t.search = this.search.bind(this);
	}
	search (t, e) {
		let i, o, r;
		return __awaiter(this, void 0, void 0, function*() {
			const n = t.query || t,
				[, s, a] = (i = n.match(REGEX)) !== null && void 0 !== i ? i : [];
			if (s in this.functions) {
				try {
					const t = this.functions[s];
					if (t) {
						const i = yield t(a), o = s === 'track' ? 'TRACK_LOADED' : 'PLAYLIST_LOADED', r = ['playlist', 'album'].includes(s) ? i.name : null, n = i.tracks.map(t => {
							const i = erela_js_1.TrackUtils.buildUnresolved(t, e);
							return this.options.convertUnresolved && i.resolve(), i;
						});
						return buildSearch(o, n, null, r);
					}
					return buildSearch('LOAD_FAILED', null, 'Incorrect type for Spotify URL, must be one of "track", "album" or "playlist".', null);
				}
				catch (t) {
					return buildSearch((o = t.loadType) !== null && void 0 !== o ? o : 'LOAD_FAILED', null, (r = t.message) !== null && void 0 !== r ? r : null, null);
				}
			}
			return this._search(t, e);
		});
	}
	getAlbumTracks (t) {
		return __awaiter(this, void 0, void 0, function*() {
			const {
					data: e
				} = yield axios_1.default.get(`${BASE_URL}/albums/${t}`, this.axiosOptions), i = e.tracks.items.map(t => Spotify.convertToUnresolved(t));
			let {
					next: o
				} = e.tracks, r = 1;
			for (; o && !this.options.playlistLimit || r < this.options.albumLimit;) {
				const {
					data: t
				} = yield axios_1.default.get(o, this.axiosOptions);
				i.push(...t.items.map(t => Spotify.convertToUnresolved(t))), o = t.next, r++;
			}
			return {
				tracks: i,
				name: e.name
			};
		});
	}
	getPlaylistTracks (t) {
		return __awaiter(this, void 0, void 0, function*() {
			const {
					data: e
				} = yield axios_1.default.get(`${BASE_URL}/playlists/${t}`, this.axiosOptions), i = e.tracks.items.map(t => Spotify.convertToUnresolved(t.track));
			let {
					next: o
				} = e.tracks, r = 1;
			for (; o && !this.options.playlistLimit || r < this.options.playlistLimit;) {
				const {
					data: t
				} = yield axios_1.default.get(o, this.axiosOptions);
				i.push(...t.items.map(t => Spotify.convertToUnresolved(t.track))), o = t.next, r++;
			}
			return {
				tracks: i,
				name: e.name
			};
		});
	}
	getTrack (t) {
		return __awaiter(this, void 0, void 0, function*() {
			const {
				data: e
			} = yield axios_1.default.get(`${BASE_URL}/tracks/${t}`, this.axiosOptions);
			return {
				tracks: [Spotify.convertToUnresolved(e)]
			};
		});
	}
	static convertToUnresolved (t) {
		if (!t) throw new ReferenceError('The Spotify track object was not provided');
		if (!t.artists) throw new ReferenceError('The track artists array was not provided');
		if (!t.name) throw new ReferenceError('The track name was not provided');
		if (!Array.isArray(t.artists)) throw new TypeError(`The track artists must be an array, received type ${typeof t.artists}`);
		if (typeof t.name != 'string') throw new TypeError(`The track name must be a string, received type ${typeof t.name}`);
		return {
			title: t.name,
			author: t.artists[0].name,
			duration: t.duration_ms
		};
	}
	renewToken () {
		return __awaiter(this, void 0, void 0, function*() {
			const {
				data: {
					access_token: t,
					expires_in: e
				}
			} = yield axios_1.default.post('https://accounts.spotify.com/api/token', 'grant_type=client_credentials', {
				headers: {
					Authorization: `Basic ${this.authorization}`,
					'Content-Type': 'application/x-www-form-urlencoded'
				}
			});
			if (!t) throw new Error('Invalid Spotify client.');
			return this.token = `Bearer ${t}`, this.axiosOptions.headers.Authorization = this.token, 1e3 * e;
		});
	}
	renew () {
		return __awaiter(this, void 0, void 0, function*() {
			setTimeout(this.renew.bind(this), yield this.renewToken());
		});
	}
}
exports.Spotify = Spotify;