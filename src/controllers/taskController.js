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
        res.status(500).json({ error: "Error to create task" });
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
        res.status(500).json({ error: "Error to get task by id" });
    }
};

export const updateTask = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description, status, category, completedAt } = req.body;

        const error = validateTaskUpdate({ status, completedAt });
        if (error) return res.status(400).json({ error });

        const updatedTask = await prisma.task.update({
            where: { id: Number(id) },
            data: {
                title,
                description,
                status,
                category,
                completedAt: status === "completed" ? completedAt || new Date() : null,
            },
        });

        res.json(updatedTask);
    } catch {
        res.status(500).json({ error: "Error to update task" });
    }
};

export const deleteTask = async (req, res) => {
    try {
        const { id } = req.params;
        await prisma.task.delete({ where: { id: Number(id), userId: req.user.id } });
        res.json({ message: "Task successfully deleted." });
    } catch {
        res.status(500).json({ error: "Error to delete task" });
    }
};
