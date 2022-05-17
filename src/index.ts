
import cors from "cors";
import db from "./db";
import dotenv from "dotenv";
import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import registerAdminBro from "adminBro";
//Importing routes
import routes from "./routes/index.routes";

const resultDot = dotenv.config();
if (resultDot.error) {
  throw resultDot.error;
}

db.connect();

import "./iot";

const app = express();

registerAdminBro(app);

app.use(express.json());

app.use(morgan(process.env.MORGAN_MODE || "tiny"));

//app.use(helmet());
//app.use(cors());

app.use("/api", routes);

const appConfig = app.listen(process.env.PORT || 8080);

console.log(`Rodando na porta ${process.env.PORT}`);

export { appConfig, app };
