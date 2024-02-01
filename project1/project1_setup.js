import getJSONFromWWWPromise from "./utilities.js";
import * as cfg from "./config.js";
import * as dbRtns from "./db_routines.js";
import yargs from "yargs";
import { hideBin } from "yargs/helpers";

const argv = yargs(hideBin(process.argv))
    .options({
        code: {
            demandOption: false,
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
        let isoData = await getJSONFromWWWPromise(cfg.isodata);
        let alertJson = await getJSONFromWWWPromise(cfg.alertdata);

        let countriesArray = [];
        for (var i = 0; i < Object.keys(isoData).length; i++) {
            // look for the entry with a matching `code` value
            let code = isoData[i]['alpha-2']
            let result;
            if (alertJson.data[code]) {
                result = {
                    country: code,
                    name: isoData[i]['name'],
                    text: alertJson.data[code]["eng"]["advisory-text"],
                    date: alertJson.data[code]["date-published"]['date'],
                    region: isoData[i]["region"],
                    subregion: isoData[i]["sub-region"]
                }
            } else {
                result = {
                    country: code,
                    name: isoData[i]['name'],
                    text: "No travel alerts”",
                    date: "",
                    region: isoData[i]["region"],
                    subregion: isoData[i]["sub-region"]
                }
            }
            countriesArray.push(result);
        }

        const db = await dbRtns.getDBInstance();
        // clean out collection before adding new users
        let results = await dbRtns.deleteAll(db, cfg.alertCollections);

        results = await dbRtns.addMany(db, cfg.alertCollections, countriesArray
        );
        console.log(
            `There are currently ${results.insertedCount} documents to the Alert Collections collection`
        );
        process.exit(0);

    } catch (error) {
        console.log(error);
        process.exit(1);
    }
})(); // IIFE