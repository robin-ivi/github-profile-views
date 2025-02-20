const express = require("express");
const cors = require("cors");
const fs = require("fs");

const app = express();
app.use(cors());

const filePath = "views.json";

app.get("/views", (req, res) => {
    let data = { views: 0 };
    if (fs.existsSync(filePath)) {
        data = JSON.parse(fs.readFileSync(filePath));
    }
    data.views += 1;
    fs.writeFileSync(filePath, JSON.stringify(data));
    res.json({ views: data.views });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
