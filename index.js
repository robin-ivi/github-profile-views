const express = require("express");
const cors = require("cors");
const Redis = require("ioredis");
require("dotenv").config();

const app = express();
app.use(cors());

// Connect to Upstash Redis
const redis = new Redis(process.env.REDIS_URL);

app.get("/views", async (req, res) => {
    let views = await redis.get("profile_views");
    views = views ? parseInt(views) + 1 : 1;
    await redis.set("profile_views", views);
    res.json({ views });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
