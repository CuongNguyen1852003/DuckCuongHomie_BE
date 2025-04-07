const DatabaseService = require('./DatabaseService');

class SQLServerDatabaseService extends DatabaseService {
  connect() {
    console.log("Connecting to SQL Server...");
  }

  getUserData() {
    console.log("Fetching user data from SQL Server...");
  }

  closeSQLServerConnection() {
    console.log("Closing SQL Server connection...");
  }
}

module.exports = SQLServerDatabaseService;
