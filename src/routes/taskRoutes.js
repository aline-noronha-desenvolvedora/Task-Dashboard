import { Router } from "express";
import {
    createTask,
    getTasks,
    getTaskById,
    updateTask,
    deleteTask,
} from "../controllers/taskController.js";
import {healthCheck} from "../controllers/healthController.js";

const router = Router();

router.get("/health", healthCheck);
router.post("/tasks", createTask);      
router.get("/tasks", getTasks);         
router.get("/tasks/:id", getTaskById);  
router.put("/tasks/:id", updateTask);   
router.delete("/tasks/:id", deleteTask);

export default router;
