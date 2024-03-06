const schema = `
type Query {
project1_setup(results: String): Result,
alerts: [Alert],
alertsforregion(region: String): [Alert],
alertsforsubregion(subregion: String): [Alert],
regions: [String],
subregions: [String]
},
type Result {
results: String
},
type Alert {
country: String
name: String
text: String
date: String
region: String
subregion: String
},
`;
export { schema };
