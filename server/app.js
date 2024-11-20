import fastify from "fastify";

const start = async () => {
    const PORT = process.env.PORT || 3000
    const app = fastify()

    app.listen({ port: PORT || 3000, host: "0.0.0.0" }, (err, address) => {
        if (err) {
            console.log(err);

        } else {
            console.log(`server listening on http://localhost:${PORT}`);

        }
    })

}

start()
