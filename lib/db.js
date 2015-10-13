import r from 'rethinkdb';
import util from 'util';
import assert from 'assert';

var logdebug = require('debug')('rdb:debug');
var logerror = require('debug')('rdb:error');

// #### Connection Details

// RethinkDB database settings.

const dbConfig = {
  host: process.env.RDB_HOST || 'localhost',
  port: parseInt(process.env.RDB_PORT, 10) || 28015,
  db: process.env.RDB_DB || 'sample_app',
  tables: {
    'messages': 'id',
    'cache': 'cid',
    'users': 'id'
  }
};

/**
 * Connect to RethinkDB instance and perform a basic database setup:
 *
 * - create the `RDB_DB` database (defaults to `chat`)
 * - create tables `messages`, `cache`, `users` in this database
 */
export const setup = function () {
  r.connect({
    host: dbConfig.host,
    port: dbConfig.port
  }, function (err, connection) {
    assert.ok(err === null, err);
    // Create Databases if they do not already exist.
    r.dbCreate(dbConfig.db).run(connection, function (err, result) {
      if (err) {
        logdebug("[DEBUG] RethinkDB database '%s' already exists (%s:%s)\n%s", dbConfig.db, err.name, err.msg, err.message);
      } else {
        logdebug("[INFO ] RethinkDB table '%s' created", tableName);
      }
      // Create tables if they do not already exist.
      for (var tbl in dbConfig.tables) {
        (function (tableName) {
          r.db(dbConfig.db).tableCreate(tableName, {primaryKey: dbConfig.tables[tbl]}).run(connection, function (err, result) {
            if (err) {
              logdebug("[DEBUG] RethinkDB table '%s' already exists (%s:%s)\n%s", tableName, err.name, err.msg, err.message);
            } else {
              logdebug("[INFO ] RethinkDb table '%s' created", tableName);
            }
          });
        })(tbl);
      }
    });
  });
};

/* incomplete. see
   https://github.com/rethinkdb/rethinkdb-example-nodejs-chat/blob/master/lib/db.js
   for more details
*/
