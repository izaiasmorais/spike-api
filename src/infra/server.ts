import fastify from "fastify";
import fastifyCors from "@fastify/cors";
import fastifySwagger from "@fastify/swagger";
import fastifyJwt from "@fastify/jwt";
import fastifySwaggerUI from "@fastify/swagger-ui";
import {
	jsonSchemaTransform,
	serializerCompiler,
	validatorCompiler,
	ZodTypeProvider,
} from "fastify-type-provider-zod";
import { errorHandler } from "./error-handler";
import { env } from "./env/env";
import { getProfile } from "./http/controllers/get-profile";
import { signIn } from "./http/controllers/sign-in";
import { signUp } from "./http/controllers/sign-up";

const port = Number(env.PORT);

export const app = fastify().withTypeProvider<ZodTypeProvider>();

app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);
app.setErrorHandler(errorHandler);
app.register(fastifyCors);
app.register(fastifySwagger, {
	openapi: {
		info: {
			title: "Spike API",
			description: "API para gerenciamento de um e-commerce.",
			version: "1.0.0",
		},
		components: {
			securitySchemes: {
				bearerAuth: {
					type: "http",
					scheme: "bearer",
					bearerFormat: "JWT",
				},
			},
		},
	},
	transform: jsonSchemaTransform,
});
app.register(fastifySwaggerUI, {
	routePrefix: "/",
});
app.register(fastifyJwt, {
	secret: env.JWT_SECRET,
});

// Autenticação
app.register(signUp);
app.register(signIn);
app.register(getProfile);

try {
	app.listen({ port, host: "0.0.0.0" });
	console.log(`HTTP server running at PORT ${env.PORT}`);
} catch (err) {
	app.log.error(err);
	process.exit(1);
}
