const express = require("express");
const cors = require("cors");
const { kv } = require("@vercel/kv");

const app = express();
app.use(cors());

app.get("/views", async (req, res) => {
    let views = await kv.get("profile_views") || 0;
    views++;
    await kv.set("profile_views", views);
    res.json({ views });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
