require("dotenv").config();
const config = require("./config/index.js");
const route = require("./routes");
const express = require("express");
const db = require("./config/db");
const methodOverride = require("method-override");
const app = express();

app.use(methodOverride("X-HTTP-Method-Override"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
db.connect();
route(app);

app.listen(config.port, () =>
  console.log(`listening on port http://${config.host}:${config.port}`)
);
