const express = require("express");
const fs = require("fs");
const app = express();
const PORT = process.env.PORT || 3000;

// File to store visitor count
const COUNT_FILE = "count.txt";

// Read visitor count from file or initialize
let visitCount = 0;
if (fs.existsSync(COUNT_FILE)) {
    visitCount = parseInt(fs.readFileSync(COUNT_FILE, "utf8")) || 0;
}

app.get("/", (req, res) => {
    visitCount++;
    fs.writeFileSync(COUNT_FILE, visitCount.toString());
    res.send(`Total Visitors: ${visitCount}`);
});

app.get("/count", (req, res) => {
    res.json({ visitors: visitCount });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
