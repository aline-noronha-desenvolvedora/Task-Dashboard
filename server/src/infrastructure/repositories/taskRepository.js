import prisma from "../config/prisma.js";

async function create(data) {
    return await prisma.task.create({ data });
}

async function findById(id, userId) {
    return await prisma.task.findFirst({
        where: { id: Number(id), userId }
    });
}

async function findByFilters(
    filters,
    orderBy = "createdAt",
    orderDirection = "desc",
    page = 1,
    limit = 10
) {
    const { userId, status, category, date } = filters;
    const skip = (Number(page) - 1) * Number(limit);
    const take = Number(limit);

    const where = {
        userId: userId,
        ...(status && status !== "all" && { status }),
        ...(category && { category }),
        ...(date && date !== "" && {
            createdAt: new Date(date + "T00:00:00.000Z")
        })
    };

    const [tasks, total] = await prisma.$transaction([
        prisma.task.findMany({
            where,
            orderBy: { [orderBy]: orderDirection },
            skip,
            take
        }),
        prisma.task.count({ where })
    ]);

    return {
        tasks,
        total,
        page: Number(page),
        totalPages: Math.ceil(total / take)
    };
}

async function update(id, data, userId) {
    return await prisma.task.update({
        where: { id: Number(id), userId },
        data
    });
}

async function remove(id, userId) {
    return await prisma.task.delete({
        where: { id: Number(id), userId }
    });
}

export default {
    create,
    findById,
    findByFilters,
    update,
    remove
};