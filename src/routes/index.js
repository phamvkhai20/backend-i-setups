const userRouter = require("../routes/user");
const postRouter = require("../routes/post");
function route(app) {
  app.use("/api/user", userRouter);
  app.use("/api/post", postRouter);
}

module.exports = route;
