import { expo } from "@better-auth/expo";
import { betterAuth } from "better-auth";
import type { Env } from "./env";

export function createAuth(env: Env) {
  const trustedOrigins = [
    env.WEB_ORIGIN ?? "http://localhost:3000",
    env.MOBILE_ORIGIN ?? "start://",
  ];

  return betterAuth({
    database: env.DB,
    secret: env.BETTER_AUTH_SECRET,
    baseURL: env.BETTER_AUTH_URL,
    trustedOrigins,
    emailAndPassword: {
      enabled: true,
    },
    plugins: [expo()],
  });
}
