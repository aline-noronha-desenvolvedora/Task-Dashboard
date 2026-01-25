import prisma from "../config/prisma.js";

async function create(data) {
    return await prisma.task.create({ data });
}

async function findById(id, userId) {
    return await prisma.task.findFirst({
        where: { id: Number(id), userId }
    });
}

async function findByFilters(filters, orderBy) {
    const { userId, title, completed } = filters;

    return await prisma.task.findMany({
        where: {
            userId,
            ...(title ? { title: { contains: title } } : {}),
            ...(completed !== undefined ? { completed: completed === "true" } : {})
        },
        orderBy: orderBy ? { createdAt: orderBy } : undefined
    });
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

export default { create, findById, findByFilters, update, remove };
