import express from "express";

const app = express();

app.get("/api/health", (req, res) => {
    res.status(200).json({
        status: "ok",
        message: "Server is healthy"
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});
