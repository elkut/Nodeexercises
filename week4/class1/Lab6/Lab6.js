import { getJSONFromWWWPromise } from "./iso_country_routines.js";
import * as dbRtns from "./db_routines.js";
import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import * as cfg from "./config.js";

const argv = yargs(hideBin(process.argv))
    .options({
        code: {
            demandOption: true,
            alias: "c",
            describe: "country code?",
            string: true,
        }
    })
    .help()
    .alias("help", "h")
    .parse();


(async () => {
    try {
        let rawData = await getJSONFromWWWPromise(cfg.isodata);

        let countires = rawData.map(country => ({
            name: country.name,
            'alpha-2': country['alpha-2']
        }));

        const db = await dbRtns.getDBInstance();
        // clean out collection before adding new users
        let results = await dbRtns.deleteAll(db, cfg.collections);
        console.log(
            `deleted ${results.deletedCount} documents from ${cfg.collections} collection`
        );

        results = await dbRtns.addMany(db, cfg.collections, countires
        );
        console.log(
            `There are currently ${results.insertedCount} documents to the ${cfg.collections} collection`
        );
        let someCountry = await dbRtns.findOne(db, cfg.collections, { ['alpha-2']: argv.code });
        if (someCountry) {
            console.log(`The code ${argv.code} belongs to the country of ${someCountry.name}`);
        }
        else {
            console.log(`The code ${argv.code} is not a known country alpha-3 code`);
        }

        process.exit(0);
    } catch (error) {
        console.log(error);
        process.exit(1);
        //=> 'Internal server error ...'
    }
})(); // IIFE