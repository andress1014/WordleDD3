import express, { Application } from "express";

const app: Application = express();
import bodyParser from "body-parser";
import environment from "dotenv-flow";
import cors from "cors";
import morgan from "morgan";

environment.config({ silent: true });

app.use(cors());

/***********Routes************/
import { UserRouter } from "../modules/user/routers";
import { PlayWordleRouter } from "../modules/playWordle/routers";
import { AuthRouter } from "../modules/auth/routers";
import { StatisticsRouter } from "../modules/statistics/routers";

app.use(morgan("dev"));

//Body Parser
app.use(bodyParser.json({ limit: "5mb", type: "application/json" }));
app.use(bodyParser.urlencoded({ limit: "5mb", extended: true }));

app.use("/api/user", UserRouter);
app.use("/api/game", PlayWordleRouter);
app.use("/api/auth", AuthRouter);
app.use("/api/statistics", StatisticsRouter);

export default app;
