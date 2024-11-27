const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Initialize SQLite database
const db = new sqlite3.Database("users.db", (err) => {
    if (err) {
        console.error("Error opening database:", err.message);
    } else {
        console.log("Connected to SQLite database.");
        db.run(
            `CREATE TABLE IF NOT EXISTS users (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                username TEXT UNIQUE,
                password TEXT
            )`
        );
    }
});

// Register endpoint
app.post("/register", (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(400).json({ message: "Username and password are required." });
    }

    const query = "INSERT INTO users (username, password) VALUES (?, ?)";
    db.run(query, [username, password], (err) => {
        if (err) {
            if (err.code === "SQLITE_CONSTRAINT") {
                return res.status(409).json({ message: "Username already exists." });
            }
            return res.status(500).json({ message: "Database error." });
        }
        res.status(201).json({ message: "Account created successfully!" });
    });
});

// Login endpoint
app.post("/login", (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(400).json({ message: "Username and password are required." });
    }

    const query = "SELECT * FROM users WHERE username = ? AND password = ?";
    db.get(query, [username, password], (err, row) => {
        if (err) {
            return res.status(500).json({ message: "Database error." });
        }

        if (row) {
            res.status(200).json({ message: "Login successful!" });
        } else {
            res.status(401).json({ message: "Invalid username or password." });
        }
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});