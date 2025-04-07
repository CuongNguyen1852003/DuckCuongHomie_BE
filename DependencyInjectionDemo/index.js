const MySQLDatabaseService = require('./MySQLDatabaseService');
const SQLServerDatabaseService = require('./SQLServerDatabaseService');
const PostgreSQLDatabaseService = require('./PostgreSQLDatabaseService');
const UserManager = require('./UserManager');

const mysqlService = new MySQLDatabaseService();
const userManager1 = new UserManager(mysqlService);
userManager1.manageUser();

const sqlServerService = new SQLServerDatabaseService();
const userManager2 = new UserManager(sqlServerService);
userManager2.manageUser();

const postgresService = new PostgreSQLDatabaseService();
const userManager3 = new UserManager(postgresService);
userManager3.manageUser();
