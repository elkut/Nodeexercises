import * as dbRtns from "./db_routines.js";
import * as cfg from "./config.js";
const resolvers = {
    countries: async () => {
        let db = await dbRtns.getDBInstance();
        console.log(cfg.collection);
        return await dbRtns.findAll(db, cfg.collection);
    },
    countrybycode: async (args) => { // Corrected to use (_, args) for parameter structure
        let db = await dbRtns.getDBInstance();
        return await dbRtns.findOne(db, cfg.collection, { code: args.code });
    },
    countrybyname: async (args) => { // Corrected to use (_, args) for parameter structure
        let db = await dbRtns.getDBInstance();
        return await dbRtns.findOne(db, cfg.collection, { name: args.name });
    },
    addcountry: async args => { // Corrected to use (_, args) for parameter structure
        let db = await dbRtns.getDBInstance();
        let country = { name: args.name, code: args.code };
        console.log(country);
        try {
            let results = await dbRtns.addOne(db, cfg.collection, country);
            return country;
        } catch (error) {
            console.error("Error adding:", error);
            return null;
        }
    }
};
export { resolvers };