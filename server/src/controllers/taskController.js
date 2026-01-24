import { PrismaClient } from "@prisma/client";
import { validateTaskCreate, validateTaskUpdate } from "../utils/validateTask.js";

const prisma = new PrismaClient();

export const createTask = async (req, res) => {
    try {
        const { title, description, status, category, completedAt } = req.body;

        const error = validateTaskCreate({ title, status, completedAt });
        if (error) return res.status(400).json({ error });

        const task = await prisma.task.create({
            data: {
                title,
                description,
                status,
                category,
                completedAt: status === "completed" ? completedAt || new Date() : null,
                userId: req.user.id,
            },
        });

        res.status(201).json(task);
    } catch {
        res.status(500).json({ error: "Error creating task" });
    }
};

export const getTaskById = async (req, res) => {
    try {
        const { id } = req.params;
        const task = await prisma.task.findFirst({
            where: { id: Number(id), userId: req.user.id },
        });
        if (!task) return res.status(404).json({ error: "Task not found" });
        res.json(task);
    } catch {
        res.status(500).json({ error: "Error getting task by id" });
    }
};

export const updateTask = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description, status, category, completedAt } = req.body;

        const error = validateTaskUpdate({ status, completedAt });
        if (error) return res.status(400).json({ error });

        const updatedTask = await prisma.task.updateMany({
            where: { id: Number(id), userId: req.user.id },
            data: {
                title,
                description,
                status,
                category,
                completedAt: status === "completed" ? completedAt || new Date() : null,
            },
        });

        if (updatedTask.count === 0) {
            return res.status(404).json({ error: "Task not found" });
        }

        res.json({ message: "Task updated successfully" });
    } catch {
        res.status(500).json({ error: "Error updating task" });
    }
};

export const deleteTask = async (req, res) => {
    try {
        const { id } = req.params;

        const deletedTask = await prisma.task.deleteMany({
            where: { id: Number(id), userId: req.user.id },
        });

        if (deletedTask.count === 0) {
            return res.status(404).json({ error: "Task not found" });
        }

        res.json({ message: "Task successfully deleted." });
    } catch {
        res.status(500).json({ error: "Error deleting task" });
    }
};
