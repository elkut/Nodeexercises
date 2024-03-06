const schema = `
type Query {
project1_setup(results: String): Result,
alerts: [Alert],
alertsforregion(region: String): [Alert],
alertsforsubregion(subregion: String): [Alert],
regions: [String],
subregions: [String],
advisoriesByName(name: String): [Advisor],
advisories: [Advisor],
advisoriesUniqueName: [String]
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
type Advisor {
name: String,
country: String,
text: String,
date: String
},
type Mutation {
  addAdvisories(name: String, country: String, text: String, date: String): Advisor
}
`;
export { schema };
