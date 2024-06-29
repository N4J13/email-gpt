import morgan from "morgan";
import compression from "compression";
import bodyParser from "body-parser";
import helmet from "helmet";
import session from "express-session";
import cors from "cors";
import cookieSession from "cookie-session";

export default function expressConfig(app) {
  // security middleware
  app.use(helmet());

  app.use(compression());
  app.use(bodyParser.json({ limit: "50mb" }));
  app.use(
    bodyParser.urlencoded({
      limit: "50mb",
      extended: true,
      parameterLimit: 50000,
    })
  );

  // express session middleware
  app.use(
    cookieSession({
      name: "session",
      maxAge: 24 * 60 * 60 * 1000,
      keys: ["key1"],
    })
  );

  app.use(
    cors({
      origin: process.env.NODE === "production" ? "https://example.com" : "http://localhost:3000",
      credentials: true,
    })
  );
  app.use(morgan("combined"));
}
