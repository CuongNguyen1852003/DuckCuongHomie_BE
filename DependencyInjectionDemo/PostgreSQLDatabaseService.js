const DatabaseService = require('./DatabaseService');

class PostgreSQLDatabaseService extends DatabaseService {
  connect() {
    console.log("Connecting to PostgreSQL...");
  }

  getUserData() {
    console.log("Fetching user data from PostgreSQL...");
  }

  rollbackTransaction() {
    console.log("Rolling back transaction in PostgreSQL...");
  }
}

module.exports = PostgreSQLDatabaseService;
