class UserManager {
    constructor(databaseService) {
      this.databaseService = databaseService;
    }
  
    manageUser() {
      this.databaseService.connect();
      this.databaseService.getUserData();
    }
  }
  
  module.exports = UserManager;
  