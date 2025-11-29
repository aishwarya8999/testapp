const express = require("express");
const app = express();
const path = require("path");
const MongoClient = require("mongodb").MongoClient;

const PORT = 5050;
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static('public'));


const MONGO_URL = process.env.MONGO_URL || "mongodb://admin:qwerty@localhost:27017"; 
const client = new MongoClient(MONGO_URL);


async function connectDB() {
    await client.connect();
    console.log("Connected to MongoDB");
    console.log(`Attempting connection with URL: ${MONGO_URL}`); 
}
connectDB();



// GET all users
app.get("/getUsers", async (req, res) => {
    const db = client.db("apnacollege-db");
    const data = await db.collection("users").find({}).toArray();
    res.json(data);
});

// POST new user
app.post("/addUser", async (req, res) => {
    const userObj = req.body;

    const db = client.db("apnacollege-db");
    const result = await db.collection("users").insertOne(userObj);

    console.log("User inserted:", result.insertedId);
    res.send("User added successfully");
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});