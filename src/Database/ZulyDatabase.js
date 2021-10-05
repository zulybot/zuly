const DatabaseManager = require('./DenkyDatabase');
global.db = new DatabaseManager('./data/base.json');
global.db.del = global.db.delete;
