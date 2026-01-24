import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const createTask = async (req, res) => {
    try {
        const { title, description, status, category, completedAt, userId } = req.body;
        const task = await prisma.task.create({
            data: { title, description, status, category, completedAt, userId },
        });
        res.status(201).json(task);
    } catch (error) {
        console.error("Erro Prisma:", error);
        res.status(500).json({ error: error.message });
    }

};

export const getTasks = async (req, res) => {
    try {
        const tasks = await prisma.task.findMany();
        res.json(tasks);
    } catch (error) {
        res.status(500).json({ error: "Erro ao buscar tarefas" });
    }
};

export const getTaskById = async (req, res) => {
    try {
        const { id } = req.params;
        const task = await prisma.task.findUnique({ where: { id: Number(id) } });
        if (!task) return res.status(404).json({ error: "Tarefa não encontrada" });
        res.json(task);
    } catch (error) {
        res.status(500).json({ error: "Erro ao buscar tarefa" });
    }
};

export const updateTask = async (req, res) => {
    try {
        const { id } = req.params;
        const data = req.body;
        const task = await prisma.task.update({
            where: { id: Number(id) },
            data,
        });
        res.json(task);
    } catch (error) {
        res.status(500).json({ error: "Erro ao atualizar tarefa" });
    }
};

export const deleteTask = async (req, res) => {
    try {
        const { id } = req.params;
        await prisma.task.delete({ where: { id: Number(id) } });
        res.json({ message: "Tarefa excluída com sucesso" });
    } catch (error) {
        res.status(500).json({ error: "Erro ao excluir tarefa" });
    }
};
