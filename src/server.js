import express from "express";
import taskRoutes from "./routes/taskRoutes.js";
import healthRoutes from "./routes/healthRoutes.js";

const app = express();
app.use(express.json());

app.use("/api", taskRoutes);
app.use("/api", healthRoutes)

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});
