import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const getFilteredTasks = async (req, res) => {
    try {
        const { status, category, startDate, endDate, sort, order } = req.query;

        const where = { userId: req.user.id };

        if (status) where.status = status;
        if (category) where.category = category;

        if (startDate || endDate) {
            const createdAt = {};
            if (startDate && !isNaN(Date.parse(startDate))) {
                createdAt.gte = new Date(startDate);
            }
            if (endDate && !isNaN(Date.parse(endDate))) {
                createdAt.lte = new Date(endDate);
            }
            if (Object.keys(createdAt).length > 0) {
                where.createdAt = createdAt;
            }
        }

        let orderBy = { createdAt: "asc" };
        if (sort && ["createdAt", "status", "category"].includes(sort)) {
            orderBy = { [sort]: order === "desc" ? "desc" : "asc" };
        }

        const tasks = await prisma.task.findMany({ where, orderBy });
        res.json(tasks);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
