import { Router } from "express";
import {
    createTask,
    getTaskById,
    updateTask,
    deleteTask,
} from "../controllers/taskController.js";
import { getFilteredTasks } from "../controllers/taskFilterController.js";
import { healthCheck } from "../controllers/healthController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = Router();

router.get("/health", healthCheck);

router.post("/tasks", authMiddleware, createTask);
router.get("/tasks/:id", authMiddleware, getTaskById);
router.put("/tasks/:id", authMiddleware, updateTask);
router.delete("/tasks/:id", authMiddleware, deleteTask);

router.get("/tasks", authMiddleware, getFilteredTasks);

export default router;
