const { createCanvas } = require("canvas");

app.get("/count", (req, res) => {
    const width = 200, height = 50;
    const canvas = createCanvas(width, height);
    const ctx = canvas.getContext("2d");

    // Background
    ctx.fillStyle = "#f0f0f0";
    ctx.fillRect(0, 0, width, height);

    // Text
    ctx.fillStyle = "#333";
    ctx.font = "20px Arial";
    ctx.fillText(`Visitors: ${visitCount}`, 50, 30);

    res.setHeader("Content-Type", "image/png");
    res.setHeader("Cache-Control", "no-cache");
    res.send(canvas.toBuffer("image/png"));
});
