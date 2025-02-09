import { Router } from "express";
import { deleteUserController } from "../http/controllers/delete-user.controller";
import { getProductsController } from "../http/controllers/get-products.controller";
import { getProfileController } from "../http/controllers/get-profile.controller";
import { signInController } from "../http/controllers/sign-in.controller";
import { signUpController } from "../http/controllers/sign-up.controller";
import { authMiddleware } from "../http/middleware/auth-middleware";

const routes: Router = Router();

// Auth routes
routes.post("/auth/sign-up", signUpController);
routes.post("/auth/sign-in", signInController);
routes.get("/auth/profile", authMiddleware, getProfileController);
routes.delete("/auth/delete-account", authMiddleware, deleteUserController);

// Products routes
routes.get("/products", getProductsController);

export default routes;
