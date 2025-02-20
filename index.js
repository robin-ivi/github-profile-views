require("dotenv").config(); // Load environment variables

const express = require("express");
const cors = require("cors");
const Redis = require("ioredis");

const app = express();
app.use(cors());

const redis = new Redis(process.env.REDIS_URL); // Connect to Vercel KV Redis

app.get("/views", async (req, res) => {
    try {
        let views = await redis.get("views");
        views = views ? parseInt(views) + 1 : 1; // Increment view count
        await redis.set("views", views);
        res.json({ views });
    } catch (error) {
        console.error("Redis Error:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
