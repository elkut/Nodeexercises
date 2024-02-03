import * as dbRtns from "./db_routines.js";
import * as cfg from "./config.js";
// define a default route to retrieve all users
async function routes(fastify, options) {
    fastify.get("/api/countries", async (request, reply) => {
        try {
            let db = await dbRtns.getDBInstance();
            let countries = await dbRtns.findAll(db, "alerts");
            console.log("Countries retrieved:", cfg.collection);
            reply.status(200).send({ countries: countries });
        } catch (err) {
            console.log(err.stack);
            reply.status(500).send("get all countries failed - internal server error");
        }
    });
}
export { routes };