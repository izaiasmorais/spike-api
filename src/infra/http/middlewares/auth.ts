import { FastifyInstance } from "fastify";
import { fastifyPlugin } from "fastify-plugin";
import { UnauthorizedError } from "../../../core/errors/unauthorized-error";

interface JwtVerifyResponse {
	payload: { sub: string };
}

export const auth = fastifyPlugin(async (app: FastifyInstance) => {
	app.addHook("preHandler", async (request) => {
		request.getCurrentUserId = async () => {
			try {
				const {
					payload: { sub },
				} = await request.jwtVerify<JwtVerifyResponse>();

				return sub;
			} catch {
				throw new UnauthorizedError("Invalid auth token");
			}
		};
	});
});
