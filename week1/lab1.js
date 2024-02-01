// Load the got module
import got from "got";
// Lets try to make a HTTP GET request to GOC's website and get some transfer info in JSON.
const FISCALYEAR = async () => {
    const srcAddr =
        "http://www.infrastructure.gc.ca/alt-format/opendata/transfer-program-programmes-de-transfert-bil.json";
    // Create a currency formatter.
    const formatter = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        minimumFractionDigits: 0,
    });
    try {
        const response = await got(srcAddr, { responseType: "json" });
        // strip out the Ontario amount
        let diff = 0;
        let province_1;
        let province_2;
        let abl = response.body.gtf.ab["2022-2023"];
        let bcs = response.body.gtf.bc["2022-2023"];
        if (abl > bcs) {
            diff = abl - bcs;
            province_1 = "Alberta";
            province_2 = "B.C."
        }
        else {
            diff = bcs - abl;
            province_1 = "B.C.";
            province_2 = "Alberta";
        }
        // format to currency
        abl = formatter.format(abl);
        bcs = formatter.format(bcs);
        diff = formatter.format(diff);
        // dump to the console using template literal
        console.log(`B.C.'s transfer amount for 2022-2023 was ${bcs}.`);
        console.log(`Alberta's transfer amount for 2022-2023 was ${abl}.`);
        console.log(`${province_1} received ${diff} more than ${province_2} for 2022-2023.`);

    } catch (error) {
        console.log(error);
        //=> 'Internal server error ...'
    }
};
FISCALYEAR();