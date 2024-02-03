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

const loadAlerts = async () => {
    let results = "";
    try {

        const db = await dbRtns.getDBInstance();
        // clean out collection before adding new users
        let r = await dbRtns.deleteAll(db, cfg.alertCollections);

        results = `Deleted ${r.deletedCount} existing documents from alerts collection.`
        let isoData = await getJSONFromWWWPromise(cfg.isodata);
        let alertJson = await getJSONFromWWWPromise(cfg.alertdata);
        if (isoData !== null && alertJson !== null) {
            // console.log(`Retrived Alert JSON from remote web site.`);
            // console.log(`Retrived Country JSON from GitHub.`);
            results += "Retrived Alert JSON from remote web site."
            results += "Retrived Country JSON from GitHub."
        }
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


        r = await dbRtns.addMany(db, cfg.alertCollections, countriesArray
        );
        // console.log(
        //     `There are currently ${r.insertedCount} documents to the Alert Collections collection.`
        // );
        results += `There are currently ${r.insertedCount} documents to the Alert Collections collection.`

    } catch (error) {
        console.log(error);
    } finally {
        return { results: results };
    }
};

export { loadAlerts };