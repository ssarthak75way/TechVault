import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User, { UserRole } from '../models/User.js';
import connectDB from '../config/db.js';

dotenv.config();

const seedData = async () => {
    try {
        await connectDB();

        // Clear existing users
        await User.deleteMany({});
        console.log('Existing users cleared.');

        // Admin User
        await User.create({
            name: 'Admin User',
            email: 'admin@techvault.com',
            password: 'admin123',
            role: UserRole.ADMIN,
            team: 'IT Administration'
        });

        // Employee User
        await User.create({
            name: 'John Doe',
            email: 'john@techvault.com',
            password: 'user123',
            role: UserRole.EMPLOYEE,
            team: 'Engineering'
        });

        console.log('Database seeded successfully!');
        process.exit();
    } catch (error) {
        console.error('Error seeding data:', error);
        process.exit(1);
    }
};

seedData();
