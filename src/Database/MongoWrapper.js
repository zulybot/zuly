/* eslint-disable no-inline-comments */
/* by lrd#6716 */
const {
	EventEmitter
} = require('events');
const Mongo = require('mongoose');
const defaultOptions = {
	noDelay: true,
	autoIndex: true,
	autoCreate: true
};
module.exports.defaultOptions = defaultOptions;
/**
 * Thanks MongoDB and Mongoose
 * @see https://www.mongodb.com/
 * @see https://github.com/Automattic/mongoose
 * @class
 */
class Database extends EventEmitter {
	/**
     * @constructor
     * @param {String} uri Your MongoDB uri
     * @param {String?} [name] Model name
     * @param {Mongo.ConnectOptions?} [options] Mongoose Module Options
     * @param {Boolean} [forceConnection = false] If activated if connection to database falls it will be reestablished immediately
     */
	constructor (uri, name, options, forceConnection = false) {
		super();
		this.uri = uri;
		this.name = name ?? 'dis4js_database';
		this.options = options ?? defaultOptions;
		this.firstConnect = true;
		this.forceConnection = forceConnection;

		// Alias
		this.delete = this.remove;
		this.del = this.remove;
		this.add = this.inc;
		this.rem = this.dec;
		this.all = this.getAll;
		this.arrayKeys = this.getKeys;
		this.clear = this.deleteAll;
		this.has = this.exists;
		this.replace = this.update;
		this.save = this.update;
	}

	/**
     * Connect Database
     */
	async connect () {
		await Mongo.connect(this.uri, this.options, () => {});
		this.db = Mongo.connection;

		if (this.firstConnect) {
			this.firstConnect = false;

			this.db
				.on('connection', (stream) => this.emit('connection', stream))
				.on('open', () => this.emit('ready'))
				.on('error', (err) => this.emit('error', err))
				.on('disconnect', () => {
					this.emit('disconnect');
					// Reconnect to mongodb
					if (!this.forcedDisconnect && this.forceConnection) {
						Mongo.connect(this.uri, this.options);
					}
				});
		}

		/**
         * Database Schema
         */
		this.schema = new Mongo.Schema({
			name: {},
			value: {}
		});

		/**
         * Database model
         */
		this.model = Mongo.model(this.name, this.schema);

		return this.db;
	}

	/**
     * Disconnect Database
     */
	disconnect () {
		this.forcedDisconnect = true;
		return Mongo.disconnect();
	}

	/**
     * Returns a database value according to Key
     * @param {String} key
     */
	async get (key) {
		const obj = await this.model?.findOne({
			name: key
		}).exec();
		return obj ? obj.value : undefined;
	}

	/**
     * Returns a database exec according to Key
     * @param {String} key
     */
	async getExec (key) {
		const exec = await this.model?.findOne({
			name: key
		}).exec();
		return exec;
	}

	/**
     * @param {String} key
     * @param {any} value
     */
	async update (key, value) {
		const obj = await this.model?.findOneAndUpdate({
			name: key
		}, {
			name: key,
			value
		});
		return obj.save();
	}

	/**
     * Set a value in db
     * @param {String} key
     * @param {any} value
     */
	async set (key, value) {
		const obj = await this.get(key);

		if (obj) {
			this.update(key, value);
		}
		else if (this.model) {
			const new_obj = new this.model({
				name: key,
				value
			});
			return new_obj.save();
		}
	}

	/**
     * Removes a database value
     * @param {String} key
     * @return {Promise<any | null>}
     */
	async remove (key) {
		await this.model?.findOneAndDelete({
			name: key
		}).exec();
		return true;
	}

	/**
     * Checks if a key exists in database
     * @param {String} key
     */
	async exists (key) {
		return !!await this.get(key);
	}

	/**
     * Increments a value in database
     * @param {String} key
     * @param {any} value
     */
	async inc (key, value) {
		const obj = await this.get(key);

		if (obj) {
			this.update(key, obj.value += value);
			return this.get(key);
		}
		else if (this.model) {
			const new_obj = new this.model({
				name: key,
				value
			});
			return new_obj.save();
		}
	}

	/**
     * Decrements a value of database
     * @param {String} key
     * @param {any} value
     */
	async dec (key, value) {
		const obj = await this.get(key);

		if (obj) {
			this.update(key, obj.value += value);
			return this.get(key);
		}
		else if (this.model) {
			const new_obj = new this.model({
				name: key,
				value
			});
			return new_obj.save();
		}
	}

	/**
     * Removes the value of a database array
     * @param {String} key
     * @param {any} value
     */
	async pull (key, value) {
		const obj = await this.get(key);

		if (obj) {
			if (!Array.isArray(obj)) throw new TypeError('The data is not an array.');

			this.update(
				key,
				obj.filter((/** @type {any} */ val) => val !== value)
			);
			return this.get(key);
		}
		else if (this.model) {
			const new_obj = new this.model({
				name: key,
				value
			});
			return new_obj.save();
		}
	}

	/**
     * Adds a value to a database array
     * @param {String} key
     * @param {any} value
     */
	async push (key, value) {
		const obj = await this.get(key);

		if (obj) {
			if (!Array.isArray(obj)) throw new TypeError('The data is not an array.');

			obj.push(value);

			this.update(key, obj);
			return this.get(key);
		}
		else if (this.model) {
			const new_obj = new this.model({
				name: key,
				value
			});
			return new_obj.save();
		}
	}

	/**
     * Checks if an array in database includes a certain value
     * @param {String} key
     * @param {any} value
     */
	async includes (key, value) {
		const obj = await this.get(key);

		if (obj) {
			return obj.value.includes(value);
		}
		else {
			return false;
		}
	}

	/**
     * Get all database values
     */
	async getAll () {
		const obj = await this.model?.find({}).exec();
		return obj || [];
	}

	/**
     * Get all database keys
     */
	async getKeys () {
		const obj = await this.model?.find({}).exec();
		return obj ? obj.map((o) => o.name) : [];
	}

	/**
     * Delete all database values
     */
	async deleteAll () {
		const obj = await this.model?.find({}).exec();
		return obj ? obj.map((o) => o.remove()) : [];
	}

	get mongo () {
		return this.model;
	}
}

const ignoreProps = ['disconnect', 'connect', 'options', 'model'];

// Exporting database and adding props to it
((db) => {
	for (const [key, val] of Object.entries(Mongo)) {
		if (ignoreProps.includes(key)) continue;

		Object.defineProperty(db.prototype, key, {
			value: val,
			writable: false
		});
	}
})(
	module.exports instanceof Database
		? module.exports
		: module.exports = Database
);
