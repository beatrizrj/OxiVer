const express = require("express");
const cors = require("cors");
const sqlite3 = require("sqlite3").verbose();
const bodyParser = require("body-parser");

const app = express();
const db = new sqlite3.Database("./patients.db");

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Create Patients Table
db.run(`
    CREATE TABLE IF NOT EXISTS patients (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        sns TEXT UNIQUE,
        status TEXT
    )
`);

// Get All Patients
app.get("/patients", (req, res) => {
    db.all("SELECT * FROM patients", [], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);
    });
});

// Add New Patient
app.post("/patients", (req, res) => {
    const { name, sns } = req.body;
    db.run("INSERT INTO patients (name, sns, status) VALUES (?, ?, 'active')", [name, sns], function(err) {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ id: this.lastID, name, sns, status: "active" });
    });
});

// Update Patient Status
app.put("/patients/:id", (req, res) => {
    const { status } = req.body;
    const { id } = req.params;
    db.run("UPDATE patients SET status = ? WHERE id = ?", [status, id], function(err) {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ success: true });
    });
});

// Start Server
app.listen(3000, () => console.log("✅ Server is running on http://localhost:3000"));
