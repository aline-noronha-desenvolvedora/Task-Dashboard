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
    orderBy,
    orderDirection,
    page = 1,
    limit = 10
) {
    const { userId, title, status } = filters;

    const skip = (page - 1) * limit;

    const tasks = await prisma.task.findMany({
        where: {
            userId,
            ...(title ? { title: { contains: title } } : {}),
            ...(status ? { status } : {})
        },
        orderBy: orderBy ? { [orderBy]: orderDirection || "asc" } : undefined,
        skip,
        take: limit
    });

    const total = await prisma.task.count({
        where: {
            userId,
            ...(title ? { title: { contains: title } } : {}),
            ...(status ? { status } : {})
        }
    });

    return {
        tasks,
        total,
        page,
        totalPages: Math.ceil(total / limit)
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
