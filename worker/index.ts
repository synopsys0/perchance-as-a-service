import handler from "vinext/server/app-router-entry";
import { corsPreflight } from "../app/lib/cors";

type WorkerEnv = Env & NonNullable<Parameters<typeof handler.fetch>[1]>;

export default {
  fetch(request, env, ctx) {
    // vinext currently synthesizes its own OPTIONS response in production,
    // bypassing route-level preflight handlers. Handle preflights at the
    // Worker boundary so browser clients always receive the CORS contract.
    if (request.method === "OPTIONS") {
      return corsPreflight();
    }

    return handler.fetch(request, env, ctx);
  },
} satisfies ExportedHandler<WorkerEnv>;
