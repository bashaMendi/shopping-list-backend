import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const categories = [
    { name: 'מוצרי ניקיון' },
    { name: 'גבינות' },
    { name: 'ירקות ופירות' },
    { name: 'בשר ודגים' },
    { name: 'מאפים' },
];

async function main() {
    console.log(`Start seeding ...`);
    for (const c of categories) {
        const category = await prisma.category.create({
            data: c,
        });
        console.log(`Created category with id: ${category.id}`);
    }
    console.log(`Seeding finished.`);
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    }); 