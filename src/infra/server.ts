import express, { Request, Response, type NextFunction } from "express";
import cors from "cors";
import { defaultHttpErrorResponse } from "./http/responses/responses";
import { AppError } from "@/core/errors/app-error";
import { env } from "./env/env";
import { ZodError } from "zod";
import routes from "./routes";

const port = env.PORT || 3333;
const app = express();

app.use(express.json());
app.use(cors());

app.use(routes);

app.use((err: Error, _: Request, res: Response, __: NextFunction) => {
	if (err instanceof ZodError) {
		res.status(400).json(defaultHttpErrorResponse(err.errors[0].message));
		return;
	}

	if (err instanceof AppError) {
		res.status(err.statusCode).json(defaultHttpErrorResponse(err.message));
		return;
	}

	res.status(500).json(defaultHttpErrorResponse("Internal server error"));
});

app.listen(port, "0.0.0.0", () => {
	console.log(`HTTP server running at PORT ${env.PORT}`);
});
