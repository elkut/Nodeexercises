// Load the got module
import got from "got";
// Lets try to make a HTTP GET request to GOC's website and get some transfer info in JSON.
const covid_19 = async () => {
    const srcAddr =
        "https://raw.githubusercontent.com/owid/covid-19-data/master/public/data/latest/owid-covid-latest.json";
    try {
        const response = await got(srcAddr, { responseType: "json" });

        let total = response.body.CAN["total_cases"];
        let date = response.body.CAN["last_updated_date"];

        // dump to the console using template literal
        console.log(`Canada's total COVID-19 case till date of ${date} is ${total}`);
    } catch (error) {
        console.log(error);
        //=> 'Internal server error ...'
    }
};
covid_19();