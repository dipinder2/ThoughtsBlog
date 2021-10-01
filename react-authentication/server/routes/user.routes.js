// inside of user.routes.js
const Users = require('../controllers/user.controller');
const { authenticate } = require('../config/jwt.config');
module.exports = app => {
  app.post("/api/users/register", Users.register);
  app.post("/api/users/login", Users.login);
  // this route now has to be authenticated
  app.get("/api/users", authenticate, Users.getAll);
  app.get("/api/users/logout", authenticate, Users.logout);
}