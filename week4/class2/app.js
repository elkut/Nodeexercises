import { port } from "./config.js";
import express from "express";
import router from "./routes.js";
const app = express();
app.get("/", (req, res) => {
    res.send("\n\nHello world!\n\n");
});
app.listen(port, () => {
    console.log(`listening on port ${port}`);
});
app.use((req, res, next) => {
    console.log('Time:', new Date() + 3600000 * -5.0); // GMT-->EST
    next();
});
app.use(express.static('public'));
app.use("/thisapp", router);

app.use((err, req, res, next) => {
    // Do logging and user-friendly error message display
    console.error(err);
    res.status(500).send('internal server error');
});
