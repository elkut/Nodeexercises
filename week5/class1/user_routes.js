import * as dbRtns from "./db_routines.js";
import * as cfg from "./config.js";
import { Router } from "express";
const user_router = Router();
// define a default route to retrieve all users
user_router.get("/", async (req, res) => {
    try {
        let db = await dbRtns.getDBInstance();
        let users = await dbRtns.findAll(db, cfg.collection);
        res.status(200).send({ users: users });
    } catch (err) {
        console.log(err.stack);
        res.status(500).send("get all users failed - internal server error");
    }
});

user_router.put("/", async (req, res) => {
    try {
        const userData = req.body; // The user data from the request body
        let db = await dbRtns.getDBInstance(); // Get the DB instance
        const result = await dbRtns.addOne(db, cfg.collection, userData); // Add user to the collection
        res.status(200).send({ user: result }); // Respond on success
    } catch (err) {
        console.log(err.stack);
        res.status(500).send("Failed to add user - internal server error"); // Respond on error
    }
});

user_router.get("/:name", async (req, res) => {
    try {
        let db = await dbRtns.getDBInstance(); // Get the DB instance
        let name = req.params.name;
        console.log(name);
        let someUser = await dbRtns.findOne(db, cfg.collection, { name: name });
        if (someUser === null) {
            // No document was deleted, implying the user did not exist
            res.status(404).send({ message: "User not found" });
        } else {
            // A document was deleted
            res.status(200).send({ user: someUser });
        }
        //res.status(200).send({ user: someUser }); // Respond on success
    } catch (err) {
        console.log(err.stack);
        res.status(500).send("Failed to add user - internal server error"); // Respond on error
    }
});

user_router.post("/", async (req, res) => {
    try {
        const userData = req.body; // The user data from the request body
        let db = await dbRtns.getDBInstance(); // Get the DB instance
        const filter = { name: userData.name };
        const update = { age: userData.age, email: userData.email }; // Update document with the provided userData
        let updateResults = await dbRtns.updateOne(db, cfg.collection, filter, update);
        // Determine the success message based on updateResults
        let msg = updateResults.lastErrorObject.updatedExisting
            ? `User data for ${userData.email} was updated`
            : `User data was not found for update`;
        res.status(200).send({ msg: msg });

    } catch (err) {
        console.log(err.stack);
        res.status(500).send("Failed to add user - internal server error"); // Respond on error
    }
});

user_router.delete("/:name", async (req, res) => {
    try {
        let db = await dbRtns.getDBInstance(); // Get the DB instance
        let name = req.params.name;
        console.log(name);
        let deleteResult = await dbRtns.deleteOne(db, cfg.collection, { name: name });
        if (deleteResult.deletedCount === 0) {
            // No document was deleted, implying the user did not exist
            res.status(404).send({ message: "User not found and was not deleted" });
        } else {
            // A document was deleted
            res.status(200).send({ message: "User successfully deleted" });
        }
    } catch (err) {
        console.log(err.stack);
        res.status(500).send("Failed to delete user - internal server error"); // Respond on error
    }
});

export default user_router;