import express from "express";
import expressConfig from "./framework/server/express.js";
import routes from "./framework/server/routes/index.js";
import "dotenv/config";
import config from "./config/config.js";

const app = express();

app.get("/", (req, res) => {
  res.send("Hello World");
});

expressConfig(app);

routes(app, express);

const PORT = config.port;

app.listen(PORT, () => {
  console.log("Server is running on port 3333");
});
