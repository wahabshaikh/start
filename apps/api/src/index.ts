import { Hono } from "hono";
import { cors } from "hono/cors";
import { createAuth } from "./auth";
import type { Env } from "./env";

const app = new Hono<{ Bindings: Env }>();

app.use(
  "*",
  cors({
    origin: (origin, c) => {
      const allowed = [
        c.env.WEB_ORIGIN ?? "http://localhost:3000",
        c.env.MOBILE_ORIGIN ?? "start://",
      ];
      return allowed.includes(origin) ? origin : allowed[0];
    },
    credentials: true,
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  }),
);

app.get("/", (c) => c.json({ ok: true, service: "start-api" }));
app.get("/health", (c) => c.json({ ok: true }));

app.on(["GET", "POST"], "/api/auth/*", async (c) => {
  const auth = createAuth(c.env);
  return auth.handler(c.req.raw);
});

app.post("/api/jobs/example", async (c) => {
  await c.env.JOBS.send({
    kind: "example",
    createdAt: new Date().toISOString(),
  });
  return c.json({ queued: true }, 202);
});

export default {
  fetch: app.fetch,
  async queue(batch: MessageBatch, env: Env) {
    for (const message of batch.messages) {
      console.log("job", message.body);
      message.ack();
    }
  },
};
