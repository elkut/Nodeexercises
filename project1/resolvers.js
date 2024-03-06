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
        return await alerts;
    },
    alertsforregion: async (args) => {
        let db = await dbRtns.getDBInstance();
        let alerts = await dbRtns.findAll(db, cfg.alertCollections, { region: args.region }, {});
        return await alerts;
    },
    alertsforsubregion: async (args) => {
        let db = await dbRtns.getDBInstance();
        let alerts = await dbRtns.findAll(db, cfg.alertCollections, { subregion: args.subregion }, {});
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
    addAdvisories: async args => {
        let db = await dbRtns.getDBInstance();
        let advisor = { name: args.name, country: args.country, text: args.text, date: args.date };

        try {
            let results = await dbRtns.addOne(db, cfg.advisories, advisor);
            return advisor;
        } catch (error) {
            console.error("Error adding advisor:", error);
            return null;
        }
    },
    advisoriesByName: async (args) => {
        let db = await dbRtns.getDBInstance();
        let advisories = await dbRtns.findAll(db, cfg.advisories, { name: args.name }, {});
        return await advisories;
    },
    advisories: async () => {
        let db = await dbRtns.getDBInstance();
        let advisories = await dbRtns.findAll(db, cfg.advisories, {}, {});
        return await advisories;
    },
    advisoriesUniqueName: async () => {
        let db = await dbRtns.getDBInstance();
        return await dbRtns.findUniqueValues(db, cfg.advisories, "name");
    },
};
export { resolvers }; 