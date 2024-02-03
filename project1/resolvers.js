import { loadAlerts } from "./project1_setup.js";
const resolvers = {
    project1_setup: async () => {
        return await loadAlerts();
    }
};
export { resolvers };