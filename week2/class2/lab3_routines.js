import got from "got";
const provinces = [
    { code: "NS", name: "Nova Scotia" },
    { code: "NL", name: "Newfoundland" },
    { code: "NB", name: "New Brunswick" },
    { code: "PE", name: "Prince Edward Island" },
    { code: "QC", name: "Quebec" },
    { code: "ON", name: "Ontario" },
    { code: "MB", name: "Manitoba" },
    { code: "SK", name: "Saskatchewan" },
    { code: "AB", name: "Alberta" },
    { code: "BC", name: "British Columbia" },
    { code: "NT", name: "North West Territories" },
    { code: "NU", name: "Nunavut" },
    { code: "YT", name: "Yukon Territory" },
];
const FISCALYEAR = "2022-2023";
// Create a currency formatter.
const currencyFormatter = (numberToFormat) =>
    new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        minimumFractionDigits: 0,
    }).format(numberToFormat);


const fullNameAndProvincePromise = (fname, lname, provinceCode) => {
    return new Promise((resolve, reject) => {
        if (fname === " " || lname === " " || provinceCode === " ") {
            // Reject the Promise with an error
            reject('some error');
        }
        else {
            const provinceName = provinces.find((province) => province.code === provinceCode).name;
            // Resolve (or fulfill) the Promise with data
            let data = { fname, lname, provinceName };
            resolve(data);
        }
    });
};

const transferPaymentFromWebPromise = () => {
    let srcAddr =
        "http://www.infrastructure.gc.ca/alt-format/opendata/transfer-program-programmes-de-transfert-bil.json";
    return new Promise((resolve, reject) => {
        got(srcAddr, { responseType: "json" })
            .then((response) => {
                let gocData = response.body.gtf;
                //console.log(gocData)
                resolve(gocData);
            })
            .catch((err) => {
                console.log(`Error ==> ${err}`);
                reject(err);
            });
    });
};

const transferPaymentForProvincePromise = (gocData, provinceCode) => {
    return new Promise((resolve, reject) => {
        if (!gocData || !provinceCode) {
            // Reject the Promise with an error
            reject('error');
        } else {
            // Resolve (or fulfill) the Promise with data
            const prov = provinceCode.toLowerCase();

            if (gocData[prov] && gocData[prov][FISCALYEAR]) {
                let payment = gocData[prov][FISCALYEAR];
                resolve(payment);
            } else {
                reject('Error: Province data or fiscal year not found.');
            }
        }
    });
};

export {
    provinces,
    currencyFormatter,
    fullNameAndProvincePromise,
    transferPaymentFromWebPromise,
    transferPaymentForProvincePromise
};