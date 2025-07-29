import {$log} from "@tsed/logger";
import { PlatformExpress } from "@tsed/platform-express";
import {Server} from "./Server.js";
import * as dotenv from "dotenv";
import * as path from "path";

// Load environment variables
const envPath = path.resolve(process.cwd(), '.env');
console.log("Looking for .env file at:", envPath);

const result = dotenv.config();
console.log("Dotenv result:", result);

console.log("Environment loaded. DB_HOST:", process.env.DB_HOST);
console.log("All environment variables:", Object.keys(process.env).filter(key => key.startsWith('DB_')));

const SIG_EVENTS = [
  "beforeExit",
  "SIGHUP",
  "SIGINT",
  "SIGQUIT",
  "SIGILL",
  "SIGTRAP",
  "SIGABRT",
  "SIGBUS",
  "SIGFPE",
  "SIGUSR1",
  "SIGSEGV",
  "SIGUSR2",
  "SIGTERM"
];

try {
  const platform = await PlatformExpress.bootstrap(Server);
  await platform.listen();

  SIG_EVENTS.forEach((evt) => process.on(evt, () => platform.stop()));

  ["uncaughtException", "unhandledRejection"].forEach((evt) =>
    process.on(evt, async (error) => {
      $log.error({event: "SERVER_" + evt.toUpperCase(), message: error.message, stack: error.stack});
      await platform.stop();
    })
  );
} catch (error) {
  $log.error({event: "SERVER_BOOTSTRAP_ERROR", message: error.message, stack: error.stack});
}

