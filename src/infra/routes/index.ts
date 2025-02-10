import { Router } from "express";
import { signInController } from "../http/controllers/sign-in.controller";
import { signUpController } from "../http/controllers/sign-up.controller";

const routes: Router = Router();

// Auth routes
routes.post("/auth/sign-up", signUpController);
routes.post("/auth/sign-in", signInController);

export default routes;
