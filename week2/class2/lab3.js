import yargs from "yargs";
import { hideBin } from "yargs/helpers";
//import { provinces, fullNameAndProvincePromise, transferPaymentFromWebPromise, transferPaymentForProvincePromise, currencyFormatter } from "./lab2_routines.js";
// Note: hideBin is a shorthand for process.argv.slice(2)
// - bypass the first two arguments
import * as lab3Routines from "./lab3_routines.js";

const {
    provinces,
    fullNameAndProvincePromise,
    transferPaymentFromWebPromise,
    transferPaymentForProvincePromise,
    currencyFormatter
} = lab3Routines;

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

const userInput = async () => {
    try {
        console.log("Lab 2\n");
        let results = await fullNameAndProvincePromise(argv.firstname, argv.lastname, argv.province);
        message = `${results.fname}, ${results.lname} lives in ${results.provinceName}.`;
        results = await transferPaymentFromWebPromise();
        results = await transferPaymentForProvincePromise(results, argv.province);
        console.log(`${message} It recevied ${currencyFormatter(results)} in transfer payments.`);
    } catch (err) {
        console.log(err);
    }
};



const allProvincesPayment = async (provinces) => {
    try {
        let data = await transferPaymentFromWebPromise();
        let results = await Promise.allSettled(
            provinces.map((province) => transferPaymentForProvincePromise(data, province.code))
        );
        console.log(`\nTransfer Payments by Province/Territory\n`);

        results.forEach((result, index) => {
            if (result.status === 'fulfilled') {
                if (provinces[index].code === argv.province) {
                    // console.log(argv.province.toLowerCase());
                    console.log(`\x1b[1m${provinces[index].name} had a transfer payment of ${currencyFormatter(result.value)}`);
                }
                else {
                    console.log(`\x1b[0m${provinces[index].name} had a transfer payment of ${currencyFormatter(result.value)}`);
                }
            } else {
                console.log(`${provinces[index].name}: Error - ${result.reason}`);
            }
        });
    } catch (err) {
        // reject
        console.log(err.reverseresults);
    }
};
userInput();
allProvincesPayment(provinces);

//console.log(`${argv.firstname}, ${argv.lastname} ${argv.province}`);