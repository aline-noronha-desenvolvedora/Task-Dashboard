import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

function daysAgo(numDays) {
    const d = new Date();
    d.setDate(d.getDate() - numDays);
    return d;
}

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

    const tasks = [
        {
            title: "Study",
            description: "Dedicate to focused on study",
            status: "pending",
            category: "Personal Growth",
            createdAt: new Date("2026-01-27"),
            completedAt: null,
        },
        {
            title: "Run 5 km",
            description: "Go for a 5 km run to stay healthy",
            status: "in_progress",
            category: "Fitness",
            createdAt: new Date("2026-01-28"),
            completedAt: null,
        },
        {
            title: "Read",
            description: "Spend time to reading a book or article.",
            status: "completed",
            category: "Personal Growth",
            createdAt: new Date("2026-01-25"),
            completedAt: daysAgo(2),
        },
        {
            title: "Drink water",
            description: "Drink water to stay hydrated.",
            status: "completed",
            category: "Health",
            createdAt: new Date("2026-01-23"),
            completedAt: daysAgo(3),
        },
        {
            title: "Sleep 8 hours a day",
            description: "Sleeping to improve health.",
            status: "in_progress",
            category: "Health",
            createdAt: new Date("2026-01-28"),
            completedAt: null,
        },
        {
            title: "Meditate",
            description: "Practice mindfulness meditation.",
            status: "pending",
            category: "Wellness",
            createdAt: new Date("2026-01-28"),
            completedAt: null,
        },
        {
            title: "Finish project report",
            description: "Complete the final draft of the project report.",
            status: "in_progress",
            category: "Work",
            createdAt: new Date("2026-01-28"),
            completedAt: null,
        }
    ];

    for (const task of tasks) {
        await prisma.task.upsert({
            where: { title: task.title },
            update: {
                status: task.status,
                createdAt: task.createdAt,
                completedAt: task.completedAt,
            },
            create: {
                ...task,
                userId: admin.id,
            },
        });
    }

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
