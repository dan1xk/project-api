import Application from "./server/app";
import "dotenv/config";

const application = new Application();
const port = process.env.PORT ? Number(process.env.PORT) : 8080;

application.init();
application.start(port);
