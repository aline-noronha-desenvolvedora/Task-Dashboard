import express from "express";
import cors from "cors";

import authRoutes from "./presentation/routes/authRoutes.js";
import taskRoutes from "./presentation/routes/taskRoutes.js";
import healthRoutes from "./presentation/routes/healthRoutes.js";

const app = express();

app.use(cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}));

app.use(express.json());

app.use("/api", authRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api", healthRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});
