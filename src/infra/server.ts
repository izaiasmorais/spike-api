import express from "express";
import cors from "cors";
import routes from "./routes";
import swaggerUI from "swagger-ui-express";
import swaggerDocument from "../docs/swagger.json";
import { env } from "./env/env";
import { errorHandler } from "./erro-handler";

const port = env.PORT || 3333;
const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);
app.use(errorHandler);

app.use("/", swaggerUI.serve, swaggerUI.setup(swaggerDocument));

app.listen(port, "0.0.0.0", () => {
	console.log(`HTTP server running at PORT ${env.PORT}`);
});
