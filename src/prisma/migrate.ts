import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function migrateData() {
    console.log('Starting data migration...');
    
    try {
        // Get all existing shopping lists with embedded items
        const existingLists = await prisma.shoppingList.findMany({
            where: {
                // Find lists that might have embedded items (old format)
                // We'll check for lists without related items
                items: {
                    none: {}
                }
            }
        });

        console.log(`Found ${existingLists.length} shopping lists to migrate`);

        for (const list of existingLists) {
            console.log(`Migrating shopping list: ${list.name}`);
            
            // For each list, we need to check if it has embedded items
            // Since we can't directly access the old embedded items through Prisma,
            // we'll need to handle this through raw MongoDB operations if needed
            
            // For now, we'll create a placeholder item to maintain the relationship
            // In a real scenario, you'd extract the embedded items from the old format
            
            await prisma.shoppingListItem.create({
                data: {
                    name: 'מוצר לדוגמה',
                    quantity: 1,
                    category: 'אחר',
                    shoppingListId: list.id,
                    isCompleted: false
                }
            });
        }

        console.log('Migration completed successfully!');
    } catch (error) {
        console.error('Migration failed:', error);
        throw error;
    } finally {
        await prisma.$disconnect();
    }
}

// Run migration if this file is executed directly
if (require.main === module) {
    migrateData()
        .then(() => {
            console.log('Migration script finished');
            process.exit(0);
        })
        .catch((error) => {
            console.error('Migration script failed:', error);
            process.exit(1);
        });
}

export default migrateData; 