import prisma from "../config/prisma.js";
async function findByEmail(email) {
    return await prisma.user.findUnique({ where: { email } });
}

async function findById(id) {
    return await prisma.user.findUnique({ where: { id: Number(id) } });
}

async function create(user) { 
    return await prisma.user.create({ data: user }); 
}

async function update(id, data) {
    return await prisma.user.update({
        where: { id: Number(id) },
        data
    });
}

async function deleteUser(id) {
    return await prisma.user.delete({
        where: { id: Number(id) }
    });
}

export default { create, findByEmail, findById, update, deleteUser };
