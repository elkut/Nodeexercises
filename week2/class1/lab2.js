import yargs from "yargs";
import { hideBin } from "yargs/helpers";
//import { provinces, fullNameAndProvincePromise, transferPaymentFromWebPromise, transferPaymentForProvincePromise, currencyFormatter } from "./lab2_routines.js";
// Note: hideBin is a shorthand for process.argv.slice(2)
// - bypass the first two arguments
import * as lab2Routines from "./lab2_routines.js";

const {
    provinces,
    fullNameAndProvincePromise,
    transferPaymentFromWebPromise,
    transferPaymentForProvincePromise,
    currencyFormatter
} = lab2Routines;


const argv = yargs(hideBin(process.argv))
    .options({
        firstname: {
            demandOption: true,
            alias: "fname",
            describe: "Resident's first name",
            string: true,
        },
        lastname: {
            demandOption: true,
            alias: "lname",
            describe: "Resident's last name",
            string: true,
        },
        province: {
            demandOption: true,
            alias: "prov",
            describe: "Resident's home province",
            string: true,
            choices: provinces.map((province) => province.code), // Use province codes as choices
        },
    })
    .help()
    .alias("help", "h")
    .parse();

let message;

fullNameAndProvincePromise(argv.firstname, argv.lastname, argv.province)
    .then((results) => {
        console.log("Lab 2\n");
        message = `${results.fname}, ${results.lname} lives in ${results.provinceName}.`;
    })
    .then(() => {
        return transferPaymentFromWebPromise();
    })
    .then((data) => {
        return transferPaymentForProvincePromise(data, argv.province);
    })
    .then((payment) => {
        console.log(`${message} It recevied ${currencyFormatter(payment)} in transfer payments.`);
    })
    .catch((err) => {
        console.log(`Error ==> ${err}`);
    });
