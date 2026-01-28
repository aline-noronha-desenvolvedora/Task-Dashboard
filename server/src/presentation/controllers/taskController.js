import taskService from "../../application/services/taskService.js";
import { validateTaskCreate, validateTaskUpdate } from "../../domain/validators/taskValidator.js";

export async function createTask(req, res) {
    try {
        const error = validateTaskCreate(req.body);
        if (error) return res.status(400).json({ error });

        const task = await taskService.createTask(req.body, req.user.id);
        res.status(201).json(task);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
}

export async function getTaskById(req, res) {
    try {
        const task = await taskService.getTaskById(req.params.id, req.user.id);
        if (!task) return res.status(404).json({ error: "Task not found" });
        res.json(task);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
}

export async function getAllTasks(req, res) {
    try {
        const userId = req.user.id;
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        
        const tasks = await taskService.getTasks(req.query, userId, page, limit);
        res.json(tasks);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

export async function updateTask(req, res) {
    try {
        const error = validateTaskUpdate(req.body);
        if (error) return res.status(400).json({ error });

        const task = await taskService.updateTask(
            req.params.id,
            req.body,
            req.user.id
        );
        res.json(task);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
}

export async function deleteTask(req, res) {
    try {
        await taskService.deleteTask(req.params.id, req.user.id);
        res.json({ message: "Task deleted successfully" });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
}
