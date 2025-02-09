import express, { Request, Response, type NextFunction } from "express";
import cors from "cors";
import { defaultHttpErrorResponse } from "./http/responses/responses";
import { AppError } from "@/core/errors/app-error";
import { env } from "./env/env";
import { ZodError } from "zod";
import bodyParser from "body-parser";

import { signUpController } from "./http/controllers/sign-up.controller";
import { deleteUserController } from "./http/controllers/delete-user.controller";
import { signInController } from "./http/controllers/sign-in.controller";
import { getProfileController } from "./http/controllers/get-profile.controller";

const port = env.PORT || 3333;
const app = express();

app.use(bodyParser.json());
app.use(express.json());
app.use(cors());

app.post("/auth/sign-up", signUpController);
app.post("/auth/sign-in", signInController);
app.get("/auth/profile", getProfileController);
app.delete("/auth/delete/:userId", deleteUserController);

app.use((err: Error, _: Request, res: Response, __: NextFunction) => {
	if (err instanceof ZodError) {
		res.status(400).json(defaultHttpErrorResponse(err.errors[0].message));
	}

	if (err instanceof AppError) {
		res.status(err.statusCode).json(defaultHttpErrorResponse(err.message));
	}

	res.status(500).json(defaultHttpErrorResponse("Internal server error"));
});

app.listen(port, "0.0.0.0", () => {
	console.log(`HTTP server running at PORT ${env.PORT}`);
});
