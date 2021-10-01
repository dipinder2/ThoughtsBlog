// inside of user.routes.js
const {PostDict} = require('../controllers/post.controller');
const { authenticate } = require('../config/jwt.config');
module.exports = app => {
    app.post("/api/posts",  authenticate, PostDict.create);
    app.get("/api/posts", PostDict.getAll);
    app.post("/api/posts/comments/:postId", PostDict.postComments);
}