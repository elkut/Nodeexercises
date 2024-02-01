import { Router } from "express";
import * as dbRtns from "./db_routines.js";
import * as cfg from "./config.js";
const router = Router();
// define a default route
router.get("/", (req, res) => {
    res
        .status(200)
        .send({ msg: `this would be a response from the default route` });
});
// define a get route with a name parameter
router.get("/:code", async (req, res) => {
    try {
        const db = await dbRtns.getDBInstance();
        let code = req.params.code.toUpperCase(); // Ensure code is uppercase to match 'alpha-2'
        let country = await dbRtns.findOne(db, cfg.collections, { 'alpha-2': code });

        if (country) {
            res.status(200).send(`The code ${code} belongs to the country of ${country.name}`);
        } else {
            res.status(404).send(`The code ${code} is not a known country 
            alpha-2 code.`);
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal server error');
    }
});
export default router;