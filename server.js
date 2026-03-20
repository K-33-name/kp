const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());
app.use(express.static("public"));

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "userDB"
});

db.connect(err => {
    if (err) throw err;
    console.log("Connected to MySQL");
});

// Insert data
app.post("/addUser", (req, res) => {
    const { name, email } = req.body;

    db.query(
        "INSERT INTO users (name, email) VALUES (?, ?)",
        [name, email],
        (err) => {
            if (err) throw err;
            res.send("User added");
        }
    );
});

// Fetch data
app.get("/users", (req, res) => {
    db.query("SELECT * FROM users", (err, result) => {
        if (err) throw err;
        res.json(result);
    });
});

app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});