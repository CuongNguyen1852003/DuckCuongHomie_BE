const DatabaseService = require('./DatabaseService');

class MySQLDatabaseService extends DatabaseService {
  connect() {
    console.log("Connecting to MySQL...");
  }

  getUserData() {
    console.log("Fetching user data from MySQL...");
  }
}

module.exports = MySQLDatabaseService;
