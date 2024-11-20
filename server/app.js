import "dotenv/config";
import {connectDB} from "./src/config/db.js";
import fastify from "fastify";

const start = async () => {
    try {
        const PORT = process.env.PORT || 3000;
        await connectDB(process.env.MONGO_URI);
        const app = fastify();

        app.listen({ port: PORT, host: "0.0.0.0" }, (err, address) => {
            if (err) {
                console.error(err);
            } else {
                console.log(`Server listening on ${address}`);
            }
        });
    } catch (error) {
        console.error("Error starting the application:", error);
        process.exit(1); 
    }
};


start()
