import "dotenv/config";
import { connectDB } from "./src/config/db.js";
import fastify from "fastify";
import { PORT } from "./src/config/config.js";
import { admin, buildAdminRouter } from "./src/config/setup.js";

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI);
        const app = fastify();

        await buildAdminRouter(app)

        app.listen({ port: PORT, host: "0.0.0.0" }, (err, address) => {
            if (err) {
                console.error(err);
            } else {
                console.log(`Server listening on http://localhost:${PORT}${admin.options.rootPath}`);
            }
        });
    } catch (error) {
        console.error("Error starting the application:", error);
        process.exit(1);
    }
};


start()
