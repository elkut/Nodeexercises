import { loadAlerts } from "./project1_setup.js";
import * as dbRtns from "./db_routines.js";
import * as cfg from "./config.js";
const resolvers = {
    project1_setup: async () => {
        return await loadAlerts();
    },
    alerts: async () => {
        let db = await dbRtns.getDBInstance();
        let alerts = await dbRtns.findAll(db, cfg.alertCollections, {}, {});
        //console.log(alerts); // Debug output
        return await alerts; // Ensure this is an array of objects
    },
    alertsforregion: async (args) => {
        let db = await dbRtns.getDBInstance();
        let alerts = await dbRtns.findAll(db, cfg.alertCollections, { region: args.region }, {});
        //console.log(alerts);
        //console.log(args.region);
        return await alerts;
    },
    alertsforsubregion: async (args) => {
        let db = await dbRtns.getDBInstance();
        let alerts = await dbRtns.findAll(db, cfg.alertCollections, { subregion: args.subregion }, {});
        //console.log(alerts);
        //console.log(args.region);
        return await alerts;
    },
    regions: async () => {
        let db = await dbRtns.getDBInstance();
        return await dbRtns.findUniqueValues(db, cfg.alertCollections, "region");
    },
    subregions: async () => {
        let db = await dbRtns.getDBInstance();
        return await dbRtns.findUniqueValues(db, cfg.alertCollections, "subregion");
    },
};
export { resolvers }; 