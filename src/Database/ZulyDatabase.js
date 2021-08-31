const DatabaseManager = require('./DenkyDatabase')

// Essa será a varíavel que você usará para manipular a Database.
global.db = new DatabaseManager('./data/base.json')
global.db.del = global.db.delete
