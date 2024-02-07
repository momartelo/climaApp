import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";

import cookieParser from "cookie-parser";

import { config } from "./src/settings/config.js";
import { startConnection } from "./src/settings/database.js";
import { weatherRouter } from "./src/routes/weather.routes.js";
import { authRouter } from "./src/routes/auth.routes.js";
import { authHeader } from "./src/validations/auth-validation.js";
import { validateToken } from "./src/middlewares/validate-token.js";

export const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
    cors({
        origin: "*",
        methods: ["GET", "POST", "PATCH", "DELETE"],
    }),
);

app.use(helmet());
app.use(morgan("dev"));
app.use(cookieParser());

app.use("/api/auth", authRouter);
app.use("/api/weather", weatherRouter);
app.use(
    "/api/weatherForecast/",
    authHeader,
    validateToken,
    weatherRouter,
);

app.listen(config.port, async () => {
    await startConnection({
        uri: config.mongo,
        database: config.database,
    });
    console.log(
        "Server is running on port: http://localhost:" + config.port,
    );
});
