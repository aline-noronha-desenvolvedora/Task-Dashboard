import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
    const hashedPassword = await bcrypt.hash("Admin123!", 10);

    const admin = await prisma.user.upsert({
        where: { email: "admin@taskdashboard.com" },
        update: {},
        create: {
            name: "Admin User",
            email: "admin@taskdashboard.com",
            passwordHash: hashedPassword,
        },
    });

    console.log("Admin user ready:", admin);

    await prisma.task.upsert({
        where: { title: "Study for 1 hour" },
        update: {
            status: "pending",
            completedAt: null,
        },
        create: {
            title: "Study for 1 hour",
            description: "Dedicate one hour to focused study every day",
            status: "pending",
            category: "personal development",
            completedAt: null,
            userId: admin.id,
        },
    });

    await prisma.task.upsert({
        where: { title: "Run 5 km" },
        update: {
            status: "in_progress",
            completedAt: null,
        },
        create: {
            title: "Run 5 km",
            description: "Go for a 5 km run to stay healthy",
            status: "in_progress",
            category: "fitness",
            completedAt: null,
            userId: admin.id,
        },
    });

    await prisma.task.upsert({
        where: { title: "Read for 1 hour" },
        update: {
            status: "completed",
            completedAt: new Date(),
        },
        create: {
            title: "Read for 1 hour",
            description: "Spend one hour reading a book or article",
            status: "completed",
            category: "personal growth",
            completedAt: new Date(),
            userId: admin.id,
        },
    });

    console.log("Tasks ready!");
}

main()
    .then(() => {
        console.log("Seed finished successfully ✅");
    })
    .catch((e) => {
        console.error("Seed failed ❌", e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
