const { Database } = require('quickmongo'); const c = require('../config')

try {
  const db = new Database(c.mongo)
  global.zuly.db = db
  console.log('[ZULY DATABASE] database connected'.green)
} catch (e) {
  console.log(`[ERROR_STATUS_${e.code}] status code ${e.code}\nError: ${e}`.red)
}
