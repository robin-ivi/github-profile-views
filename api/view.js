require("dotenv").config(); // Load environment variables

const express = require("express");
const cors = require("cors");
const Redis = require("ioredis");

const app = express();
app.use(cors());

// Connect to Upstash Redis
const redis = new Redis(process.env.REDIS_URL);

app.get("/api/views", async (req, res) => {
    try {
        let views = await redis.get("views");
        views = views ? parseInt(views) + 1 : 1;
        await redis.set("views", views);
        res.json({ views });
    } catch (error) {
        console.error("Redis Error:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

module.exports = app;  // ✅ Export the app (Important for Vercel)
