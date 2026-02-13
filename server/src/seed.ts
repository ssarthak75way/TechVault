import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Asset from './models/Asset.js';
import RequestModel from './models/Request.js';

dotenv.config();

const ADMIN_ID = '698f1f80ed1688d5ab1e46e4';
const EMPLOYEE_ID = '698f1ae9c8ad2717932d9635';

const sampleAssets = [
    {
        name: 'MacBook Pro 16" M3',
        serialNumber: 'MBP-2024-001',
        type: 'Laptop',
        status: 'assigned',
        assignedTo: EMPLOYEE_ID,
        location: 'Office - Desk 12',
        purchaseDate: new Date('2024-01-15')
    },
    {
        name: 'Dell XPS 15',
        serialNumber: 'DELL-2024-002',
        type: 'Laptop',
        status: 'available',
        location: 'Storage Room A',
        purchaseDate: new Date('2024-02-20')
    },
    {
        name: 'LG UltraWide 34"',
        serialNumber: 'LG-MON-003',
        type: 'Monitor',
        status: 'assigned',
        assignedTo: EMPLOYEE_ID,
        location: 'Office - Desk 12',
        purchaseDate: new Date('2024-01-10')
    },
    {
        name: 'Dell UltraSharp 27"',
        serialNumber: 'DELL-MON-004',
        type: 'Monitor',
        status: 'available',
        location: 'Storage Room A',
        purchaseDate: new Date('2024-03-05')
    },
    {
        name: 'Logitech MX Master 3S',
        serialNumber: 'LOG-MOUSE-005',
        type: 'Mouse',
        status: 'assigned',
        assignedTo: EMPLOYEE_ID,
        location: 'Office - Desk 12',
        purchaseDate: new Date('2024-01-15')
    },
    {
        name: 'Apple Magic Keyboard',
        serialNumber: 'APL-KB-006',
        type: 'Keyboard',
        status: 'available',
        location: 'Storage Room B',
        purchaseDate: new Date('2024-02-01')
    },
    {
        name: 'HP LaserJet Pro',
        serialNumber: 'HP-PRINT-007',
        type: 'Printer',
        status: 'available',
        location: 'Office - Print Station',
        purchaseDate: new Date('2023-12-10')
    },
    {
        name: 'Lenovo ThinkPad X1',
        serialNumber: 'LEN-2024-008',
        type: 'Laptop',
        status: 'maintenance',
        location: 'IT Department',
        purchaseDate: new Date('2023-11-20')
    },
    {
        name: 'iPad Pro 12.9"',
        serialNumber: 'IPAD-009',
        type: 'Tablet',
        status: 'available',
        location: 'Storage Room A',
        purchaseDate: new Date('2024-03-15')
    },
    {
        name: 'Sony WH-1000XM5',
        serialNumber: 'SONY-HP-010',
        type: 'Headphones',
        status: 'assigned',
        assignedTo: EMPLOYEE_ID,
        location: 'Office - Desk 12',
        purchaseDate: new Date('2024-01-25')
    },
    {
        name: 'Samsung Odyssey G9',
        serialNumber: 'SAM-MON-011',
        type: 'Monitor',
        status: 'available',
        location: 'Storage Room B',
        purchaseDate: new Date('2024-04-01')
    },
    {
        name: 'Microsoft Surface Pro 9',
        serialNumber: 'MS-SURF-012',
        type: 'Laptop',
        status: 'available',
        location: 'Storage Room A',
        purchaseDate: new Date('2024-02-28')
    }
];

const sampleRequests = [
    {
        requester: EMPLOYEE_ID,
        assetType: 'Laptop',
        reason: 'Need a more powerful laptop for video editing tasks',
        status: 'pending'
    },
    {
        requester: EMPLOYEE_ID,
        assetType: 'Monitor',
        reason: 'Additional monitor for dual-screen setup',
        status: 'approved',
        approvedBy: ADMIN_ID
    },
    {
        requester: EMPLOYEE_ID,
        assetType: 'Headphones',
        reason: 'Noise-cancelling headphones for focused work',
        status: 'approved',
        approvedBy: ADMIN_ID
    },
    {
        requester: EMPLOYEE_ID,
        assetType: 'Tablet',
        reason: 'iPad for client presentations and meetings',
        status: 'pending'
    },
    {
        requester: EMPLOYEE_ID,
        assetType: 'Keyboard',
        reason: 'Ergonomic keyboard replacement',
        status: 'rejected',
        approvedBy: ADMIN_ID
    }
];

async function seedDatabase() {
    try {
        // Connect to MongoDB
        await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/techvault');
        console.log('✅ Connected to MongoDB');

        // Clear existing data
        await Asset.deleteMany({});
        await RequestModel.deleteMany({});
        console.log('🗑️  Cleared existing assets and requests');

        // Insert sample assets
        const createdAssets = await Asset.insertMany(sampleAssets);
        console.log(`✅ Created ${createdAssets.length} sample assets`);

        // Insert sample requests
        const createdRequests = await RequestModel.insertMany(sampleRequests);
        console.log(`✅ Created ${createdRequests.length} sample requests`);

        console.log('\n📊 Database seeded successfully!');
        console.log('\nSummary:');
        console.log(`- Total Assets: ${createdAssets.length}`);
        console.log(`  - Available: ${createdAssets.filter(a => a.status === 'available').length}`);
        console.log(`  - Assigned: ${createdAssets.filter(a => a.status === 'assigned').length}`);
        console.log(`  - Maintenance: ${createdAssets.filter(a => a.status === 'maintenance').length}`);
        console.log(`\n- Total Requests: ${createdRequests.length}`);
        console.log(`  - Pending: ${createdRequests.filter(r => r.status === 'pending').length}`);
        console.log(`  - Approved: ${createdRequests.filter(r => r.status === 'approved').length}`);
        console.log(`  - Rejected: ${createdRequests.filter(r => r.status === 'rejected').length}`);

        process.exit(0);
    } catch (error) {
        console.error('❌ Error seeding database:', error);
        process.exit(1);
    }
}

seedDatabase();
