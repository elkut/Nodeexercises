import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import * as rtnLib from "./iso_country_routines.js";
import * as cfg from "./config.js";

const argv = yargs(hideBin(process.argv))
    .options({
        refresh: {
            demandOption: false,
            alias: "r",
            describe: "is a fresh copy from the web required?",
            string: true,
        }
    })
    .help()
    .alias("help", "h")
    .parse();


const dotEnvWrite = async (userInput) => {
    let fileStats;

    try {
        fileStats = await rtnLib.fileStatsFromFSPromise(cfg.contriesobjects);

        if (!fileStats || userInput != null) {
            let data = await rtnLib.getJSONFromWWWPromise(cfg.rawdata);
            await rtnLib.writeFileFromFSPromise(cfg.contriesobjects, data);
            let counter = await rtnLib.readFileFromFSPromise(cfg.contriesobjects);
            console.log(`A new ${cfg.contriesobjects} was written`);
            let getTime = await rtnLib.fileStatsFromFSPromise(cfg.contriesobjects)
            console.log(`${cfg.contriesobjects} was created on ${getTime.ctime}`);
            console.log(`There are ${counter} codes in ${cfg.contriesobjects}`);
        }
        else {
            let counter = await rtnLib.readFileFromFSPromise(cfg.contriesobjects);
            console.log(`An existing ${cfg.contriesobjects} already exists`);
            console.log(`${cfg.contriesobjects} was created on ${fileStats.ctime}`);
            console.log(`There are ${counter} codes in ${cfg.contriesobjects}`);
        }
    } catch (err) {
        console.log(err);
        console.log(`${cfg.contriesobjects} was created on ${fileStats.ctime}`);
    }
};

dotEnvWrite(argv.refresh);
